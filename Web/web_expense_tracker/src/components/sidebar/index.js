import React from 'react';
import './sidebar.css';
import {Link} from 'react-router-dom';


export default class Sidebar extends React.Component {
    render(){
        return(
            <div className="dsb">
                <p className="dsb-col">Home</p>
                <p className="dsb-col">Dashboard</p>
                <p className="dsb-col">Setting</p>
                <Link to={"/category"}><p className="dsb-col">Categories</p></Link>
                <p className="dsb-col">FAQ</p>
                <p className="dsb-col">Help</p>
            </div>
        );
    }
}