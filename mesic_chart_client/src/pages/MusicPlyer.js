import React from 'react';
import NavBar from '../components/NavBar';
import "../css/MusicPlayer.css"
import axios from 'axios'

class MusicPlayer extends React.Component {
  postMusicToPlaylist = () => {
    // console.log('title : ', this.props.video.snippet.title)
    // console.log('description : ', this.props.video.snippet.description)
    // console.log('thumbnail : ', this.props.video.snippet.thumbnails.standard.url)
    // console.log('videoId : ', this.props.video.snippet.resourceId.videoId)
    const title = this.props.video.snippet.title;
    const description = this.props.video.snippet.description;
    const thumbnail = this.props.video.snippet.thumbnails.standard.url;
    const videoId = this.props.video.snippet.resourceId.videoId;

    axios.post('http://3.34.124.39:3000/musiclist', {
      "title": title,
      "description": description,
      "thumbnail": thumbnail,
      "videoId": videoId
    }, { withCredentials: true })
    .then(res => {
      if(res.data === '이미 추가된 음악입니다.') {
        alert('이미 추가된 음악입니다.');
      } else if(res.data.title) {
        alert(`${res.data.title}이 추가됐습니다.`)
      }
    })
    .catch(err => console.log("reqSignIn Error: ", err));
  }

  render() {
    const { searchMusic, onLogout, isSignIn, video } = this.props;
    let videoId;
    if(video) {
      videoId = video.snippet.resourceId ? video.snippet.resourceId.videoId : video.id.videoId
    } else {
      videoId = 1;
    }
    return (
      <div>
        <NavBar searchMusic={searchMusic} onLogout={onLogout} isSignIn={isSignIn}/>
        <div className="wrapper">
          <iframe className="embed-responsive-item"
            src={"https://www.youtube.com/embed/"+ videoId + "?autoplay=1"} 
            allowFullScreen width="960" height="447"></iframe>
          <div>
            <button className="add-button" onClick={() => this.postMusicToPlaylist()}>음악 추가하기</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
