import React from "react";
import './header.css';

export default class Header extends React.Component {
    render(){
        return(
            <div className="header">
                <div className="header-logo"></div>
                <ul className="header-list">
                    <li><u>Home</u></li>
                    <li><u>About</u></li>
                    <li><u>Products</u></li>
                    <li><u>Contacts</u></li>
                </ul>
            
                <div>
                    <button className="header-register">Register </button>
                    <button className="header-login">Login </button>
                </div>
            </div>
        );
    }
}