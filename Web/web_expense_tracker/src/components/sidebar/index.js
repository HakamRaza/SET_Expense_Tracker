import React from 'react';
import './sidebar.css'

export default class Sidebar extends React.Component {
    render(){
        return(
            <div className="dsb">
                <p className="dsb-col">Home</p>
                <p className="dsb-col">Dashboard</p>
                <p className="dsb-col">Setting</p>
                <p className="dsb-col">Categories</p>
                <p className="dsb-col">FAQ</p>
                <p className="dsb-col">Help</p>
            </div>
        );
    }
}