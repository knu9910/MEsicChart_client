import React from 'react';

const Navbar = (props) => {
    return (
        <div className="nav-bar">
      <div className="left-content">
        <i className="fas fa-play-circle"></i>
        <span className="title">MEchart</span>
      </div>
      <div className="center-content">
        <div className="icons"> 
        <input 
        className="search-text" 
        type="text"
        placeholder="검색어를 입력해주세요" />
        <i onClick = {() => props.searchMusic(document.querySelector(".search-text").value)} 
        className="fas fa-search"></i>
        </div> 
      </div>
      <div className="right-content">
        <i className="fas fa-home"></i>
        <i className="fas fa-record-vinyl"></i>
        <i className="fas fa-ellipsis-v"></i>
      </div>
    </div>
    )
};
export default Navbar;

{/* <div class="search-Bar">
        <input 
        className="search-text" 
        type="text" 
        name="DB의 search" 
        placeholder="검색어를 입력해주세요" required>
        </input>
        <button onClick = {() => props.searchMusic(document.querySelector(".search-text").value)}
            className="search-Button">search
        </button>
    </div> */}