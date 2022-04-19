import { useState } from "react";
import "./Form.css";

const Form = () => {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const data = { name: value };
    console.log("submit");
    console.log(value);
    fetch("/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

  function handleValue(e) {
    setValue(e.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleValue} />
      <button> submit </button>
    </form>
  );
};

export default Form;
