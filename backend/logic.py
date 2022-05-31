from datetime import datetime, date

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from matplotlib import dates
from scipy import stats


def plot_design(id_number, x_float_dates):
    plt.xticks(rotation="65", fontsize=8)
    plt.subplots_adjust(bottom=0.25)
    plt.title("id :" + str(id_number))
    plt.xlabel("Time Delta (Days)")
    plt.ylabel("MELD")
    plt.ylim([0, 60])
    plt.grid(True)
    isoFormatDates = [label.strftime("%Y-%m-%d")
                      for label in dates.num2date(x_float_dates)]
    date_times = [date.fromisoformat(d) for d in isoFormatDates]
    deltas = [(d - date_times[0]).days for d in date_times]
    plt.xticks(x_float_dates, deltas)
    plt.axhline(y=25, color="b", linestyle="--")
    #     print(id_number)
    return deltas[len(deltas) - 1]


def createLR_Plot(dataframe, id_number, directory, to_save, to_show, get_predicted):
    plt.clf()
    # set the dates as numpy array
    x = np.array(dataframe[id_number].T["date"])
    y = np.array(dataframe[id_number].T["meld"]).astype(
        float)  # set the meld as numpy array

    # convert dates to float (from the epoch = 1.1.1970)
    x_float_dates = dates.datestr2num(x)
    res = stats.linregress(x_float_dates, y)
    predicted_points = res.intercept + res.slope * x_float_dates
    # res = {slope,intercept,rvalue,pvalue,sdr-err(Standard error of the estimated slope),
    # intercept_stderr(Standard error of the estimated intercept)}

    # # plot
    plt.plot(x_float_dates, res.intercept +
             res.slope * x_float_dates, color="red")
    plt.plot(x_float_dates, y, "-", color="black")
    days = plot_design(id_number, x_float_dates)
    plt.legend(labels=["Linear Regression", "MELD",
               "Threshold=25"], loc="upper right")
    banner = "R^2= " + "{:.3f}".format(res.rvalue**2) + \
        "\n" + "P-value= " + "{:.5f}".format(res.pvalue) + "\n "
    banner += "Slope= " + "{:.5f}".format(res.slope) + "\n"
    banner += "Intercept= " + "{:.5f}".format(res.intercept) + "\n"
    banner += "slope/days:" + "{:.5f}".format(res.slope / days)
    locs, labels = plt.xticks()
    plt.text(locs[0], 40, banner, bbox=dict(facecolor="gray", alpha=0.1))
    if to_save:
        plt.savefig(directory + "/plotToShow.png", bbox_inches="tight")
    if to_show:
        plt.show()
    if get_predicted:
        return res, predicted_points
    else:
        return res


def isSteady_negative(actualValues, data, predictedValues):
    deltas = []
    flag = 0
    for i in range(len(actualValues)):
        deltas.append(actualValues[i] - predictedValues[i])
    return abs(max(deltas)) < 3.6 and abs(min(deltas)) < 3.6, (abs(max(deltas)), abs(min(deltas)))


def negative_slope_plot_classifier(df, negative_slope):
    calc_Steady_negetive_slope = [
        (
            key,
            isSteady_negative(
                list(df[key].iloc[0]),
                createLR_Plot(df, key, "negative_slope", to_save=False,
                              to_show=False, get_predicted=True)[0],
                createLR_Plot(df, key, "negative_slope", to_save=False,
                              to_show=False, get_predicted=True)[1],
            ),
        )
        for key in negative_slope.keys()
    ]
    return [x for x in calc_Steady_negetive_slope if x[1][0] == True]


def isSteady_positive(actualValues, data, predictedValues):
    deltas = []
    flag = 0
    for i in range(len(actualValues)):
        deltas.append(actualValues[i] - predictedValues[i])
    return abs(max(deltas)) < 3.3 and abs(min(deltas)) < 3.3, (abs(max(deltas)), abs(min(deltas)))


def positive_slope_plot_classifer_steady(df, positive_slope):
    calc_steady_positive_slope = [
        (
            key,
            isSteady_positive(
                list(df[key].iloc[0]),
                createLR_Plot(df, key, "positive", to_save=False,
                              to_show=False, get_predicted=True)[0],
                createLR_Plot(df, key, "positive", to_save=False,
                              to_show=False, get_predicted=True)[1],
            ),
        )
        for key in positive_slope.keys()
    ]
    return [x for x in calc_steady_positive_slope if x[1][0] == True]


def isFlac_positive(actualValues, data, predictedValues):
    flag_up = 0
    flag_down = 0
    count_up = 0
    count_down = 0
    for i in range(1, len(actualValues)):
        if actualValues[i] > actualValues[i - 1] and flag_up == 0:
            flag_down = 0
            flag_up = 1
            count_up += 1
        elif actualValues[i] < actualValues[i - 1] and flag_down == 0:
            flag_down = 1
            flag_up = 0
            count_down += 1

    return count_down >= 4 and count_up >= 4, (count_up, count_down)


