import React from 'react';
import Drawer from '../../components/drawer';
import './dashboard.css';


export default class Dashboard extends React.Component{
    render(){
        return(
            <dvi>
                <Drawer />
                <div className="dash-container">
                    
                    <div className="dash-lngr">
                        <p>Graph here</p>
                    </div>
                    <div className="dash-sum">
                        <p>Summary here</p>
                    </div>
                    <div className="dash-categ">
                        <p>Categories summary here</p>

                    </div>
                    <div className="dash-latest-trans">
                        <p>Latest transaction here</p>

                    </div>
                </div>

            </dvi>
        );
    }
}