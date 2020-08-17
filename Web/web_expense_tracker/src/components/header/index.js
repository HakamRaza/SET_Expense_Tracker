import React from "react";
import './header.css';

export default class Header extends React.Component {
    render(){
        return(
            <div>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Product</li>
                    <li>Contacts</li>
                </ul>
            </div>
        );
    }
}