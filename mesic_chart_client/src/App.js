import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Main from './components/Main/Main';
import MainSearch from './components/Main/MainSearch';
import RecommandedMusicList from './components/Main/RecommandedMusicList';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PlayList from './components/PlayList/PlayList'
import PlayListSearch from './components/PlayList/PlayListSearch';
import MyMusicList from './components/PlayList/MyMusicList';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      isSignIn: false
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
          exact path="/signup"
          render={() => <SignUp/>}
          />
          <Route
          exact path="/signin"
          render={() => <SignIn />}
          />
          <Route
          exact path="/playlist"
          render={() => <PlayList/>}
          />
          <Route 
          exact path="/"
          render={() => <Main/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
