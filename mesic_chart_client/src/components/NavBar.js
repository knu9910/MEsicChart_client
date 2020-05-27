import React from "react";
import axios from 'axios'
import { Link, withRouter } from "react-router-dom";
import "../css/navBar.css";

const navBar = (props) => {
  const {searchMusic, changeSignState, isSignIn} = props;
  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      console.log(e)
      props.history.push('/');
      searchMusic(document.getElementById('text1').value);
    }
  }
  const signOutEvent = () => {
    axios.get('http://3.34.124.39:3000/signout',{withCredentials:true})
    changeSignState();
    props.history.push('/');
  }
  let signState = isSignIn ? <div className = "signout" onClick = {signOutEvent}>로그아웃</div> : <a className = "signin" href='/signin'>로그인</a>
  
  return (
    <div className="nav-bar">
      <div className="left-content">
        <Link to="/" className="link" >
          <i className="fas fa-play-circle"></i>
          <span className="title">MEchart</span>
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
        <input type="text" name="text1" id="text1" style={{display:"none"}} onKeyDown = {handleKeyPress}/>
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
