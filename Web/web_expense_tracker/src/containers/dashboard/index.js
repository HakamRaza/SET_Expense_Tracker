import React from 'react';
import Drawer from '../../components/drawer';
import './dashboard.css';
import SumCard from '../../components/sumCard';
import SumCardBar from '../../components/sumCardBar';
import {VictoryChart, VictoryLine, VictoryLabel} from 'victory';
import CategoriesCard from '../../components/categoriesCard';

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

const graphDataDaily = [
     
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 1 },
    { x: 4, y: 2 },
    { x: 5, y: 1 },
    { x: 6, y: 2 },
    { x: 7, y: 1 },
    { x: 8, y: 3 },
    { x: 9, y: 1 },
    { x: 10, y: 5 },
    { x: 11, y: 1 },
    { x: 12, y: 8 },
]

const graphDataAcc = [
     
    { x: 1, y: 1 },
    { x: 2, y: 3 },
    { x: 3, y: 4 },
    { x: 4, y: 6 },
    { x: 5, y: 7 },
    { x: 6, y: 9 },
    { x: 7, y: 10 },
    { x: 8, y: 13 },
    { x: 9, y: 15 },
    { x: 10, y: 19 },
    { x: 11, y: 24 },
    { x: 12, y: 30 },
]

const budgetlineData = [
     
    { x: 1, y: 10 },
    { x: 2, y: 10 },
    { x: 3, y: 10 },
    { x: 4, y: 10 },
    { x: 5, y: 10 },
    { x: 6, y: 10 },
    { x: 7, y: 10 },
    { x: 8, y: 10 },
    { x: 9, y: 10 },
    { x: 10, y: 10 },
    { x: 11, y: 10 },
    { x: 12, y: 10 },
]

export default class Dashboard extends React.Component{
    
    render(){
        return(
            <dvi>
                <Drawer />
                <div className="dash-container">

                    <div className="dash-lngr">
                        <p>Graph:</p>

                        <VictoryChart>
                            <VictoryLine
                            interpolation="natural"
                            text={"Daily Expenses (RM)"}
                            style={{
                                data: { stroke: "green" }
                            }}
                            
                            data={graphDataDaily}/>

                            <VictoryLine
                            interpolation="natural"

                            style={{
                                data: { stroke: "blue" }
                            }}

                            data={graphDataAcc}/>

                            <VictoryLine
                            interpolation="natural"

                            style={{
                                data: { stroke: "red" }
                            }}

                            data={budgetlineData}/>
                        </VictoryChart>

                    </div>

                    <div className="dash-sum">
                        <p><b>Monthly Overview :</b></p>

                        <SumCardBar title={sumData[0].type} left={sumData[0].left} total={sumData[0].total} percent={(sumData[0].left/ sumData[0].total*100)}/>
                        <SumCard title={sumData[1].type} total={sumData[1].total}  />
                        <SumCard title={sumData[2].type} total={sumData[2].total}  />

                    </div>

                    <div className="dash-categ">
                    <p><b>Categories Summary :</b></p>
                        {sumCat.map((item) =>(
                            <CategoriesCard name={item.name} budget={item.month_budget} expense={item.month_expense} bal ={(item.month_budget-item.month_expense).toFixed(2)}/>
                        ))}
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