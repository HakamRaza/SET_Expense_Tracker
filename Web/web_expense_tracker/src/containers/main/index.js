import React from 'react';
import './main.css';
import {Link} from 'react-router-dom';



class Main extends React.Component{
    render(){
        return(
            <div className="main">
                <div className="main-card">
                    <div className="main-text">
                        <h2>Expenses Tracking Made Easy</h2>
                        <p>get an in depth analysis of your financial transaction in one place.</p>
                        <Link to={"/register"}><button className="main-button">Learn More</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;