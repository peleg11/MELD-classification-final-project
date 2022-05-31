import "./Results.css";
import file from "./results.csv";
import SinglePlot from "./SinglePlot";
const Results = (props) => {
  console.log("from results:", props.data);
  return (
    <div className="result-container">
      <h1>Random 10 patients (Results sample):</h1>
      <table>
        <thead>
          <tr>
            <th>ID number</th>
            <th>Calculated class</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map(({ id, calculated_group }) => {
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{calculated_group}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <a href={file} download="results.csv">
        <button>
          Download full <b>Results</b>
        </button>
      </a>
      <SinglePlot className="sp-container" />
    </div>
  );
};
export default Results;
