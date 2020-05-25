import React from "react";

import NavBar from "../components/PlayList/NavBar";
// import {MyMusicList} from "../components/PlayList/MyMusicList";
// import PlayerBar from "../components/PlayList/PlayerBar";

// const getRecommendedPlaylist = require("../youtubeApi/getRecommendedPlaylist");

class PlayList extends React.Component {
  constructor(props){
    super(props);
    this.init();

    this.state = {
      isPlaying : false,
      isLoading : false,
      currentTime : "0:00",
      totalTime : "0:00",
      mouseDragX : false,
      activeButton : false,
      checkCurrentTime : "0:00",
      video : {}
    }

    window['onYouTubeIframeAPIReady'] = (e) => {
      this.YT = window['YT'];
      this.player = new window['YT'].Player('player', {
        height: "480",
        width: "800",
        videoId: "TA3GqDcZuN0", // this.video
        playerVars : {
          'autoplay': 1
          , 'controls': 0
          , 'autohide':1
          , 'Origin': 0
        }
      });
    };
  }
    
  init() {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";

    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  playerState = (e) => {
    console.log(e.data);
    if (e.data === 1) {
      this.setState = {
        isPlaying : true
      }
    } else if (e.data === 2) {
      this.setState = {
        isPlaying : false
      }
    }
  };

  transTime = (seconds) => {
    if (!seconds) {
      console.log(seconds);
      return;
    }
    const hour = parseInt(seconds / 3600);
    const min = parseInt((seconds % 3600) / 60);
    const sec = seconds % 60;

    return `${hour > 0 ? String(hour) + ":" : ""} ${min}:${
      sec < 10 ? "0" + String(sec) : sec
    }`;
  };

  setTime = () => {
    this.setState = {
      currentTime : this.transTime(this.player.getCurrentTime().toFixed())
    }
  };

  onReadyAPI = () => {
    this.setState = {
      isLoading : true,
      isPlaying : true
    }

    this.checkCurrentTime = setInterval(this.setTime, 1000);
    this.setState = {
      totalTime : this.transTime(this.player.getDuration())
    }
  };

  dragHandler = (e) => {
    this.setState = {
      mouseDragX : e.x
    }
    const nowFraction = e.x / window.innerWidth;
    this.player.seekTo(this.player.getDuration() * nowFraction, true);
  };

  drag = () => {
    document.addEventListener("mousemove", this.dragHandler);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.dragHandler);
      this.setState = {
        mouseDragX : false
      }
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <div id="player"></div>
      </div>
    );
  }
}

export default PlayList;