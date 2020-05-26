import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PlayList from "./pages/PlayList";
import { searchMusicsByText } from "./youtubeApi/searchMusicsByText";
import { getRecommendedPlaylist } from './youtubeApi/getRecommendedPlaylist';
import MusicPlyer from "./pages/MusicPlyer";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignIn: false,
      videos:[],
      video: []
    };
    this.changeSignState = this.changeSignState.bind(this);
    this.searchMusic = this.searchMusic.bind(this);
    this.changeMusicPlyer = this.changeMusicPlyer.bind(this);
  }

  searchMusic(query) {
    searchMusicsByText(query, 8)
    .then(res => res.json())
    .then((json) => {
        console.log(json)
      const videos = json.items
      this.setState({videos})
    }) 
    .catch(err => console.log(err));
  }

  changeMusicPlyer(video){
    this.setState({video});
    this.props.history.push('/musicPlyer');
  }

  componentDidMount() {
    getRecommendedPlaylist(8)
    .then((res) => res.json())
    .then((json) => {
        console.log(json.items[0])
      const videos = json.items
      this.setState({videos})
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
            render={() => <SignIn isSignIn={isSignIn} changeSignState={this.changeSignState} />}
          />
          <Route exact path="/playlist" render={() => <PlayList searchMusic={this.searchMusic}/>} />
          <Route exact path="/" render={() => <Main isSignIn={isSignIn} changeSignState={this.changeSignState} searchMusic={this.searchMusic} videos={videos} changeMusicPlyer={this.changeMusicPlyer}/>} />
          <Route exact path="/musicPlyer" render={() => <MusicPlyer video = {video} searchMusic={this.searchMusic}/>} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
