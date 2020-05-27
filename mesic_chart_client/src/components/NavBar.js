import React from "react";

import { Link, withRouter } from "react-router-dom";
import "../css/navBar.css";

const navBar = (props) => {
  
  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      console.log(e)
      props.history.push('/');
      props.searchMusic(document.getElementById('text1').value);
    }
  }

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
        <i className="fas fa-search" onClick = {() => document.getElementById("text1").style.display="block"}></i>
        <input type="text" name="text1" id="text1" style={{display:"none"}} onKeyDown = {handleKeyPress}/>
      </div>
      <div className="right-content">
        <i className="fas fa-ellipsis-v"></i>
      </div>
    </div>
  );
};

export default withRouter(navBar);
