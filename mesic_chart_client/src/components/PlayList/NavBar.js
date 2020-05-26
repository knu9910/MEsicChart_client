import React from "react";

import { Link } from "react-router-dom";

import "../../css/navBar.css";

const navBar = () => {
  return (
    <div className="nav-bar">
      <div className="left-content">
        <Link to="/" style={{ textDecoration: "none" }}>
          <i className="fas fa-play-circle"></i>
          <span className="title">MEchart</span>
        </Link>
      </div>
      <div className="center-content">
        <Link to="/" style={{ textDecoration: "none" }}>
          <i className="fas fa-home"></i>
        </Link>
        <Link to="/playlist" style={{ textDecoration: "none" }}>
          <i className="fas fa-record-vinyl"></i>
        </Link>
        <i className="fas fa-search"></i>
      </div>
      <div className="right-content">
        <i className="fas fa-ellipsis-v"></i>
      </div>
    </div>
  );
};

export default navBar;
