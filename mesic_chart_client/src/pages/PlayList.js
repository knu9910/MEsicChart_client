import React from "react";

// import getRecommendedPlaylist from "../youtubeApi/getRecommendedPlaylist";

const getRecommendedPlaylist = require("../youtubeApi/getRecommendedPlaylist");

const PlayList = () => {
  return (
    <div>
      <h2>플레이리스트</h2>
      <button
        onClick={(e) => {
          getRecommendedPlaylist(3)
            .then((res) => res.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err));
        }}
      >
        click me
      </button>
    </div>
  );
};

export default PlayList;
