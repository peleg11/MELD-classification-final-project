import "./Results.css";
import file from "./uploaded.csv";
const Results = (props) => {
  return (
    <div>
      <h1>{props.data.succesfull}</h1>
      <a href={file} download="results.csv">
        Download
      </a>
    </div>
  );
};
export default Results;
