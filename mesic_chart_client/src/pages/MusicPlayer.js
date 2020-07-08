import React from 'react';
import NavBar from '../components/NavBar';
import "../css/MusicPlayer.css"
import axios from 'axios'
import swal from "sweetalert";
import musicAdd from "../images/musicAdd2.png";
import { withRouter } from 'react-router-dom'

const MusicPlayer = (props) => {
 
  const postMusicToPlaylist = () => {
    if(props.isSignIn) {
      const title = props.video.snippet.title;
      const description = props.video.snippet.description;
      const thumbnail = props.video.snippet.thumbnails.medium.url;
      const videoId = props.video.snippet.resourceId ? props.video.snippet.resourceId.videoId : props.video.id.videoId;

      axios.post('http://3.34.124.39:3000/musiclist', {
        "title": title,
        "description": description,
        "thumbnail": thumbnail,
        "videoId": videoId
      }, { withCredentials: true })
      .then(res => {
        if(res.data === '이미 추가된 음악입니다.') {
          swal({
            text: '이미 추가된 음악입니다.',
            icon : "warning",})
        } else if(res.data.title) {
          swal({
            text:`${res.data.title}이 추가됐습니다.`,
            icon : 'success'
          })
        }
      })
      .catch(err => console.log("reqSignIn Error: ", err));
    }else {
      swal("로그인이 필요합니다. \n \n로그인화면으로 이동합니다", {
        dangerMode: true,
        buttons : true,
      })
      .then((gosignin) => {
        if (gosignin) {
          props.history.push('/signin')
        } 
      });
    }
  }

  const { searchMusic, onLogout, isSignIn, video, description } = props;
  console.log('description', description)
  console.log(video);
  let videoId, title;
  if(video) {
    videoId = video.snippet.resourceId ? video.snippet.resourceId.videoId : video.id.videoId;
    title = props.video.snippet.title;
    
  } else {
    videoId = null;
  }
  
  return (
    <div>
      <NavBar searchMusic={searchMusic} onLogout={onLogout} isSignIn={isSignIn}/>
      <div className="player-wrapper">
        <iframe className="embed-responsive-item"
          src={"https://www.youtube.com/embed/"+ videoId + "?autoplay=1"} 
          allowFullScreen width="960" height="447"></iframe>
        <img src={musicAdd} className="add-icon" onClick={postMusicToPlaylist} />
        <div className="player-title">{title}</div>
        <div className="player-description">{description}</div>
      </div>
      <div className="player-footer"></div>
    </div>
    );
}

export default withRouter(MusicPlayer);
