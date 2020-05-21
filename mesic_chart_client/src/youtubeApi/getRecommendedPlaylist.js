const key = ''; // youtube 키를 넣어주세요.

const fetch = require('node-fetch');

const getRecommendedPlaylist = async (videoCount) => {
  return await fetch('https://www.googleapis.com/youtube/v3/playlistItems?' + 
    'playlistId=PLFgquLnL59alGJcdc0BEZJb2p7IgkL0Oe&part=snippet&' + 
    `maxResults=${videoCount}&key=${key}`);
}

module.exports = getRecommendedPlaylist;

/*
사용 예제

getRecommendedPlaylist(3)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.log(err));
*/