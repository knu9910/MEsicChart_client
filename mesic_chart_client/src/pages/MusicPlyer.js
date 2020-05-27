import React from 'react';
import NavBar from '../components/NavBar';

const MusicPlyer = (props) => {
  const {searchMusic, changeSignState, isSignIn, video } = props;
  let videoId;
  if(video) {
    videoId = video.snippet.resourceId ? video.snippet.resourceId.videoId : video.id.videoId
    const videoTitle = video.snippet.title;
  }else {
    videoId = 1;
  }
  return (
      <div>
       <NavBar searchMusic={searchMusic} changeSignState={changeSignState} isSignIn={isSignIn}/>
       <iframe className="embed-responsive-item"
        src={"https://www.youtube.com/embed/"+ videoId} allowFullScreen></iframe>
    </div>
  )
}

export default MusicPlyer;
