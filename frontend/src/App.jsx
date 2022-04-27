import "./App.css";
import React, { useState } from "react";
import Form from "./Form";
import Results from "./Results";

function App() {
  const [isSubmited, setIsSubmited] = useState(false);
  const [Data, setData] = useState();
  const submitedHandler = (submitedState) => {
    setIsSubmited(submitedState);
  };
  const resultHandler = (data) => {
    setData(data);
  };
  return (
    <div className="App">
      {!isSubmited && (
        <Form onSubmited={submitedHandler} getResult={resultHandler} />
      )}
      {isSubmited && <Results data={Data} />}
    </div>
  );
}

export default App;
