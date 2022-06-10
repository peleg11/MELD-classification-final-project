from flask import Flask, request, jsonify
from logic import api_function, get_single_plot

app = Flask(__name__)


@app.route("/", methods=["POST", "GET"])
def main():
    file_dict = request.files.to_dict()
    file_dict["File"].save("./afterClean.csv")
    results = api_function()
    results.to_csv(
        "../src/results.csv")
    return results.sample(10).to_json(orient="records")


@app.route('/plot', methods=['POST', 'GET'])
def get_plot():
    if request.method == 'POST':
        json_data = request.get_json(force=True)
        id = json_data['id']
        print(id)
        get_single_plot(id)
    return {"succesfull": id}
