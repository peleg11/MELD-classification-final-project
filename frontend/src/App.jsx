import "./App.css";
import React, { useState } from "react";
import Form from "./Form";
import Results from "./Results";

function App() {
  const [isSubmited, setIsSubmited] = useState(false);
  const submitedHandler = (submitedState) => {
    setIsSubmited(submitedState);
  };
  return (
    <div className="App">
      {!isSubmited && <Form onSubmited={submitedHandler} />}
      {isSubmited && <Results />}
    </div>
  );
}

export default App;
