const key = "AIzaSyApNlWPZJJoP5mp7NRYMF3e56yU1Wua8Hw";
const fetch = require("node-fetch");
export const getRecommendedPlaylist = async (videoCount) => {
  return await fetch(
    "https://www.googleapis.com/youtube/v3/playlistItems?" +
      "playlistId=PLFgquLnL59alGJcdc0BEZJb2p7IgkL0Oe&part=snippet&" +
      `maxResults=${videoCount}&key=${key}`
  );
};
/*
사용 예제
getRecommendedPlaylist(3)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.log(err));
*/
