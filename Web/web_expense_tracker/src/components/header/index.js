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
                        <Link to={"/home"}><li>Home</li></Link>
                        <Link to={"/about"}><li>About</li></Link>
                        <Link to={"/about/#contact"}><li>Contact</li></Link>
                    </ul>
                </div>

                <div className="header-logo"></div>
                <ul className="header-list">
                    <Link to={"/home"}><li><u>Home</u></li></Link>
                    <Link to={"/about"}><li><u>About</u></li></Link>
                    {/* <Link to={"/about/#contact"}><li><u>Contact</u></li></Link> */}
                    <a href="/about/#contact"><li><u>Contact</u></li></a>
                    
                </ul>
            
                <div>
                    <Link to={"/login"}><button className="header-login">Login </button></Link>
                    <Link to={"/register"}><button className="header-register">Register </button></Link>
                </div>
            </div>
        );
    }
}