import React from "react";
import "../css/SignUp.css";
import logo from "../images/free_horizontal_on_white_by_logaster6.png";
import swal from "sweetalert";

class signUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      password2: '',
      name: ''
    }
  }

  insertId = value => {
    this.setState({ id: value });
  }
  insertPassword = value => {
    this.setState({ password: value });
  }
  insertPassword2 = value => {
    this.setState({ password2: value });
  }
  insertName = value => {
    this.setState({ name: value });
  }
  onButtonClick = () => {
    // console.log('buttonclicked');
    const { id, password, password2, name } = this.state;
    if(id === '') { 
      swal({
      text: '이메일이 비어 있습니다.',
      icon : "error",})
    } else if(id.split('').indexOf('@') === -1) {
      swal({
        text: '이메일형식에 맞춰야 합니다.',
        icon : "error",})
    } else if(password === '') {
      swal({
        text: 'password가 비어 있습니다..',
        icon : "error",})
    } else if(password.length < 8) {
      swal({
        text: 'password는 8글자 이상이어야 합니다.',
        icon : "error",})
    } else if(password !== password2) {
      swal({
        text: 'password와 password confirm이 같아야 합니다',
        icon : "error",})
    } else if(name === '') {
      swal({
        text: '이름이 비어 있습니다.',
        icon : "error",});
    } else { // 통과 했을 경우에만 요청
      swal({
        text: '회원가입에 성공했습니다.',
        icon : "success",});
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "name":name,
        "email":id,
        "password":password
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch("http://3.34.124.39:3000/signup", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  }
  
  render() {
    return (
      <div className="wrapper">
        <div className="SignUp">
          <header className="SignUp-header">
            <div className="Input-Area">
              <div></div>
              <div className="Mesic-logo-wrapper">
                <img src={logo} className="Mesic-logo" alt="logo" />
              </div>
              <label htmlFor="ID" className="label-field">
                이메일{" "}
              </label>
              <input id="ID" className="input-field" type="text" required onChange={(e) => this.insertId(e.target.value)}></input>
          
              <label htmlFor="Password" className="label-field">
                password{" "}
              </label>
              <input
                id="Password"
                className="input-field"
                type="password"
                name="DB의 password"
                required
                onChange={(e) => this.insertPassword(e.target.value)}
              ></input>
          
              <label htmlFor="Password1" className="label-field" id="confirm-password">
                confirm password
              </label>
              <input
                id="Password1"
                className="input-field"
                type="password"
                name="DB의 password"
                required
                onChange={(e) => this.insertPassword2(e.target.value)}
              ></input>
            
              <label htmlFor="Nickname" className="label-field">
                name{" "}
              </label>
              <input
                id="Nickname"
                className="input-field"
                type="text"
                type="DB의 닉네임"
                required
                onChange={(e) => this.insertName(e.target.value)}
              ></input>
              <div></div>
              <div>
                <button className="submit" onClick={() => this.onButtonClick()}>Signup</button>
              </div>
            
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default signUp;