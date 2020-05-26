import React from "react";

import NavBar from "../components/PlayList/NavBar";
import MyMusicList from "../components/PlayList/MyMusicList";
// import PlayerBar from "../components/PlayList/PlayerBar";

// const getRecommendedPlaylist = require("../youtubeApi/getRecommendedPlaylist");

class PlayList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <MyMusicList />
      </div>
    );
  }
}

export default PlayList;
