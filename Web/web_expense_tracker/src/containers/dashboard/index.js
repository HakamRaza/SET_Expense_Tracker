import React from 'react';
import Drawer from '../../components/drawer';
import './dashboard.css';
import SumCard from '../../components/sumCard';
import SumCardBar from '../../components/sumCardBar';

const sumData =[
    {
        type:"Monthly Budget",
        left: 5000,
        total: 9000,
    },

    {
        type:"Monthly Expenses",
        total: 5000,
    },

    {
        type: "Accrued Savings",
        total: 3987.05,
    },
]

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
                        <p><b>Monthly Overview :</b></p>

                        <SumCardBar title={sumData[0].type} left={sumData[0].left} total={sumData[0].total} percent={(sumData[0].left/ sumData[0].total*100)}/>
                        <SumCard title={sumData[1].type} total={sumData[1].total}  />
                        <SumCard title={sumData[2].type} total={sumData[2].total}  />

                    </div>

                    <div className="dash-categ">
                        {/* <p>Categories summary here</p> */}

                        <table style={{maxWidth:"95%"}}>
                            <tr>
                                <th colSpan="4">Monthly Categories Overview</th>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <th>Budget (RM)</th>
                                <th>Expenses (RM)</th>
                                <th>Balance (RM)</th>
                            </tr>
                            {sumCat.map((item)=>(
                                <tr>
                                    <td className="td-name">{item.name}</td>
                                    <td>{item.month_budget.toFixed(2)}</td>
                                    <td>{item.month_expense.toFixed(2)}</td>
                                    <th>{(item.month_budget-item.month_expense).toFixed(2)}</th>
                                </tr>
                            ))}
                        </table>

                    </div>

                    <div className="dash-latest-trans">
                        {/* <p>Latest transaction here</p> */}

                        <table>
                            <tr>
                                <th colSpan="3">Latest Transaction</th>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <th>Categories</th>
                                {/* <th>Description</th> */}
                                <th>Expenses (RM)</th>
                            </tr>
                            {sumTrans.map((item)=>(
                                <tr>
                                    <td>{item.date}</td>
                                    <td>{item.categories}</td>
                                    {/* <td className="td-name">{(item.desc).slice(0, 5)}...</td> */}
                                    <th>{item.total.toFixed(2)}</th>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>

            </dvi>
        );
    }
}