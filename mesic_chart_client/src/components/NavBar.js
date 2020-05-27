import React from "react";
import axios from 'axios'
import { Link, withRouter } from "react-router-dom";
import "../css/navBar.css";
import loginIcon from "../images/login-icon.png";
import logoutIcon from "../images/logout-icon2.png";

const navBar = (props) => {
  const {searchMusic, onLogout, isSignIn} = props;
  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      console.log(e)
      props.history.push('/');
      searchMusic(document.getElementById('text1').value);
    }
  }
  const signOutEvent = () => {
    axios.get('http://3.34.124.39:3000/signout',{withCredentials:true})
    onLogout();
    props.history.push('/');
  }
  let signState = isSignIn ? <div className = "signout" onClick = {signOutEvent}><img src={logoutIcon} className="logout-Icon"/></div> : <a className = "signin" href='/signin'><img src={loginIcon} className="login-Icon"/></a>
  
  return (
    <div className="nav-bar">
      <div className="left-content">
        <Link to="/" className="link" >
          <i className="fas fa-play-circle"></i>
          <span className="title">MEsic Chart</span>
        </Link>
      </div>
      <div className="center-content">
        <Link to="/" className="link" >
          <i className="fas fa-home"></i>
        </Link>
        <Link to="/playlist" className="link" >
          <i className="fas fa-record-vinyl"></i>
        </Link>
        <i className="fas fa-search" onClick = {() => document.getElementById("text1").style.display="block"}></i>
        <input type="text" name="text1" id="text1" style={{display:"none"}} onKeyDown = {handleKeyPress} placeholder="  검색어를 입력해주세요"/>
      </div>
      <div className="right-content">
        <div className="dropdown">
        <i className="fas fa-ellipsis-v"></i>
        <div className="dropdown-content">
          {signState}
        </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(navBar);
