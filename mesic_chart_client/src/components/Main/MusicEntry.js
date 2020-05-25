import React from 'react';

const MusicEntry = (props) => {
    const videoId = props.video.snippet.resourceId ? props.video.snippet.resourceId.videoId : props.video.id.videoId
    return (
    <div>
        <iframe src= {"https://www.youtube.com/embed/"+videoId}></iframe>
    </div>
    )
};
export default MusicEntry;