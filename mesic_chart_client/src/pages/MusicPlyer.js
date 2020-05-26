import React from 'react';
import NavBar from '../components/NavBar';

const MusicPlyer = (props) => {
    console.log(props.video)
  let videoId;
  if(props.video) {
    videoId = props.video.snippet.resourceId ? props.video.snippet.resourceId.videoId : props.video.id.videoId
    const videoTitle = props.video.snippet.title;
  }else {
    videoId = 1;
  }
  return (
      <div>
       <NavBar searchMusic={props.searchMusic}/>
       <iframe className="embed-responsive-item"
        src={"https://www.youtube.com/embed/"+ videoId} allowFullScreen></iframe>
    </div>
  )
}

export default MusicPlyer;
