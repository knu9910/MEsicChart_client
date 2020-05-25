import React from 'react';

const mainSearch = (props) => {
    return (
        <div class="search-Bar" >
            <input 
            className="search-Input" 
            type="text" 
            name="DB의 search" 
            placeholder="검색어를 입력해주세요" required>
            </input>
            <button onClick = {() => props.searchMusic(document.querySelector(".search-Input").value)}
            className="search-Button">search
            </button>
        </div>
    );
};
export default mainSearch;