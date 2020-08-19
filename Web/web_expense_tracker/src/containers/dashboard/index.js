import React from 'react';
import Drawer from '../../components/drawer';


export default class Dashboard extends React.Component{
    render(){
        return(
            <div>
                <Drawer />
                <h1>This is Dashboard</h1>
            </div>
        );
    }
}