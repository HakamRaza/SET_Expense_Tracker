import React from 'react';
import Drawer from '../../components/drawer';
import Sidebar from '../../components/sidebar';
import FilterBar from '../../components/filtering';


export default class Transactions extends React.Component{
    render(){
        return(
            <div>
                <Drawer />
                <Sidebar/>
                <p>This is Transaction Page</p>
                <FilterBar/>
                
            </div>
        );
    }
}