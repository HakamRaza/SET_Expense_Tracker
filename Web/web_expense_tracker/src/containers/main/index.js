import React from 'react';
import { FaInstagram, FaTwitterSquare, FaFacebookSquare } from "react-icons/fa";
import {Link} from 'react-router-dom';
import { IconContext } from "react-icons";
import './main.css';
import Header from 'components/header';
import About from '../dummy/About';
// import { Button } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class Main extends React.Component{
    render(){
        return(
            <div>
                <Header/>
                <div id="home" className="main">
                    <div className="main-card">
                        <div className="main-text">
                            <h2>Expenses Tracking Made Easy</h2>
                            <p>get an in depth analysis of your financial transaction in one place.</p>
                            {/* <Link to={"/home/#about"}><button className="main-button">Learn More</button></Link> */}
                            {/* <a href="/home/#about" className="main-button">Learn More</a> */}
                            <Button href="/home/#about" variant="outline-primary" size="sm">Learn More</Button>
                            {/* <Button variant="outline-primary">Primary</Button>{' '} */}
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
                <About/>
            </div>
        )
    }
}

export default Main;