import React from "react";
import axios from 'axios'
import { Link, withRouter } from "react-router-dom";
import "../css/navBar.css";
const navBar = (props) => {
  const {searchMusic, onLogout, isSignIn} = props;
  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      console.log(e)
      props.history.push('/');
      searchMusic(document.getElementById('text1').value);
    }
  }
  const searchClick = () => {
    searchMusic(document.getElementById('text1').value);
  }
  const signOutEvent = () => {
    axios.get('http://3.34.124.39:3000/signout',{withCredentials:true})
    onLogout();
  }
  let signState = isSignIn ? <div className = "signout" onClick = {signOutEvent}><i className="fas fa-sign-out-alt"></i></div> : <a className = "signin" href='/signin'><i class="fas fa-sign-in-alt"></i></a>
  
  return (
    <div className="nav-bar">
      <div className="left-content">
          <i className="fas fa-play-circle"></i>
          <a href="/" className="title">MEsic Chart</a>
      </div>
      <div className="center-content">
        <input type="text" name="text1" id="text1" onKeyDown = {handleKeyPress} placeholder="  검색어를 입력해주세요"/>
        <i className="fas fa-search" onClick = {searchClick}></i>
      </div>
      <div className="right-content">
        <Link to="/" className="link" >
          <i className="fas fa-home"></i>
        </Link>
        <Link to="/playlist" className="link" >
          <i className="fas fa-record-vinyl"></i>
        </Link>
       
        
          {signState}
       
        
      </div>
    </div>
  );
};

export default withRouter(navBar);
