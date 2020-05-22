import React from "react";
import { Link } from "react-router-dom";
import "../css/SignIn.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="login-form">
        <form>
          <h1>MEsic Chart</h1>
          <input type="text" name="" placeholder="user email" required />
          <input type="password" name="" placeholder="password" required />
          <p className="">
            <a href="#">아이디/비밀번호 찾기</a>
          </p>
          <button type="submit" name="button">
            Login
          </button>
          <p className="signUp">
            Not Registered? <Link to="/signup">Create an Account</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default SignIn;
