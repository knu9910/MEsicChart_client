import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

const MusicEntry = (props) => {
    const videoId = props.video.snippet.resourceId ? props.video.snippet.resourceId.videoId : props.video.id.videoId
    const videoTitle = props.video.snippet.title;
    return (
    <span className="video-field">
        <img className="videos" src= {`http://img.youtube.com/vi/${videoId}/mqdefault.jpg`} />
        <span className="videoTitle">
            {videoTitle}
        </span>
    </span>
    )
};
export default MusicEntry;