import "./App.css";
import { useState } from "react";
import Form from "./Form";

function App() {
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };
  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
