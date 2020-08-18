import React from "react";
import './header.css';

export default class Header extends React.Component {
    render(){
        return(
            <div className="header">
                <div className="header-logo"></div>
                <ul className="header-list">
                    <li>Home</li>
                    <li>About</li>
                    <li>Product</li>
                    <li>Contacts</li>
                </ul>
                <div>
                    <button className="header-register">Register </button>
                    <button className="header-login">Login </button>
                </div>
            </div>
        );
    }
}