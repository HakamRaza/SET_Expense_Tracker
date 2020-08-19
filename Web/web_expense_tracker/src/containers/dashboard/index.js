import React from 'react';
import Drawer from '../../components/drawer';
import './dashboard.css';
import SumCard from '../../components/sumCard';


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
                        <p>Overview</p>

                        <SumCard type="bar" title="Monthly Budget" left="4000.00" total="9000" percent="60.0"/>
                        <SumCard type="" title="Monthly Expenses" val="5000.00" />
                        <SumCard type="" title="Accrued Savings" val="3987.05" />

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