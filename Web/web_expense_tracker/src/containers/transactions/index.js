import React from 'react';
import Drawer from '../../components/drawer';
import Sidebar from '../../components/sidebar';
import FilterBar from '../../components/filtering';
import TransactionCard from '../../components/transactionCard';

const sumTrans = [
    {
        date:"19-08-2020",
        categories: "Food",
        desc: "KFC McDonal Chicken Mc Deluxe Yummy",
        total: 89,
    },

    {
        date:"19-08-2020",
        categories: "Food",
        desc: "KFC McDonal Chicken Mc Deluxe Yummy",
        total: 89,
    },

    {
        date:"19-08-2020",
        categories: "Food",
        desc: "KFC McDonal Chicken Mc Deluxe Yummy",
        total: 89,
    },

    {
        date:"19-08-2020",
        categories: "Food",
        desc: "KFC McDonal Chicken Mc Deluxe Yummy",
        total: 89,
    },

    {
        date:"19-08-2020",
        categories: "Food",
        desc: "KFC McDonal Chicken Mc Deluxe Yummy",
        total: 89,
    },

    {
        date:"19-08-2020",
        categories: "Food",
        desc: "KFC McDonal Chicken Mc Deluxe Yummy",
        total: 89,
    },

    {
        date:"19-08-2020",
        categories: "Food",
        desc: "KFC McDonal Chicken Mc Deluxe Yummy",
        total: 89,
    },

    {
        date:"19-08-2020",
        categories: "Food",
        desc: "KFC McDonal Chicken Mc Deluxe Yummy",
        total: 89,
    },

    {
        date:"19-08-2020",
        categories: "Food",
        desc: "KFC McDonal Chicken Mc Deluxe Yummy",
        total: 89,
    },

    {
        date:"19-08-2020",
        categories: "Food",
        desc: "KFC McDonal Chicken Mc Deluxe Yummy",
        total: 89,
    },

    {
        date:"19-08-2020",
        categories: "Food",
        desc: "KFC McDonal Chicken Mc Deluxe Yummy",
        total: 89,
    },
    
    

]
export default class Transactions extends React.Component{
    render(){
        return(
            <div>
                <Drawer />
                <Sidebar/>
                <p>This is Transaction Page</p>
                <FilterBar/>
                <p><b>Latest Transactions :</b></p>
                <div className="dash-latest-trans">
                    {sumTrans.map((item)=>(
                        <TransactionCard date={item.date} categ={item.categories} desc={item.desc} total={item.total.toFixed(2)}/>
                    ))}
                </div>
            </div>
        );
    }
}