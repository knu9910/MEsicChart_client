import React, { useState, useEffect } from "react";

import MyMusicListEntry from "./MyMusicListEntry";
import "../../css/MyMusicList.css";

import axios from "axios";

axios.defaults.withCredentials = true;

export let player;

const MyMusicList = () => {
  const [isPlaying, setPlaying] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("0:00");
  const [mouseDragX, setMouseDragX] = useState(false);
  const [activeButton, setactiveButton] = useState(false);
  let checkCurrentTime;

  const [videoInfo, setVideoInfo] = useState([]);
  const [curVideo, setCurVideo] = useState(null);
  const [videoIndex, setoVideoIndex] = useState(0);

  const onPlayerReady = () => {
    console.log("onPlayerReady 진입");
    setLoading(true);
    setPlaying(true);
    checkCurrentTime = setInterval(setTime, 1000);
    setTotalTime(() => transTime(player.getDuration()));
  };

  const onPlayerStateChange = (e) => {
    console.log("onPlayerStateChange 진입")
    console.log(e.data);
    // if (e.data === 1) {
    //   setPlaying(true);
    // } else if (e.data === 2) {
    //   setPlaying(false);
    // }
  };

  const transTime = (seconds) => {
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

  const setTime = () => {
    setCurrentTime(transTime(player.getCurrentTime().toFixed()));
  };

  const dragHandler = (e) => {
    setMouseDragX(e.x);
    const nowFraction = e.x / window.innerWidth;
    player.seekTo(player.getDuration() * nowFraction, true);
  };

  const drag = () => {
    document.addEventListener("mousemove", dragHandler);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", dragHandler);
      setMouseDragX(false);
    });
  };

  const handleVideoTitleClick = (video) => {
    console.log("handleVideoTitleClick 성공");
    setCurVideo(video);
    console.log("전 curVideo: ", curVideo)
    player.loadVideoById(video, 0)
    console.log(player)
    console.log("후 curVideo: ", curVideo)
  };

  const handleVideoNext = () => {
    console.log("handleVideoNext 성공");

    if(videoInfo[videoIndex+1]){
      player.loadVideoById(videoInfo[videoIndex + 1].videoId, 0)
      setoVideoIndex(videoIndex+1)
    }
  };

  const handleVideoBack = () => {
    console.log("handleVideoBack 성공");

    if(videoInfo[videoIndex-1]){
      player.loadVideoById(videoInfo[videoIndex - 1].videoId, 0)
      setoVideoIndex(videoIndex-1)
    }
  };

  const handlePlayAndPause = () => {
    console.log("handlePlayAndPause 진입");
      if (!isPlaying) {
        console.log("play: ", isPlaying)     
        player.playVideo();
        setPlaying(true)
      } else {
        console.log("play: ", isPlaying)
        player.pauseVideo();
        setPlaying(false)
      }
  };
  
  const handleMuteAndUnMute = () => {
    console.log("handleMuteAndUnMute 진입");

    if(!activeButton){
      console.log("mute: ", activeButton)
      player.mute();
      setactiveButton(true)
    }else{
      console.log("unMute: ", activeButton)
      player.unMute();
      setactiveButton(false)
    }
  }

  const handleShuffle = () => {
    console.log("handleShuffle 진입")
    var j, x, i;
    for (i = videoInfo.length; i; i -= 1) {
      j = Math.floor(Math.random() * i);
      x = videoInfo[i - 1];
      videoInfo[i - 1] = videoInfo[j];
      videoInfo[j] = x;
    }

    player.loadVideoById(videoInfo[0].videoId, 0)
  }

  const handleDeleteVideo = (video) => {
    axios.post("http://3.34.124.39:3000/delete", {videoId: video.videoId}, {withCredentials:true})
    .then(data => {
      console.log("data: ", data)
      console.log("delete 성공")
      let deletedVideoIndex = 0;
      for(let i = 0; i < videoInfo.length; i++){
        if(video.videoId === videoInfo[i].videoId){
          deletedVideoIndex = i
          break
        }
      }
      let tmpArr = videoInfo.slice();
      tmpArr.splice(deletedVideoIndex, 1)
      setVideoInfo(tmpArr)
      console.log("videoInfo: ", videoInfo)
      console.log("tmpArr: ", tmpArr)
    })
  }

  useEffect(() => {
    if (curVideo === null) {
      axios.get("http://3.34.124.39:3000/musiclist").then((res) => {
        console.log("res.data: ", res.data);
        setVideoInfo(res.data);
        setCurVideo(res.data[0]);
      });
    } else {
      if (window.YT) {
        console.log(window.YT);
        console.log("curVideo: ", curVideo.videoId);
        window.onYouTubeIframeAPIReady = () => {
          player = new window["YT"].Player("player", {
            height: "380",
            width: "700",
            videoId: curVideo.videoId,
            // videoId: "BfWqUjunXXU",
            host: "https://www.youtube.com",
            playerVars: {
              autoplay: 1,
              controls: 0,
              enablejsapi: 1,
              origin: 1,
            },
            events: {
              // video player가 준비되면 이 함수 호출
              onReaady: onPlayerReady,
              // player의 상태가 바뀌면 이 함수 호출
              onStateChange: onPlayerStateChange,
            },
          });
        };
      } else {
        console.log("can not load player");
      }
      // hook의 cleanup 함수로 인식하고, 다음 effect가 실행되기 전에 실행
      return () => {
        clearInterval(checkCurrentTime);
      };
    }
  }, [videoInfo, curVideo, checkCurrentTime, onPlayerReady]);

  return (
    <div>
      <div className="musicList">
        <div className="player">
          <div id="player"></div>
        </div>

        <div className="list">
          <div className="top-bar">
            <p>목록</p>
            <i className="fas fa-ellipsis-v"></i>
          </div>
          {videoInfo.map((video, index) => (
            <MyMusicListEntry key={index}
              video={video}
              thumbnail={video.thumbnail}
              title={video.title}
              musician={video.description}
              totalTime={totalTime}
              handleVideoTitleClick={handleVideoTitleClick.bind(this)}
              handleDeleteVideo={handleDeleteVideo.bind(this)}
            />
          ))}
        </div>
      </div>

      {/* playerBar */}
      <div className="playerBar">
        <div
          className="loadBar"
          style={
            isLoading
              ? {
                  width: mouseDragX
                    ? mouseDragX
                    : String(
                        (player.getCurrentTime() / player.getDuration()) * 100
                      ) + "vw",

                  border:
                    activeButton || mouseDragX
                      ? "2px solid #db021f"
                      : "0px solid #db021f",
                }
              : { width: "0vw" }
          }
        >
          <button
            className="dragBtn"
            style={{ opacity: activeButton || mouseDragX ? "1" : "0" }}
            onMouseOver={() => setactiveButton(true)}
            onMouseOut={() => setactiveButton(false)}
            onMouseDown={drag}
          />
        </div>
        <div className="controlsWrap">
          <div className="leftControl">
            <button
              className="btn"
              onClick={() => handleVideoBack()}
            >
              <i className="fas fa-step-backward"></i>
            </button>
            <button
              className="btn"
              onClick={() => {
                handlePlayAndPause()
              }}
            >
              {isPlaying ? (
                <i className="fas fa-pause"></i>
              ) : (
                <i className="fas fa-play"></i>
              )}
            </button>
            <button
              className="btn"
              // onClick={() => player.seekTo(player.getCurrentTime() + 10, true)}
              onClick={() => handleVideoNext()}
            >
              <i className="fas fa-step-forward"></i>
            </button>
          </div>

          <div className="musicInfo">
            <div className="thumbnail">
              <img src={curVideo? curVideo.thumbnail : ""} />
            </div>
            <div className="music-info">
              <div className="title">
                {curVideo? curVideo.title : null}
              </div>
              <div className="musician">
                {curVideo? curVideo.description : []}</div>
            </div>
            <div className="time">
              {isLoading ? `${currentTime} / ${totalTime}` : ""}
            </div>
          </div>

          <div className="rightControl">
            <button className="btn" onClick={() => handleMuteAndUnMute()}>
              <i className="fas fa-volume-up"></i>
            </button>
            <button className="btn" onClick={() => handleMuteAndUnMute()}>
              <i className="fas fa-volume-mute"></i>
            </button>
            <button className="btn" onClick={()=> handleShuffle()}>
            <i className="fas fa-random" ></i>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMusicList;
