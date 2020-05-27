import React from "react";
import "../css/SignUp.css";
import logo from "../images/free_horizontal_on_white_by_logaster6.png";
import { withRouter } from "react-router-dom";

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
    console.log(value)
  }
  insertPassword = value => {
    this.setState({ password: value });
    console.log(value)
  }
  insertPassword2 = value => {
    this.setState({ password2: value });
    console.log(value)
  }
  insertName = value => {
    this.setState({ name: value });
    console.log(value)
  }
  onButtonClick = () => {
    const { id, password, password2, name } = this.state;
    if(id === '') {
      alert('아이디가 비어 있습니다.');
    } else if(id.split('').indexOf('@') === -1) {
      alert('아이디는 이메일 형식이어야 합니다.')
    } else if(password === '') {
      alert('암호가 비어 있습니다.');
    } else if(password.length < 8) {
      alert('암호는 8 글자 이상이어야 합니다.');
    } else if(password !== password2) {
      alert('password와 confirm password가 일치해야 합니다.')
    } else if(name === '') {
      alert('이름이 비어 있습니다.');
    } else { // 통과 했을 경우에만 요청
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
        .then(response => {
          if(response.status === 201) {
            this.props.history.push('/');
          }
        })
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
                id{" "}
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

export default withRouter(signUp);

{
  /* <div class="Mesic-logo">
        <img src="img/free_horizontal_on_white_by_logaster6.png" alt="Mesic-logo">
    </div>
    <form id="register" class="input-group" action="#" method="POST">
        <!-- <fieldset> -->
            <!-- <legend id="legend">회원가입</legend> -->
            <p>
                <label for="ID" class="label-field">ID  </label>
                <input id="ID" class="input-field" type="text" name="DB의 ID" required>
            </p>
            <p>
                <label for="Password" class="label-field">Password </label>
                <input id="Password" class="input-field" type="password" name="DB의 password" required>
            </p>
            <p>
                <label for="Password1" class="label-field">Password 확인</label>
                <input id="Password1" class="input-field" type="password" name="DB의 password"  required>
            </p>
            <p>
                <label for="Nickname" class="label-field">닉네임 </label>
                <input id="Nickname" class="input-field" type="text" type="DB의 닉네임"  required>
            </p>
            <p>
                <button class="submit">가입하기</button>  
            </p>
        <!-- </fieldset> -->
    </form> */
}
