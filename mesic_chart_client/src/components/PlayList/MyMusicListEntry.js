import React from "react";

const MyMusicListEntry = ({video, thumbnail, title, musician, totalTime, handleVideoTitleClick, handleDeleteVideo, index}) => {
    console.log('video is ?', video)
    return (
        <div className="contents">
            <div className="thumbnail">
                {/* <img src={thumbnail} /> */}
            </div>
            <div className="music-info" onClick={() => handleVideoTitleClick(video, index)}>
                <div className="title">{title}</div>
                <div className="musician">{musician}</div>
            </div>
            <div className="time">{totalTime}</div>
            <button className="btn" onClick={() => handleDeleteVideo(video)}>
                삭제
            </button>
        </div>
    )
}
export default MyMusicListEntry;