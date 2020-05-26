import React from "react";
import { Link, withRouter} from "react-router-dom";
import axios from 'axios'
import { GoogleLogin } from 'react-google-login';
import "../css/SignIn.css";
require('dotenv').config();

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.reqSignIn = this.reqSignIn.bind(this)
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  responseGoogle = (res) => {
    const {email, name} = res.profileObj;
    console.log(email,name)
    axios.post('http://localhost:3000/googleSignin', {
      email,
      name
    })
    .then(res => {
      if(res.status === 201){
        this.props.history.push('/');
      }
    })
  }

  responseFail = (err) => {
    console.log(err)
  } 
  reqSignIn = e => {
    console.log("reqSignIn 진입");

    e.preventDefault();
    axios.post('http://3.34.124.39:3000/signin', {
      email: this.state.email,
      password: this.state.password
    })
    .then((res) => {
      console.log('reqSignIn() res: ', res)
      if(res.status === 201){
        alert('로그인 성공');
        // this.props.changeSigninStatus();
        this.props.changeSignState();
        this.props.history.push('/');
      }else if(res.status === 404){
        alert('email exists');
      } 
    })
    .catch((err) => {
      console.log("reqSignIn Error: ", err)
    })
  }

  render() {
    return (
      <div>
  
          <GoogleLogin
            clientId= {"952577669-oht7bpmhcqvptlvdoqjbd9cf7k3moj78.apps.googleusercontent.com"}
            buttonText="Sign in with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseFail}
            cookiePolicy={'single_host_origin'}
          />
     
      <div className="login-form">
        <form onSubmit={this.reqSignIn}>
          <h1>MEsic Chart</h1>
          <input type="text" placeholder="user email" 
          onChange={this.handleInputValue('email')} required />
          <input type="password" placeholder="password" 
          onChange={this.handleInputValue('password')} required />
          {/* <p className="">
            <a href="#">아이디/비밀번호 찾기</a>
          </p> */}
          <button type="submit">
            Login
          </button>
          <p className="signUp">
            Not Registered? <Link to="/signup">Create an Account</Link>
          </p>
        </form>
        <a href = 'http://3.34.124.39:3000/kakao'> KaKaoasdassa </a>
      </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
