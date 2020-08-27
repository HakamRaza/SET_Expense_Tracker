import React from 'react';
import Drawer from '../../components/drawer';
import './dashboard.css';
import Actions from '../../actions';
import { connect } from "react-redux";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {VictoryChart, VictoryLine} from 'victory';

import SumCard from '../../components/sumCard';
import SumCardBar from '../../components/sumCardBar';
import CategoriesCard from '../../components/categoriesCard';
import TransactionCard from '../../components/transactionCard';
import AddTransaction from '../../components/addNewTransaction';


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


class Dashboard extends React.Component{
    constructor(props){
        super(props);

        this.state={
            showAddNew: false,
            showSumMore: true,
            showCatMore: true,
            showLatestMore: false,

            currentMonth:"",
            currentYear:"",
            barsData:[],
            
            showModalAlert:false,
            modalTitleAlert:"",
            modalMsgAlert:"",
            
            budgetData:0,
            expensesData:0,
            totalSavings:0,
            graphBudget:[],
            graphDailyExpense:[],
            graphTotalExpense:[],

        }
    }

    
    componentDidMount(){
        const d = new Date();
        const yr = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        // const dt = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        this.setState({
            currentMonth: mo,
            currentYear: yr,
        }, () => {
            
            //callback function
            this._onGetCategoriesBar();
            this._onGetMonthlyOverview();
        });

    }
    
    componentDidUpdate(prevProps){
        
        console.log("this is component did update");
        
        const { getBarsData, getOverviewData } = this.props;
        
        if(prevProps.getBarsData.isLoading && !getBarsData.isLoading){
            
            if(getBarsData.data.status === "success") {
                
                this.setState({barsData: getBarsData.data.barsData});
                
                
            } else if (getBarsData.error !== null){
                
                this.setState({
                    showModalAlert:true,
                    modalTitleAlert: "Failed",
                    modalMsgAlert:"Failed to fetch Categories Bar List. Please Try Again",
                });
            }
        }

        if(prevProps.getOverviewData.isLoading && !getOverviewData.isLoading){
            
            if(getOverviewData.data.status === "success") {
                
                this.setState({

                    budgetData: getOverviewData.data.budgetData,
                    expensesData: getOverviewData.data.expensesData,
                    totalSavings: getOverviewData.data.totalSavings,
                    graphBudget: getOverviewData.data.graphBudget,
                    graphDailyExpense: getOverviewData.data.graphDailyExpense,
                    graphTotalExpense: getOverviewData.data.graphTotalExpense,
                });

                
            } else if (getOverviewData.error !== null){
                
                this.setState({
                    showModalAlert:true,
                    modalTitleAlert: "Failed",
                    modalMsgAlert:"Failed to fetch Categories Bar List. Please Try Again",
                });
            }
        }
    }
    
    
    _onGetCategoriesBar(){
        // console.log("get list of bars for use");
        const { currentMonth, currentYear} = this.state;

        const formData = {
            month: currentMonth,
            year : currentYear,
        }

        this.props.onGetBarsData(formData);
    }

    _onGetMonthlyOverview(){
        const { currentMonth, currentYear} = this.state;

        const formData = {
            month: currentMonth,
            year : currentYear,
        }

        // this.props.onGetBarsData(formData);
        this.props.onGetOverviewData(formData);
    }

    _onGetLineChart(){
        console.log("get user monthly line chart");
        
        console.log(this.state.graphBudget);
        console.log(this.state.graphDailyExpense);
        console.log(this.state.graphTotalExpense);
    }

    _onGetLatestTransaction(){
        console.log("get user all month transactions");
    }
    
    render(){
        return(
            <div>
                {this.state.showModalAlert && (
                    <div>
                    <Modal centered show={true} onHide={()=>this.setState({showModalAlert:false})}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.modalTitleAlert}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.state.modalMsgAlert}</Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={()=>this.setState({showModalAlert:false})}>OK</Button>
                        </Modal.Footer>
                    </Modal>
                </div>)}

                <Drawer />
                <div className="dash-container">

                    <div className="dash-lngr">
                        <p onClick={()=>this._onGetLineChart()}>Graph:</p>
                        

                        <VictoryChart>
                            <VictoryLine
                            interpolation="natural"
                            text={"Daily Expenses (RM)"}
                            style={{
                                data: { stroke: "green" },
                                tickLabels: {angle: -90},
                                // axisLabel: {fontSize: 3},
                            }}
                            
                            data={this.state.graphDailyExpense}/>

                            <VictoryLine
                            interpolation="natural"

                            style={{
                                data: { stroke: "blue" }
                            }}

                            data={this.state.graphTotalExpense}/>

                            <VictoryLine
                            interpolation="natural"

                            style={{
                                data: { stroke: "red" }
                            }}

                            data={this.state.graphBudget}/>
                        </VictoryChart>
                    </div>


                    <div className="dash-sum" style={{height: this.state.showSumMore ? "100%" : "4em"}}>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <p><b>Monthly Overview :</b></p>
                            <h5 onClick={()=>this.setState({showSumMore: !this.state.showSumMore})}>&#9776;</h5>
                        </div>

                        <div className="dash-sum2">
                            <SumCardBar 
                            title="Remaining Budget" 
                            left={this.state.budgetData - this.state.expensesData}
                            total={this.state.budgetData}
                            percent={this.state.expensesData/ this.state.budgetData *100}
                            />

                            <SumCard 
                            type='1' 
                            title="Current Expenses" 
                            total= {parseInt(this.state.expensesData)}
                            />

                            <SumCard 
                            type='2'
                            title="Accrued Savings"
                            total={parseInt(this.state.totalSavings)}
                            />

                        </div>
                    </div>

                    <div className="dash-categ" style={{height: this.state.showCatMore ? "100%" : "4em", overflow: !this.state.showCatMore && "hidden"}}>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <p><b>Categories Summary :</b></p>
                            <h5 onClick={()=>this.setState({showCatMore: !this.state.showCatMore})}>&#9776;</h5>
                        </div>
                        <div className="dash-categ2">
                            {this.state.barsData.map((item) =>(
                                <CategoriesCard color={item.color} name={item.title} budget={item.budget} expense={item.totalExpense} bal ={(item.budget-item.totalExpense).toFixed(2)}/>
                            ))}
                        </div>
                    </div>

                    <div className="dash-latest"  style={{height: this.state.showLatestMore ? "100%" : "4em", overflow: !this.state.showLatestMore && "hidden"}}>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <p><b>Latest Transactions :</b></p>
                            <h5 onClick={()=>this.setState({showLatestMore: !this.state.showLatestMore})}>&#9776;</h5>
                        </div>
                        
                            {/* <TransactionCard style={{backgroundColor:"transparent"}} date='Date' categ='Categories' desc='Description' total=''/> */}
                        <div className="dash-latest-trans">
                            {sumTrans.map((item)=>(
                                <TransactionCard date={item.date} categ={item.categories} desc={item.desc} total={item.total.toFixed(2)}/>
                            ))}
                        </div>
                    </div>

                    <div className="dash-add"  style={{height: this.state.showAddNew ? "100%" : "4em", overflow: !this.state.showAddNew && "hidden"}}>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <p><b>Add New Transaction :</b></p>
                            <h5 onClick={()=>this.setState({showAddNew: !this.state.showAddNew})}>&#9776;</h5>
                        </div>
                        
                        <div className="dash-add-trans">
                            <AddTransaction/>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

const mapStateToProps = store => ({
    // deleteTransactionData: Actions.deleteTransactionData(store),
    getBarsData: Actions.getBarsData(store),
    getOverviewData: Actions.getOverviewData(store),

});

const mapDispatchToProps = {
    // onDeleteTransaction: Actions.delete_transaction,
    onGetBarsData: Actions.get_bars,
    onGetOverviewData: Actions.get_overview,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);