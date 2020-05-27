import React from 'react';
import { Link } from "react-router-dom";

const footer = (props) => {
    const currentSign = props.isSignIn ? "로그아웃" : "로그인"
    return (
        <div className="footer">
        </div>  
    );
};

export default footer;