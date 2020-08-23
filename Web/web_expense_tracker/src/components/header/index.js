import React from "react";
import './header.css';
import { IconContext } from "react-icons";
import {Link} from 'react-router-dom';
import { IoIosHome, IoIosPhotos, IoIosSend, IoIosPerson, IoIosPersonAdd } from "react-icons/io";

export default class Header extends React.Component {
    render(){
        return(
            <div className="header">
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <div className="header-logo">
                        <h2 style={{marginLeft:25, paddingTop:18}}>Okane</h2>
                    </div>
                    <div className="header-mobile" tabIndex="1">
                        <ul className="header-list">
                            <IconContext.Provider value={{ className: 'header-icons' }}>
                            <a href="/home/#home"><li><div className="header-icons-holder" ><IoIosHome/><p><u>Home</u></p></div></li></a>
                            <a href="/home/#about"><li><div className="header-icons-holder" ><IoIosPhotos/><p><u>About</u></p></div></li></a>
                            <a href="/home/#contact"><li><div className="header-icons-holder" ><IoIosSend/><p><u>Contact</u></p></div></li></a>
                            <Link to={"/login"}><li><div className="header-icons-holder" ><IoIosPerson/><p><u>Login</u></p></div></li></Link>
                            <Link to={"/register"}><li><div className="header-icons-holder" ><IoIosPersonAdd/><p><u>Register</u></p></div></li></Link>

                            </IconContext.Provider>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}