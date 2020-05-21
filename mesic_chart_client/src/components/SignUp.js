import React from 'react';
import styles from './SignUp.css';
import logo from '../images/free_horizontal_on_white_by_logaster6.png'

class signUp extends React.Component {
  constructor(props) {
    super(props)
    const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
    document.getElementsByTagName('head')[0].appendChild(meta);
  }
  render() {
    return (
      <div class="SignUp">
        <header className="SignUp-header">
          <img src={logo} class="Mesic-logo" alt="logo" />
          <p>
            <label for="ID" class="label-field">ID </label>
            <input id="ID" class="input-field" type="text" required></input>
          </p>
          <p>
            <label for="Password" class="label-field">Password </label>
            <input id="Password" class="input-field" type="password" name="DB의 password" required></input>
          </p>
          <p>
            <label for="Password1" class="label-field">Password 확인</label>
            <input id="Password1" class="input-field" type="password" name="DB의 password" required></input>
          </p>
          <p>
              <label for="Nickname" class="label-field">닉네임 </label>
              <input id="Nickname" class="input-field" type="text" type="DB의 닉네임"  required></input>
          </p>
          <p>
            <button class="submit">가입하기</button>  
          </p>
        </header>
      </div>
    )
  }
}

export default signUp;

{/* <div class="Mesic-logo">
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
    </form> */}