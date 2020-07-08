import React from "react";
import MyMusicListEntry from "./MyMusicListEntry";
import YouTube from 'react-youtube';
import axios from "axios";
import "../../css/MyMusicList.css";

let player;
class MyMusicList extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      videoId: null,
      videos: [],
      videoIndex: 0,
      isPlaying: true,
      activeButton: false,
      totalTime: '0:00',
      playTimeBegin: null,
      playTimeEnd: null,
      playTime: 0,
      isPlayingForPlayTime: false
    }
  }

  async componentDidMount() {
    const res = await axios.get('http://3.34.124.39:3000/musiclist', { withCredentials: true });
    const data = res.data;
    console.log('res.data : ', data)
    if(data.length !== 0) {
      data.sort((a, b) => b.playtime - a.playtime);
      const videoId = data[0].videoId;
      this.setState({ videos: data });
      this.setState({ videoId });
    }
  } 

  handleVideoTitleClick = (videoId, index) => {
    player.loadVideoById(videoId, 0)
    this.setState({ videoIndex: index })
  };

  handleDeleteVideo = videoId => {
    axios.post('http://3.34.124.39:3000/delete', { videoId }, { withCredentials:true })
      .then(data => {
        console.log('음악을 삭제 했습니다.', data)
        let deleteVideoIndex;
        for(let i = 0; i < this.state.videos.length; i++) {
          if(videoId === this.state.videos[i].videoId){
            deleteVideoIndex = i;
            break;
          }
        }
        let newVideos = this.state.videos.slice();
        newVideos.splice(deleteVideoIndex, 1)
        this.setState({ videos: newVideos})
      });
  };

  handleVideoBack = () => {
    const { videos, videoIndex } = this.state;
    if(videos[videoIndex - 1]) {
      player.loadVideoById(videos[videoIndex - 1].videoId, 0)
      this.setState({ 
        videoIndex: videoIndex - 1,
        isPlaying: true 
      });
    }
  };

  handleVideoNext = () => {
    const { videos, videoIndex } = this.state;
    if(videos[videoIndex + 1]) {
      player.loadVideoById(videos[videoIndex + 1].videoId, 0)
      this.setState({ 
        videoIndex: videoIndex + 1,
        isPlaying: true 
      });
    }
  };

  handlePlayAndPause = () => {
    if(!this.state.isPlaying) {   
      player.playVideo();
      this.setState({ isPlaying: true });
    } else {
      player.pauseVideo();
      this.setState({ isPlaying: false });
    }
  };

  handleMuteAndUnMute = (isMute) => {
    if(!isMute){
      player.mute();
      this.setState({ activeButton: true });
    } else {
      player.unMute();
      this.setState({ activeButton: false });
    }
  }

  handleShuffle = () => {
    const { videos, videoIndex } = this.state;
    var j, x, i;
    for (i = videos.length; i; i -= 1) {
      j = Math.floor(Math.random() * i);
      x = videos[i - 1];
      videos[i - 1] = videos[j];
      videos[j] = x;
    }
    player.loadVideoById(videos[0].videoId, 0)
    this.setState({ videoIndex: 0 });
  }

  handlePlay = () => { // 재생시 호출
    console.log('play-----')
    const currentTime = new Date().getTime();
    this.setState({ 
      playTimeBegin: currentTime,
      isPlayingForPlayTime: true 
    });
  }

  handleEnd = () => { // 종료시 호출
    console.log('end')
    this.handleVideoNext();
  }

  handlePause = () => { // 멈춤시 호출
    console.log('pause-----')
    const currentTime = new Date().getTime();
    const playtime = currentTime - this.state.playTimeBegin;
    console.log('playtime : ', playtime)
    this.setState({
      playTimeBegin: 0,
      playTime: 0
    })

    axios.post('http://3.34.124.39:3000/writeplaytime', {
      "videoId": this.state.videos[this.state.videoIndex].videoId,
      "playtime": playtime
    }, { withCredentials:true })
      .then(data => {
        console.log('playtime을 기록했습니다.', data.data.playtime)
        
      });
  }

  render() {
    const opts = {
      heigth: '100%',
      width: '100%',
      playerVars: {
        autoplay: 1,
      },
    };

    const { videos, video, totalTime } = this.state

    return (
      <div>
        <div className="musicList">
          <div className="player">
            <YouTube videoId={this.state.videoId} opts={opts} onReady={this._onReady} className="player"
              onPlay={() => this.handlePlay()}
              onEnd={() => this.handleEnd()}  
              onPause={() => this.handlePause()}  
            />
          </div>
          <div className="list">
            <div className="top-bar">
              <p>많이 재생한 순서</p>
             
            </div>
            { videos ? videos.map((video, index) => (
                <MyMusicListEntry 
                  key={index} video={video.videoId} index={index} thumbnail={video.thumbnail} title={video.title} musician={video.description} totalTime={totalTime}
                  handleVideoTitleClick={this.handleVideoTitleClick}
                  handleDeleteVideo={this.handleDeleteVideo}
                />
              )) : null }
          </div>
        </div>

        {/* playerBar */}
        <div className="playerBar">
          <div
            className="loadBar"

          >
            <button
              className="dragBtn"
            />
          </div>
          <div className="controlsWrap">
            <div className="leftControl">
              <button className="btn" onClick={() => this.handleVideoBack()}>
                <i className="fas fa-step-backward"></i>
              </button>
              <button className="btn" onClick={() => this.handlePlayAndPause()}>
                { this.state.isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i> }
              </button>
              <button className="btn" onClick={() => this.handleVideoNext()}>
                <i className="fas fa-step-forward"></i>
              </button>
            </div>

            <div className="musicInfo">
              <div className="thumbnail">
              </div>
              <div className="music-info">
                <div className="title">
                  { videos[this.state.videoIndex] ? videos[this.state.videoIndex].title : null }
                </div>
                <div className="musician">
                  { videos[this.state.videoIndex] ? videos[this.state.videoIndex].description : [] }
                </div>
              </div>
              <div className="time">
                {/* {isLoading ? `${currentTime} / ${totalTime}` : ""} */}
              </div>
            </div>

            <div className="rightControl">
              <button className="btn" onClick={() => this.handleMuteAndUnMute(true)}>
                <i className="fas fa-volume-up"></i>
              </button>
              <button className="btn" onClick={() => this.handleMuteAndUnMute(false)}>
                <i className="fas fa-volume-mute"></i>
              </button>
              <button className="btn" onClick={()=> this.handleShuffle()}>
                <i className="fas fa-random" ></i>
              </button>
              
            </div>
          </div>
        </div>
      </div>
    )
  }

  _onReady(event) {
    player = event.target;
  }

}

export default MyMusicList;