def positive_slope_plot_classifer_flac(df, positive_slope):
    calc_flac_positive_slope = [
        (
            key,
            isFlac_positive(
                list(df[key].iloc[0]),
                createLR_Plot(df, key, "positive", to_save=False,
                              to_show=False, get_predicted=True)[0],
                createLR_Plot(df, key, "positive", to_save=False,
                              to_show=False, get_predicted=True)[1],
            ),
        )
        for key in positive_slope.keys()
    ]
    return calc_flac_positive_slope


def api_function(fileName="afterClean.csv"):
    df = pd.read_csv(fileName).set_index("id")

    def changeDateFormat(date):
        return datetime.strptime(date, "%d-%b-%y").strftime("%Y-%m-%d")

    formattedDate = [changeDateFormat(date) for date in df["date"]]
    df["formattedDate"] = formattedDate
    df = df.T
    # clean single points:
    toDrop = []
    for key in list(set(df.keys())):
        if len(df[key].shape) == 1:
            toDrop.append(key)
    df = df.T.drop(toDrop).T
    list_of_melds = [df[x].T["meld"].to_list() for x in set(df.keys())]
    list_of_dates = [df[x].T["formattedDate"].to_list()
                     for x in set(df.keys())]

    df_new = pd.DataFrame(
        {"id": list(set(df.keys())), "meld": list_of_melds, "date": list_of_dates})
    df_new.to_csv("new_df.csv")
    df_new = df_new.set_index("id").T

    results = {
        key: createLR_Plot(df, key, "plots", to_save=False,
                           to_show=False, get_predicted=False)
        for key in set(df.keys().to_list())
    }

    results = pd.DataFrame(results).T
    results.columns = ["slope", "intercept", "rvalue", "pvalue", "stderr"]
    rvalue = results["rvalue"].to_list()
    rvalue = [val**2 for val in rvalue]
    results["rvalue"] = rvalue

    not_horizontal = {
        key: createLR_Plot(df, key, "not_horizontal_plots",
                           to_save=False, to_show=False, get_predicted=False)
        for key in results[(results["pvalue"] <= 0.05) & (results["pvalue"] != 0)].T.keys().to_list()
    }

    positive_slope = {
        key: createLR_Plot(df, key, "positive_slope",
                           to_save=False, to_show=False, get_predicted=False)
        for key in results[(results["pvalue"] <= 0.05) & (results["pvalue"] != 0) & (results["slope"] > 0)]
        .T.keys()
        .to_list()
    }

    negative_slope = {
        key: createLR_Plot(df, key, "negative_slope",
                           to_save=False, to_show=False, get_predicted=False)
        for key in results[(results["pvalue"] <= 0.05) & (results["pvalue"] != 0) & (results["slope"] < 0)]
        .T.keys()
        .to_list()
    }

    horizontal = {
        key: createLR_Plot(df, key, "horizontal_plots",
                           to_save=False, to_show=False, get_predicted=False)
        for key in results[(results["pvalue"] >= 0.05) | (results["pvalue"] == 0)].T.keys().to_list()
    }

    # function calling:

    Steady_negetive_slope = negative_slope_plot_classifier(df, negative_slope)
    steady_positive_slope = positive_slope_plot_classifer_steady(
        df, positive_slope)
    flac_positive_slope = positive_slope_plot_classifer_flac(
        df, positive_slope)

    # ***************************

    df = pd.read_csv("new_df.csv")

    all_labels = {x: "horizontal" for x in horizontal.keys()}
    # all_labels.update({x:"positive" for x in positive_slope.keys() if x not in all_labels.keys()})
    all_labels.update(
        {x[0]: "neg_st" for x in Steady_negetive_slope if (
            x[0] not in all_labels.keys() and x[1][0] == True)}
    )
    all_labels.update(
        {x: "neg_fl" for x in negative_slope.keys() if x not in all_labels.keys()})
    all_labels.update(
        {x[0]: "pos_st" for x in steady_positive_slope if (
            x[0] not in all_labels.keys() and x[1][0] == True)}
    )
    all_labels.update(
        {x[0]: "pos_fl" for x in flac_positive_slope if (
            x[0] not in all_labels.keys() and x[1][0] == True)}
    )
    all_labels.update(
        {x: "pos_n" for x in positive_slope.keys() if x not in all_labels.keys()})

    len(set(all_labels.keys()))

    df["calculated_group"] = df["id"].map(all_labels)

    return df[["id", "calculated_group"]]


def get_single_plot(id):
    df = pd.read_csv("afterClean.csv").set_index("id")

    def changeDateFormat(date):
        return datetime.strptime(date, "%d-%b-%y").strftime("%Y-%m-%d")

    formattedDate = [changeDateFormat(date) for date in df["date"]]
    df["formattedDate"] = formattedDate
    df = df.T
    # clean single points:
    toDrop = []
    for key in list(set(df.keys())):
        if len(df[key].shape) == 1:
            toDrop.append(key)
    df = df.T.drop(toDrop).T
    return createLR_Plot(df, int(id),
                         "C:/Users/user/Desktop/flask_react_app/frontend/src", to_save=True, to_show=False, get_predicted=False)
