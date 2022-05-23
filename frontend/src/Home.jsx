import shay from "./SHAY.jpeg";
import dima from "./DIMA.jpeg";
import sce from "./sce.jpeg";
import "./Home.css";
const Home = (props) => {
  return (
    <div className="home-container">
      <h1>Welcome to the MELD project</h1>
      <h2>B.sc Software Engineering final project</h2>
      <div className="sce">
        <img src={sce} alt="sce" />
      </div>
      <div className="us">
        <div className="pic1">
          <img src={shay} alt="shay" height="200px" />
          Shay Peleg
        </div>
        <div className="pic2">
          <img src={dima} alt="dima" height="200px" />
          Dmitry Korkin
        </div>
      </div>
    </div>
  );
};
export default Home;
