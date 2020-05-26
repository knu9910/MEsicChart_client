import React, { useState, useEffect } from "react";

import "../../css/MyMusicList.css";

import axios from "axios";

export let player;

const MyMusicList = () => {
  const [isPlaying, setPlaying] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("0:00");
  const [mouseDragX, setMouseDragX] = useState(false);
  const [activeButton, setactiveButton] = useState(false);
  let checkCurrentTime;

  const [videoId, setVideoId] = useState([]);
  const [curVideo, setCurVideo] = useState(null);

  const geMusicList = () => {
    console.log("geMusicList 진입");

    axios
      .get("http://3.34.124.39:3000/musiclist")
      .then((res) => {
        console.log("geMusicList() res: ", res);
        console.log("geMusicList 성공");
        console.log("res.data: ", res.data);
        setVideoId(res.data);
      })
      .catch((err) => {
        console.log("geMusicList Error: ", err);
      });
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

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player("player", {
        height: "580",
        width: "900",
        videoId: "TA3GqDcZuN0",
        playerVars: {
          controls: 0,
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
  }, [checkCurrentTime, onPlayerReady]);

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
          <div className="contents">
            <div className="thumbnail">
              <img src="../images/music_icon.png" />
            </div>
            <div className="music-info">
              <div className="title">노래 제목</div>
              <div className="musician">가수</div>
            </div>
            <div className="time">06:02</div>
          </div>
          <div className="contents">
            <div className="thumbnail">
              <img src="../images/music_icon.png" />
            </div>
            <div className="music-info">
              <div className="title">노래 제목</div>
              <div className="musician">가수</div>
            </div>
            <div className="time">06:02</div>
          </div>
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
          {isLoading ? `${currentTime} / ${totalTime}` : ""}
        </div>
      </div>
    </div>
  );
};

export default MyMusicList;
