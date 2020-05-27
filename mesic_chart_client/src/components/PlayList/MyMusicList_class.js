// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// import "../../css/MyMusicList.css"

// class MyMusicList extends React.Component{
//   constructor(props){
//     super(props);
//     this.init();
//     this.video = "1cH2cerUpMQ"

//     window['onYouTubeIframeAPIReady'] = (e) => {
//       this.YT = window['YT'];
//       this.reframed = false;
//       this.player = new window['YT'].Player('player', {
//         videoId: this.video,
//         events: {
//           'onStateChange': this.onPlayerStateChange.bind(this),
//           'onError': this.onPlayerError.bind(this),
//           'onReady': (e) => {
//             if (!this.reframed) {
//               this.reframed = true;
//               reframe(e.target.a);
//             }
//           }
//         }
//       });
//     };
//   }
    
//   init() {
//     var tag = document.createElement('script');
//     tag.src = 'https://www.youtube.com/iframe_api';
//     var firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//   }

//   render(){
    
//     return (
//        <div id="player"></div>
    
//     );
//   }
// }

// export default MyMusicList;