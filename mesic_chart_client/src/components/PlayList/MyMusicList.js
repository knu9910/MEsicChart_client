import React, { useState, useEffect } from "react";

import MyMusicListEntry from "./MyMusicListEntry"
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

  const geMusicList =  () => {
    console.log("geMusicList 진입");
     axios.get('http://3.34.124.39:3000/musiclist', {
      withCredentials:true
     })
    .then((res) => {
      console.log('geMusicList 성공')
      console.log('musicList: ', res.data)
      setVideoInfo(res.data)
      setCurVideo("BfWqUjunXXU")
    })
    .catch((err) => {
      console.log("geMusicList Error: ", err)
    })
  };

  const onPlayerStateChange = (e) => {
    console.log(e.data);
    if (e.data === 1) {
      setPlaying(true);
    } else if (e.data === 2) {
      setPlaying(false);
    }
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

  const onPlayerReady = () => {
    setLoading(true);
    setPlaying(true);
    checkCurrentTime = setInterval(setTime, 1000);
    geMusicList();
    setTotalTime(() => transTime(player.getDuration()));
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
    setCurVideo(video);
  }
  
  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player("player", {
        height: "380",
        width: "700",
        videoId: curVideo,
        host: 'https://www.youtube.com',
        playerVars: {
          controls: 0,
          enablejsapi : 1,
          origin: 1
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
        onPlayerReady,
      });
    };

    return () => {
      clearInterval(checkCurrentTime);
    };
  });

  if (isLoading) {
    if (isPlaying) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  }

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
          {videoInfo.map(video => (
            <MyMusicListEntry video={video} thumbnail={video.thumbnail} title={video.title} 
            musician={video.description} totalTime={totalTime}
            handleVideoTitleClick={handleVideoTitleClick.bind(this)}/>
          ))}
          {/* <div className="top-bar">
            <p>목록</p>
            <i className="fas fa-ellipsis-v"></i>
          </div>
          <div className="contents">
          <div className="thumbnail">
              <img src="../images/music_icon.png" />
            </div>
            <div className="music-info">
              <div className="title">노래 제목</div>
              <div className="musician">가수</div>
            </div>
            <div className="time">{totalTime}</div>
            </div> */}
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
            onClick={console.log(curVideo)}
          />
        </div>
        <div className="controlsWrap">
          <div className="leftControl">
            <button
              className="btn"
              onClick={() => player.seekTo(player.getCurrentTime() - 10, true)}
            >
              <i className="fas fa-step-backward"></i>
            </button>
            <button
              className="btn"
              onClick={() => {
                setPlaying(!isPlaying);
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
              onClick={() => player.seekTo(player.getCurrentTime() + 10, true)}
            >
              <i className="fas fa-step-forward"></i>
            </button>
          </div>
          
          <div className="musicInfo">
            <div className="thumbnail">
              <img src="../images/music_icon.png" />
            </div>
            <div className="music-info">
              <div className="title">[MV] IU(아이유) _ Blueming(블루밍)</div>
              <div className="musician">IU(아이유)</div>
            </div>
            <div className="time">{isLoading ? `${currentTime} / ${totalTime}` : ""}</div>
          </div>

          <div className="rightControl">
            <i className="fas fa-volume-up"></i>
            <i className="fas fa-volume-mute"></i>
            <i className="fas fa-random"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMusicList;
