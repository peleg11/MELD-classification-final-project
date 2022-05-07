import React, { useState } from "react";
import "./Form.css";

const Form = (props) => {
  const [selectedFile, setSelectedFile] = useState();
  const [showForm, setShowForm] = useState(false);
  const [waitMSG, setWaitMSG] = useState(false);
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
        return response.json();
      })
      .then((result) => {
        console.log("Success:", result);
        props.onSubmited(true);
        props.getResult(result);
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
        {/* <img
          src={spinner}
          alt="spinner"
          style={{ width: "140px", height: "140px" }}
        /> */}
        <lord-icon
          src="https://cdn.lordicon.com/vlupvdhl.json"
          trigger="loop"
          delay="30"
          colors="primary:#b3c6cd,secondary:#c6d9df"
          style={{ width: "250px", height: "250px" }}
        ></lord-icon>
        File uploaded... please wait!
      </div>
    </div>
  );
};
export default Form;
