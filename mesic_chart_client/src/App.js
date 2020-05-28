import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PlayList from "./pages/PlayList";
import { searchMusicsByText } from "./youtubeApi/searchMusicsByText";
import { getRecommendedPlaylist } from './youtubeApi/getRecommendedPlaylist';
import MusicPlayer from "./pages/MusicPlayer";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: true,
      videos:[],
      video:null
    };
    this.searchMusic = this.searchMusic.bind(this);
    this.changeMusicPlyer = this.changeMusicPlayer.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogin() {
    this.setState({isSignIn: true});
    window.localStorage.setItem('id', '1');
    this.props.history.push('/');
  }

  onLogout() {
    this.setState({isSignIn: false});
    window.localStorage.clear();
  }
  searchMusic(query) {
    searchMusicsByText(query, 8)
    .then(res => res.json())
    .then((json) => {
      const videos = json.items
      this.setState({videos})
    }) 
    .catch(err => console.log(err));
  }

  changeMusicPlayer(video){
    this.setState({video});
    window.localStorage.setItem('player', JSON.stringify(video));
    this.props.history.push('/musicPlayer');
  }

  componentDidMount() {
    const id = window.localStorage.getItem('id');
    const get = window.localStorage.getItem('player');
    const video = JSON.parse(get); 
    let isSignIn = id ? true : false;  
    getRecommendedPlaylist(8)
    .then((res) => res.json())
    .then((json) => {
      const videos = json.items
      this.setState({videos, isSignIn, video})
    }) 
    .catch((err) => console.log(err));
  }

  changeSignState() {
    this.setState({
      isSignIn : !this.state.isSignIn
    })
  }

  render() {
    const { isSignIn, videos, video } = this.state;

    return (
      <div>
        <Switch>
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route
            exact
            path="/signin"
            render={() => <SignIn isSignIn={isSignIn} onLogin={this.onLogin} />}
          />
          <Route exact path="/playlist" render={() => <PlayList isSignIn={isSignIn} searchMusic={this.searchMusic} onLogout={this.onLogout}/>} />
          <Route exact path="/" render={() => <Main isSignIn={isSignIn} onLogout={this.onLogout} searchMusic={this.searchMusic} videos={videos} changeMusicPlyer={this.changeMusicPlyer}/>} />
          <Route exact path="/musicPlayer" render={() => <MusicPlayer isSignIn={isSignIn} video = {video} searchMusic={this.searchMusic} onLogout={this.onLogout}/>} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
