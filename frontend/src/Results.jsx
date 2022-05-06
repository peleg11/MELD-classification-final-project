import "./Results.css";
import file from "./results.csv";
const Results = (props) => {
  console.log("from results:", props.data);
  return (
    <div className="result-container">
      <ul>
        {props.data.map((item) => {
          <li>{item}</li>;
        })}
      </ul>
      <a href={file} download="results.csv">
        <button>Download Results</button>
      </a>
    </div>
  );
};
export default Results;
