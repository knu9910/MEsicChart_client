import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./pages/Main";
import MainSearch from "./components/Main/MainSearch";
import RecommandedMusicList from "./components/Main/RecommandedMusicList";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PlayList from "./pages/PlayList";
import PlayListSearch from "./components/PlayList/PlayListSearch";
import MyMusicList from "./components/PlayList/MyMusicList";
import Footer from "./components/Footer";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignIn: false,
    };
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
            render={() => <SignIn isSignIn={isSignIn} />}
          />
          <Route exact path="/playlist" render={() => <PlayList />} />
          <Route exact path="/" render={() => <Main />} />
          <Route
            path="/"
            render={() => {
              if (isSignIn) {
                return <Redirect to="/main" />;
              }
              return <Redirect to="/signin" />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
