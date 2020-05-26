// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// export let player;

// const MyMusicList = () => {
//   const [isPlaying, setPlaying] = useState(false);
//   const [isLoading, setLoading] = useState(false);
//   const [currentTime, setCurrentTime] = useState("0:00");
//   const [totalTime, setTotalTime] = useState("0:00");
//   const [mouseDragX, setMouseDragX] = useState(false);
//   const [activeButton, setactiveButton] = useState(false);
//   let checkCurrentTime;

//   const playerState = (e) => {
//     console.log(e.data);
//     if (e.data === 1) {
//       setPlaying(true);
//     } else if (e.data === 2) {
//       setPlaying(false);
//     }
//   };

//   const transTime = (seconds) => {
//     if (!seconds) {
//       console.log(seconds);
//       return;
//     }
//     const hour = parseInt(seconds / 3600);
//     const min = parseInt((seconds % 3600) / 60);
//     const sec = seconds % 60;

//     return `${hour > 0 ? String(hour) + ":" : ""} ${min}:${
//       sec < 10 ? "0" + String(sec) : sec
//     }`;
//   };

//   const setTime = () => {
//     setCurrentTime(transTime(player.getCurrentTime().toFixed()));
//   };

//   const onReadyAPI = () => {
//     setLoading(true);
//     setPlaying(true);
//     checkCurrentTime = setInterval(setTime, 1000);
//     setTotalTime(() => transTime(player.getDuration()));
//   };

//   const dragHandler = (e) => {
//     setMouseDragX(e.x);
//     const nowFraction = e.x / window.innerWidth;
//     player.seekTo(player.getDuration() * nowFraction, true);
//   };

//   const drag = () => {
//     document.addEventListener("mousemove", dragHandler);
//     document.addEventListener("mouseup", () => {
//       document.removeEventListener("mousemove", dragHandler);
//       setMouseDragX(false);
//     });
//   };

//   useEffect(() => {
//     if (window.YT) {
//       console.log(window.YT);
//       window.onYouTubeIframeAPIReady = () => {
//         player = new window.YT.Player("player", {
//           height: "480",
//           width: "700",
//           videoId: "TA3GqDcZuN0",
//           playerVars: {
//             autoplay: 0,
//             controls: 0,
//             fs: 0,
//           },
//           events: {
//             onReady: onReadyAPI,
//             onStateChange: playerState,
//           },
//         });
//       };
//     } else {
//       console.log("can not load player");
//     }
//     return () => {
//       clearInterval(checkCurrentTime);
//     };
//   }, [checkCurrentTime, onReadyAPI]);

//   if (isLoading) {
//     if (isPlaying) {
//       player.playVideo();
//     } else {
//       player.pauseVideo();
//     }
//   }
  
//   return (
//     <>
//       <PlayerWrap>
//         <div id="player"></div>
//       </PlayerWrap>
//       <LoadBar
//         style={
//           isLoading
//             ? {
//                 width: mouseDragX
//                   ? mouseDragX
//                   : String(
//                       (player.getCurrentTime() / player.getDuration()) * 100
//                     ) + "vw",

//                 border:
//                   activeButton || mouseDragX
//                     ? "2px solid #db021f"
//                     : "0px solid #db021f",
//               }
//             : { width: "0vw" }
//         }
//       >
//         <DragButton
//           style={{ opacity: activeButton || mouseDragX ? "1" : "0" }}
//           onMouseOver={() => setactiveButton(true)}
//           onMouseOut={() => setactiveButton(false)}
//           onMouseDown={drag}
//         />
//       </LoadBar>
//       <ControlsWrap>
//         <MoveButton
//           onClick={() => player.seekTo(player.getCurrentTime() - 10, true)}
//         >
//           <i className="fas fa-step-backward"></i>
//         </MoveButton>
//         <Button
//           onClick={() => {
//             setPlaying(!isPlaying);
//           }}
//         >
//           {isPlaying ? (
//             <i className="fas fa-pause"></i>
//           ) : (
//             <i className="fas fa-play"></i>
//           )}
//         </Button>
//         <MoveButton
//           onClick={() => player.seekTo(player.getCurrentTime() + 10, true)}
//         >
//           <i className="fas fa-step-forward"></i>
//         </MoveButton>
//         {isLoading ? `${currentTime} / ${totalTime}` : ""}
//       </ControlsWrap>
//     </>
//   );
// };

// export default MyMusicList;

// const PlayerWrap = styled.div`
//   width: 100vw;
//   height: 86vh;
//   padding: 64px 48px 72px 48px;
//   background-color: #000000;
//   display: flex;
//   align-items: center;
// `;

// const Button = styled.button`
//   all: unset;
//   padding: 0px 20px;
//   font-size: 36px;
//   color: #ffffff;
//   cursor: pointer;
// `;

// const MoveButton = styled(Button)`
//   font-size: 24px;
// `;

// const ControlsWrap = styled.div`
//   position: fixed;
//   width: 100vw;
//   height: 7vh;
//   left: 0px;
//   bottom: 0px;
//   background-color: #1d1d1d;
//   display: flex;
//   align-items: center;
//   padding: 0px 50px;
//   color: #909090;
//   font-size: 12px;
// `;

// const LoadBar = styled.div`
//   position: relative;
//   z-index: 100;
//   height: 1px;
//   position: fixed;
//   bottom: 72px;
//   left: 0px;
//   background-color: #db021f;
// `;

// const DragButton = styled.div`
//   position: absolute;
//   transform: translate(50%, -50%);
//   right: 0px;
//   top: 0px;
//   width: 16px;
//   height: 16px;
//   background-color: #db021f;
//   border-radius: 50%;
//   transition: all 0.1s ease-in;
//   border: 3px solid rgba(255, 255, 255, 0.3);
// `;
