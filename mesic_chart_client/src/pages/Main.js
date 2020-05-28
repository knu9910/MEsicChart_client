import React from 'react';
import "../css/Main.css"
import NavBar from '../components/NavBar';
import RecommandedMusicList from '../components/Main/RecommandedMusicList';
import Footer from '../components/Footer';

const Main = (props) => {
  const {onLogout, isSignIn, searchMusic, videos, changeMusicPlyer} = props;
  return (      
        <div className="main">
            <NavBar isSignIn = {isSignIn} searchMusic = {searchMusic} onLogout = {onLogout}/>
            <RecommandedMusicList videos = {videos} changeMusicPlyer = {changeMusicPlyer}/>
            <Footer />
        </div>
    );
    
}

export default Main;

/*
1. 상단에 검색바와 그 밑으로 추천영상 3개가 먼저 메인화면에 나옴.
2. 검색어를 입력하고 검색을 누르게되면 기존에 있던 추천영상이
   검색어에 대한 유튜브 비디오리스트로 바뀌어야함.
3. 메인의 추천영상이나 리스트에 있는 영상을 누르게 되면 재생화면으로 넘어가야 함.
4. 하단에는 자신의 음악리스트로 가는  버튼(플레이리스트로 라우팅)과
   로그아웃 버튼(로그인화면으로 라우팅) 구현
*/
