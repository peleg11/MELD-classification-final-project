import "./Nav.css";
import React, { useState } from "react";

const Nav = (props) => {
  const [currentPage, setCurrentPage] = useState("home");
  const handlePress = (pressedBtn) => {
    setCurrentPage(pressedBtn);
    props.pressed(pressedBtn);
  };
  return (
    <div className="navbar-container">
      <div className="box">
        <div className="info">
          <div
            onClick={(e) => handlePress("home")}
            className={currentPage === "home" ? "bold" : ""}
          >
            Home
          </div>
          <div
            href="#"
            onClick={(e) => handlePress("about")}
            className={currentPage === "about" ? "bold" : ""}
          >
            about
          </div>
        </div>
        <div className="links">
          <div
            href="#"
            onClick={(e) => handlePress("upload")}
            className={currentPage === "upload" ? "bold" : ""}
          >
            upload data
          </div>
        </div>
      </div>
    </div>
  );
};
export default Nav;
