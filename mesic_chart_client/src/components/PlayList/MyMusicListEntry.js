import React from "react";

const MyMusicListEntry = ({video, thumbnail, title, musician, totalTime, handleVideoTitleClick}) => (
    <div className="contents">
        <div className="thumbnail">
            <img src={thumbnail} />
        </div>
        <div className="music-info" onClick={() => handleVideoTitleClick(video)}>
            <div className="title">{title}</div>
            <div className="musician">{musician}</div>
        </div>
        <div className="time">{totalTime}</div>
    </div>
)

export default MyMusicListEntry;