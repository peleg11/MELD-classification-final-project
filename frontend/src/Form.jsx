import React, { useState } from "react";
import "./Form.css";

const Form = (props) => {
  const [selectedFile, setSelectedFile] = useState();
  const [showForm, setShowForm] = useState(false);
  const [waitMSG, setWaitMSG] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleShowForm = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = (event) => {
    event.preventDefault();
    const formData = new FormData();
    setWaitMSG(true);
    formData.append("File", selectedFile);

    fetch("/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        response.json();
      })
      .then((result) => {
        console.log("Success:", result);
        props.onSubmited(true);
        setWaitMSG(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setWaitMSG(true);
      });
  };

  return (
    <div className="form">
      <button
        className={`show-form-btn ${waitMSG ? "hidden" : ""}`}
        onClick={handleShowForm}
      >
        {showForm ? "Hide" : "Show"} Form
      </button>
      {/* {showForm && ( */}
      <form className={`upload ${waitMSG || !showForm ? "hidden" : ""}`}>
        <label htmlFor="inputTag">
          <input
            id="inputTag"
            type="file"
            name="file"
            accept=".csv"
            onChange={changeHandler}
          />
        </label>
        <button onClick={handleSubmission}>Submit</button>
      </form>
      {/* )} */}
      <div className={`wait ${waitMSG ? "" : "hidden"}`}>
        File uploaded.. please wait
      </div>
    </div>
  );
};
export default Form;
