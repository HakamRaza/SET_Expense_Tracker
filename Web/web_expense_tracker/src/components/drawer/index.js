import React from 'react';
import { FaAlignJustify, FaUserSlash} from "react-icons/fa";
import { IconContext } from "react-icons";
import './drawer.css';

export default class Drawer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showDrawer: false,
        }
    }

    _onLogout(){
        console.log("logout user");
    }

    render(){
        return(
            <div className="drawer-cont">

                <div className="drawer-submenu">
                    <div onClick={()=>{this.setState({showDrawer:!this.state.showDrawer})}}>
                        <IconContext.Provider value={{ className: 'drawer-menu-icon'}}>
                            <FaAlignJustify/>
                        </IconContext.Provider>
                    </div>


                    {this.state.showDrawer && (
                        <div className="drawer-menu">
                            <ul>
                                <li>Settings</li>
                                <li>Categories</li>
                                <li>History</li>
                                <li>FAQ</li>
                                <li>HELP</li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="drawer-logout" onClick={()=>this._onLogout()}>
                    <IconContext.Provider value={{ className: 'drawer-icon-logout'}}>
                        <FaUserSlash/>
                    </IconContext.Provider>
                    <p>Logout</p>
                </div>
            </div>

        );
    }
}