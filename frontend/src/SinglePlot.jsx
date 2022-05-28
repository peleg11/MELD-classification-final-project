import React, { useState } from "react";
import plot from "./plotToShow.png";
import "./SinglePlot.css";

const SinglePlot = (props) => {
  const [idSubmitted, setIdSubmitted] = useState(false);
  const singlePlotHandler = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: event.target.patientID.value }),
    };
    fetch("/plot", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIdSubmitted(true);
      })
      .catch((err) => {
        alert("bad id number");
        console.error(err);
      });
  };
  const backHandler = () => {
    setIdSubmitted(false);
  };
  return (
    <div className="single">
      {!idSubmitted && (
        <form className="single-form" onSubmit={singlePlotHandler}>
          <label htmlFor="id-input">
            Enter id to view plot graph:{" "}
            <input type="text" name="patientID" id="id" />
          </label>
          <button type="submit" name="submit-id" id="submit-id">
            submit
          </button>
        </form>
      )}
      {idSubmitted && (
        <div className="plot">
          <button
            className={idSubmitted ? "back" : "back hidden"}
            onClick={backHandler}
          >
            Return ⬅
          </button>
          <img
            src={plot}
            alt="plot"
            className={idSubmitted ? "plot" : "hidden"}
          />
        </div>
      )}
    </div>
  );
};
export default SinglePlot;
