import React from "react";

import NavBar from "../components/NavBar";
import MyMusicList from "../components/PlayList/MyMusicList";
// import PlayerBar from "../components/PlayList/PlayerBar";

// const getRecommendedPlaylist = require("../youtubeApi/getRecommendedPlaylist");

const PlayList  = (props) => {

  return (
    <div>
        <NavBar searchMusic={props.searchMusic}/>
        <MyMusicList />
    </div>
  );
  
}

export default PlayList;
