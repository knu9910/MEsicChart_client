import React from "react";
import { withRouter } from "react-router-dom";
import NavBar from "../components/NavBar";
import MyMusicList from "../components/PlayList/MyMusicList";

const PlayList  = (props) => {
  const {searchMusic, changeSignState,  isSignIn } = props;
  console.log(isSignIn);
  if(!isSignIn){
    alert('로그인해!')
    props.history.push('/signin');
    return(<div>NOT login</div>);
  }else {
    return (
      <div>
          <NavBar searchMusic={searchMusic} changeSignState={changeSignState} isSignIn={isSignIn}/>
          <MyMusicList />
      </div>
    );
  }
  
}

export default withRouter(PlayList);
