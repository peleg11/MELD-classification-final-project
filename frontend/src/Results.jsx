import "./Results.css";
import file from "./uploaded.csv";
const Results = (props) => {
  return (
    <div className="result-container">
      <h1>{props.data.succesfull}</h1>
      <a href={file} download="results.csv">
        <button>Download Results</button>
      </a>
    </div>
  );
};
export default Results;
