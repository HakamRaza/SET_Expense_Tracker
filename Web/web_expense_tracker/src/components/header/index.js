import React from "react";
import './header.css';
import { FaAlignJustify } from "react-icons/fa";
import { IconContext } from "react-icons";
import {Link} from 'react-router-dom';


export default class Header extends React.Component {
    

    render(){
        return(
            <div className="header">

                <div className="header-mobile" tabIndex="1">
                    <IconContext.Provider value={{ className: 'header-mobile-icons' }}>
                        <FaAlignJustify/>
                    </IconContext.Provider>

                    <ul className="header-list-mobile">
                        <li>Home</li>
                        <li>About</li>
                        <li>Products</li>
                        <li>Contacts</li>
                    </ul>
                </div>

                <div className="header-logo"></div>
                <ul className="header-list">
                    <li><u>Home</u></li>
                    <li><u>About</u></li>
                    <li><u>Products</u></li>
                    <li><u>Contacts</u></li>
                </ul>
            
                <div>
                    <Link to={"/register"}><button className="header-register">Register </button></Link>
                    <Link to={"/login"}><button className="header-login">Login </button></Link>
                </div>
            </div>
        );
    }
}