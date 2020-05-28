import React, { Component} from "react";
import { Link, withRouter } from "react-router-dom";
import axios from 'axios'
import { GoogleLogin } from 'react-google-login';
import "../css/SignIn.css";
import swal from "sweetalert";
import  KakaoLogin from 'react-kakao-login'; 
import styled from 'styled-components';
require('dotenv').config();

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.reqSignIn = this.reqSignIn.bind(this)
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  responseGoogle = (res) => {
    const {email, name} = res.profileObj;
    axios.post('http://3.34.124.39:3000/googleSignin', {
      email,
      name
    }, {withCredentials:true})
    .then(res => {
      if(res.status === 201){
        this.props.onLogin();
      }
    })
    .catch(err => console.log(err));
  }

  responseKakao = (res) => {
    const id = res.profile.id;
    const name = res.profile.properties.nickname;
    axios.post('http://3.34.124.39:3000/kakaoSignin', {
      id,
      name
    }, {withCredentials:true})
    .then(res => {
      if(res.status === 201){
        this.props.onLogin();
      }
    })
    .catch(err => console.log(err));
  }

  responseFail = (err) => {
    console.log(err)
  } 
  reqSignIn = e => {

    e.preventDefault();
    axios.post('http://3.34.124.39:3000/signin', {
      email: this.state.email,
      password: this.state.password
    }, {withCredentials:true})
    .then((res) => {
      if(res.status === 201){
        this.props.onLogin();
        swal({
          text: '로그인에 성공하였습니다.',
          icon : "success",})
      } else if(res.status === 404){   
      } 
    })
    .catch(err => swal({
      text: '이메일이 맞지 않거나 비밀번호가 맞지 않습니다.',
      icon : "error",})
   );
  }

  render() {
    return (
      <div className="wrapper">
        <div className="login-parent">
          <div className="login-form">
            <form onSubmit={this.reqSignIn}>
              <h1>MEsic Chart</h1>
              <input type="text" placeholder="user email" 
              onChange={this.handleInputValue('email')} required />
              <input type="password" placeholder="password" 
              onChange={this.handleInputValue('password')} required />
              <button type="submit">
                Login
              </button>
              <p className="signUp">
                Not Registered? <Link to="/signup">Create an Account</Link>
              </p>
            </form>
          </div>
          <Container>
          <div className="login-google">
         
            <GoogleLogin
              clientId= {process.env.REACT_APP_CLIENT_ID}
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</button>
              )}
              buttonText="Sign in with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseFail}
              cookiePolicy={'single_host_origin'}
            />
          </div>
         
           <KakaoButton
             jsKey={'fa7d8ef045eb03804876e181cb7a51ef'}
             buttonText="Kakao"
             onSuccess={this.responseKakao}
             onFailure={this.responseFail}
             getProfile="true"
            />
               
          </Container>
        </div>
      </div>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
`
const KakaoButton = styled(KakaoLogin)`
  padding:0
  width: 190px;
  heigth: 44px;
  line-height: 44px;
  color: #783c00;
  background-color: #FFEB00;
  border: 1px soild transparent;
  border-redius: 3px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`
export default withRouter(SignIn);
