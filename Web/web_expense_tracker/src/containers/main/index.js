import React from 'react';
import { FaInstagram, FaTwitterSquare, FaFacebookSquare } from "react-icons/fa";
import {Link} from 'react-router-dom';
import { IconContext } from "react-icons";
import './main.css';

class Main extends React.Component{
    render(){
        return(
            <div className="main">

                <div className="main-card">
                    <div className="main-text">
                        <h2>Expenses Tracking Made Easy</h2>
                        <p>get an in depth analysis of your financial transaction in one place.</p>
                        <Link to={"/learn-more"}><button className="main-button">Learn More</button></Link>
                    </div>

                    <div className="main-bgp"></div>

                    <div className="main-icons-holder">
                        <IconContext.Provider value={{ className: 'main-icons' }}>
                            <a href="https://www.instagram.com/" title="Instagram Official"><FaInstagram /></a>
                        </IconContext.Provider>

                        <IconContext.Provider value={{ className: 'main-icons' }}>
                            <a href="https://twitter.com/" title="Twitter Official"><FaTwitterSquare /></a>
                        </IconContext.Provider>

                        <IconContext.Provider value={{ className: 'main-icons' }}>
                            <a href="https://www.facebook.com/" title="Facebook Official"><FaFacebookSquare /></a>
                        </IconContext.Provider>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;