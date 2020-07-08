import React from "react";
import { withRouter } from "react-router-dom";
import NavBar from "../components/NavBar";
import MyMusicList from "../components/PlayList/MyMusicList";
import swal from "sweetalert";

const PlayList  = (props) => {
  const {searchMusic, onLogout, isSignIn } = props;
  console.log(isSignIn);
  if(!isSignIn){
    swal({
      title: '로그인이 필요합니다.',
      text: '로그인화면으로 이동합니다.',
      icon : "error",})
    props.history.push('/signin');
    return(<div>NOT login</div>);
  }else {
    return (
      <div>
          <NavBar searchMusic={searchMusic} onLogout={onLogout} isSignIn={isSignIn}/>
          <MyMusicList />
      </div>
    );
  }
  
}

export default withRouter(PlayList);
