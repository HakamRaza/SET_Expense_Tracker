import React from 'react';
import Drawer from '../../components/drawer';
import './dashboard.css';
import SumCard from '../../components/sumCard';
import SumCardBar from '../../components/sumCardBar';
import {VictoryChart, VictoryLine} from 'victory';
import CategoriesCard from '../../components/categoriesCard';
import TransactionCard from '../../components/transactionCard';


const sumData =[
    {
        type:"Remaining Budget",
        left: 5000,
        total: 9000,
    },

    {
        type:"Current Expenses",
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
        color:"lightblue",
    },

    {
        name:"Drinks & Boba",
        month_budget: 300,
        month_expense: 150,
        color:"lightgreen",

    },

    {
        name:"House Bills",
        month_budget: 100,
        month_expense: 0,
        color:"lightblue",

    },

    {
        name:"Savings",
        month_budget: 900,
        month_expense: 302.04,
        color:"lightcoral",

    },

    {
        name:"Drinks & Boba",
        month_budget: 300,
        month_expense: 150,
        color:"lightgreen",

    },

    {
        name:"House Bills",
        month_budget: 100,
        month_expense: 0,
        color:"lightcoral",

    },

    {
        name:"Savings",
        month_budget: 900,
        month_expense: 302.04,
        color:"lightsalmon",

    },

    {
        name:"Drinks & Boba",
        month_budget: 300,
        month_expense: 150,
        color:"yellow",

    },

    {
        name:"House Bills",
        month_budget: 100,
        month_expense: 0,
        color:"limegreen",

    },

    {
        name:"Savings",
        month_budget: 900,
        month_expense: 302.04,
        color:"limegreen",

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
            <div>
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
                        <div className="dash-sum2">
                            <SumCardBar title={sumData[0].type} left={sumData[0].left} total={sumData[0].total} percent={(sumData[0].left/ sumData[0].total*100)}/>
                            <SumCard type='1' title={sumData[1].type} total={sumData[1].total}  />
                            <SumCard type='2'title={sumData[2].type} total={sumData[2].total}  />
                        </div>
                    </div>

                    <div className="dash-categ">
                    <p><b>Categories Summary :</b></p>
                        <div className="dash-categ2">
                            {sumCat.map((item) =>(
                                <CategoriesCard color={item.color} name={item.name} budget={item.month_budget} expense={item.month_expense} bal ={(item.month_budget-item.month_expense).toFixed(2)}/>
                            ))}
                        </div>
                    </div>

                    <div className="dash-latest">
                        <p><b>Latest Transactions :</b></p>
                            {/* <TransactionCard style={{backgroundColor:"transparent"}} date='Date' categ='Categories' desc='Description' total=''/> */}
                        <div className="dash-latest-trans">
                            {sumTrans.map((item)=>(
                                <TransactionCard date={item.date} categ={item.categories} desc={item.desc} total={item.total.toFixed(2)}/>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}