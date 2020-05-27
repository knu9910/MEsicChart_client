import React from "react";

import NavBar from "../components/NavBar";
import MyMusicList from "../components/PlayList/MyMusicList";

const PlayList  = (props) => {

  return (
    <div>
        <NavBar searchMusic={props.searchMusic}/>
        <MyMusicList />
    </div>
  );
  
}

export default PlayList;
