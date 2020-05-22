import React from "react";
import "../css/SignUp.css";
import logo from "../images/free_horizontal_on_white_by_logaster6.png";

class signUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="SignUp">
        <header className="SignUp-header">
          <img src={logo} className="Mesic-logo" alt="logo" />
          <p>
            <label htmlFor="ID" className="label-field">
              ID{" "}
            </label>
            <input id="ID" className="input-field" type="text" required></input>
          </p>
          <p>
            <label htmlFor="Password" className="label-field">
              Password{" "}
            </label>
            <input
              id="Password"
              className="input-field"
              type="password"
              name="DB의 password"
              required
            ></input>
          </p>
          <p>
            <label htmlFor="Password1" className="label-field">
              Password 확인
            </label>
            <input
              id="Password1"
              className="input-field"
              type="password"
              name="DB의 password"
              required
            ></input>
          </p>
          <p>
            <label htmlFor="Nickname" className="label-field">
              닉네임{" "}
            </label>
            <input
              id="Nickname"
              className="input-field"
              type="text"
              type="DB의 닉네임"
              required
            ></input>
          </p>
          <p>
            <button className="submit">가입하기</button>
          </p>
        </header>
      </div>
    );
  }
}

export default signUp;

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
