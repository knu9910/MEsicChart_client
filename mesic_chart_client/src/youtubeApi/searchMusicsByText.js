const key = ''; // youtube 키를 넣어주세요.

const fetch = require('node-fetch');
const urlencode = require('urlencode');

const part = 'snippet';
const type = 'video'; // 채널 아닌 비디오만
const videoCategoryId = '10'; // 음악

const searchMusicsByText = async (text, listCount) => {
  text = urlencode(text);
  return fetch('https://www.googleapis.com/youtube/v3/search?' + 
    `part=${part}&key=${key}&maxResults=${listCount}&q=${text}&type=${type}` +
    `&videoCategoryId=${videoCategoryId}`)
}

module.exports = searchMusicsByText;

/*
사용 예제

searchMusicsByText('여행', 3)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.log(err));
*/
