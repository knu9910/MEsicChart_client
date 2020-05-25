import React from 'react';
import { Link } from "react-router-dom";

const footer = (props) => {
    const currentSign = props.isSignIn ? "로그아웃" : "로그인"
    return (
        <div className="footer">
            <button className="go-List-Button"><Link to="/PlayList">플레이리스트</Link></button>
            <button className="signout-Button"><Link to="/SignIn">{currentSign}</Link></button>
        </div>
    );
};

export default footer;