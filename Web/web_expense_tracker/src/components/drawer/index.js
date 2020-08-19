import React from 'react';
import { FaAlignJustify, FaUserSlash} from "react-icons/fa";
import { IconContext } from "react-icons";

export default class Drawer extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <IconContext.Provider value={{ className: 'drawer-icon'}}>
                        <FaAlignJustify/>
                    </IconContext.Provider>

                    <div className="drawer-menu">
                        <ul>
                            <li>Settings</li>
                            <li>Categories</li>
                            <li>History</li>
                            <li>FAQ</li>
                            <li>HELP</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <IconContext.Provider value={{ className: 'drawer-icon'}}>
                        <FaUserSlash/>
                    </IconContext.Provider>
                    <p>Logout</p>
                </div>
            </div>

        );
    }
}