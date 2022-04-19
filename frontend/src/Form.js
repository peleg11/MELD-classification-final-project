import React, { useState } from "react";
import "./Form.css";

function Form() {
  const [selectedFile, setSelectedFile] = useState();
  const [showForm, setShowForm] = useState(false);
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

    formData.append("File", selectedFile);

    fetch("/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="form">
      <button className="show-form-btn" onClick={handleShowForm}>
        {showForm ? "Hide" : "Show"} Form
      </button>
      {showForm && (
        <form className="upload">
          <input type="file" name="file" onChange={changeHandler} />
          <button onClick={handleSubmission}>Submit</button>
        </form>
      )}
    </div>
  );
}
export default Form;
