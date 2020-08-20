import React from 'react';
import Drawer from '../../components/drawer';
import Sidebar from '../../components/sidebar';

const sumCat = [
    {
        name:"Food",
        month_budget: 800,
        month_expense: 400,
    },

    {
        name:"Drinks & Boba Tea Whatever",
        month_budget: 300,
        month_expense: 150,
    },

    {
        name:"House Bills",
        month_budget: 100,
        month_expense: 0,
    },

    {
        name:"Savings",
        month_budget: 900,
        month_expense: 302.04,
    },

    {
        name:"Drinks & Boba Tea Whatever",
        month_budget: 300,
        month_expense: 150,
    },

    {
        name:"House Bills",
        month_budget: 100,
        month_expense: 0,
    },

    {
        name:"Savings",
        month_budget: 900,
        month_expense: 302.04,
    },
]

export default class Category extends React.Component{
    render(){
        return(
            <div>
                <Drawer/>
                <p>This is Category Page</p>
                <Sidebar/>
            </div>
        );
    }
}