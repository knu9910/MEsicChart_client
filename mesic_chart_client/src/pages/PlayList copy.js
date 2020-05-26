import React from "react";

import NavBar from "../components/PlayList/NavBar";
// import {MyMusicList} from "../components/PlayList/MyMusicList";
import PlayerBar from "../components/PlayList/PlayerBar";

const getRecommendedPlaylist = require("../youtubeApi/getRecommendedPlaylist");

class PlayList extends React.Component {
  constructor(props){
    super(props);
    this.init();
    this.video = "TA3GqDcZuN0"

    window['onYouTubeIframeAPIReady'] = (e) => {
      this.YT = window['YT'];
      this.player = new window['YT'].Player('player', {
        height: "480",
        width: "800",
        videoId: this.video,
        origin : 0
      });
    };
  }
    
  init() {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  render() {
    return (
      <div>
        <NavBar />
        <div id="player"></div>
        {/* <MyMusicList /> */}
        {/* <PlayerBar /> */}
      </div>
    );
  }
}

export default PlayList;

{
  /* <h2>플레이리스트</h2>
        <button
          onClick={(e) => {
            getRecommendedPlaylist(3)
              .then((res) => res.json())
              .then((json) => console.log(json))
              .catch((err) => console.log(err));
          }}
        >
          click me
        </button> */
}
