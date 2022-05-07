import "./Results.css";
import file from "./results.csv";
const Results = (props) => {
  console.log("from results:", props.data);
  return (
    <div className="result-container">
      <h1>First 15 patients results:</h1>
      <table>
        <thead>
          <tr>
            <th>ID number</th>
            <th>Calculated class</th>
            <th>Transplantion propbabilty</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map(({ id, calculated_group }) => {
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{calculated_group}</td>
                <td>NaN</td>
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
    </div>
  );
};
export default Results;
