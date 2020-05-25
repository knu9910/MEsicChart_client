import React from "react";

import NavBar from "../components/PlayList/NavBar";
import MyMusicList from "../components/PlayList/MyMusicList";
import PlayerBar from "../components/PlayList/PlayerBar";

const getRecommendedPlaylist = require("../youtubeApi/getRecommendedPlaylist");

class PlayList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <MyMusicList />
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
