import React from 'react';
import "../css/SignIn.css"

class SignIn extends React.Component {
  // constructor(props){
  //   super(props)

  //   this.state = {
  //     email: '',
  //     password: ''
  //   }
  // }

  render() {
    return(
      <div className="login-form">
        <form action="" method="post">
          <h1>MEsic Chart</h1>
          <input type="text" name="" placeholder="user email" required />
          <input type="password" name="" placeholder="password" required />
          <p className=""><a href="#">아이디/비밀번호 찾기</a></p>
          <button type="submit" name="button">Login</button>
          <p className="signUp">Not Registered? <a href="#">Create an Account</a></p>
        </form>
      </div>
    )}
}

export default SignIn;