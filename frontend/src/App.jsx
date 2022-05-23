import "./App.css";
import React, { useState } from "react";
import Form from "./Form";
import Results from "./Results";
import Nav from "./Nav";
import Home from "./Home";
import About from "./About";

function App() {
  const [isSubmited, setIsSubmited] = useState(false);
  const [Data, setData] = useState();
  const submitedHandler = (submitedState) => {
    setIsSubmited(submitedState);
  };
  const resultHandler = (data) => {
    setData(data);
  };
  const [page, setPage] = useState("home");
  const getPress = (currentPress) => setPage(currentPress);
  return (
    <div className="app-container">
      <Nav pressed={getPress} />
      <div className="App">
        {page === "home" && <Home />}
        {page === "about" && <About />}
        {page === "upload" && !isSubmited && (
          <div>
            <Form onSubmited={submitedHandler} getResult={resultHandler} />
          </div>
        )}
        {page === "upload" && isSubmited && <Results data={Data} />}
      </div>
    </div>
  );
}

export default App;
