import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PlayList from "./pages/PlayList";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignIn: false,
    };
    this.changeSignState = this.changeSignState.bind(this)
  }


  changeSignState() {
    this.setState({
      isSignIn : !this.state.isSignIn
    })
  }
  render() {
    const { isSignIn } = this.state;

    return (
      <div>
        <Switch>
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route
            exact
            path="/signin"
            render={() => <SignIn isSignIn={isSignIn} changeSignState={this.changeSignState} />}
          />
          <Route exact path="/playlist" render={() => <PlayList />} />
          <Route exact path="/" render={() => <Main isSignIn={isSignIn} changeSignState={this.changeSignState} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
