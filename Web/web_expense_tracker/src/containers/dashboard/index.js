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
import { Alert } from 'react-bootstrap';


class Dashboard extends React.Component{
    constructor(props){
        super(props);

        this.state={
            showAddNew: false,
            showSumMore: true,
            showCatMore: true,
            showLatestMore: false,

            currentDay:"",
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
            todayTransaction:[],

        }
    }

    
    componentDidMount(){
        
        const {getUserSession} = this.props;
        
        if( Object.keys(getUserSession.data).length == 0){
            this.props.history.push("/login");
        }

        const d = new Date();
        const yr = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        const dt = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        const today = `${yr}-${mo}-${dt}`;
        
        this.setState({
            currentMonth: mo,
            currentYear: yr,
            currentDay: today,
        }, () => {
            
            //callback function
            this._onGetMonthlyOverview();
        });
        
        
    }
    
    componentDidUpdate(prevProps){
        
        // console.log("this is component did update");
        
        const { getBarsData, getOverviewData, getTransactionData } = this.props;
        
        if(prevProps.getBarsData.isLoading && !getBarsData.isLoading){
            
            if(getBarsData.data.status === "success") {
                
                this.setState({barsData: getBarsData.data.barsData});
                //3
                this._onGetLatestTransaction();
                
                
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

                    budgetData: parseInt(getOverviewData.data.budgetData).toFixed(2),
                    expensesData: parseInt(getOverviewData.data.expensesData).toFixed(2),
                    totalSavings: parseInt(getOverviewData.data.totalSavings).toFixed(2),
                    graphBudget: getOverviewData.data.graphBudget,
                    graphDailyExpense: getOverviewData.data.graphDailyExpense,
                    graphTotalExpense: getOverviewData.data.graphTotalExpense,
                });
                //2
                this._onGetCategoriesBar();
                
            } else if (getOverviewData.error !== null){
                
                this.setState({
                    showModalAlert:true,
                    modalTitleAlert: "Failed",
                    modalMsgAlert:"Failed to fetch Categories Bar List. Please Try Again",
                });
            }
        }

        //1
        if(prevProps.getTransactionData.isLoading && !getTransactionData.isLoading){
            
            if(getTransactionData.data.status === "success") {
                
                this.setState({todayTransaction: getTransactionData.data.data});

            } else if (getTransactionData.error !== null){

                if(getTransactionData.error.data !== null){
                    
                    this.setState({
                        showModalAlert:true,
                        modalTitleAlert: "Failed",
                        modalMsgAlert:"Failed to fetch Transaction List. Please Try Again",
                    });
                }
            }
        }

        // console.log(this.state.todayTransaction);
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

        this.props.onGetOverviewData(formData);
    }

    _onGetLatestTransaction(){
        // console.log("get user all month transactions");
        const { currentDay} = this.state;

        const formData = {
            startDate: currentDay,
            endDate:"",
            minPrice:"",
            maxPrice:"",
            description:"",
            categoryName:"",
        }
        
        this.props.onGetTransaction(formData);
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
                        <p><b>Graph :</b></p>
                        

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
                            percent={((this.state.budgetData - this.state.expensesData)/ this.state.budgetData *100).toFixed(1)}
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
                                <CategoriesCard key={item.title} color={item.color} name={item.title} budget={item.budget} expense={item.totalExpense} bal ={(item.budget-item.totalExpense).toFixed(2)}/>
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

                    <div className="dash-latest"  style={{height: this.state.showLatestMore ? "100%" : "4em", overflow: !this.state.showLatestMore && "hidden"}}>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <p onClick={()=>this._onGetLatestTransaction()}><b>Today Transactions :</b></p>
                            <h5 onClick={()=>this.setState({showLatestMore: !this.state.showLatestMore})}>&#9776;</h5>
                        </div>
                        
                            {/* <TransactionCard style={{backgroundColor:"transparent"}} date='Date' categ='Categories' desc='Description' total=''/> */}
                        <div className="dash-latest-trans">
                            {this.state.todayTransaction.map((item)=>(
                                <TransactionCard date={item.date} categ={item.category_title} desc={item.description} total={parseInt(item.amount).toFixed(2)}/>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = store => ({
    // deleteTransactionData: Actions.deleteTransactionData(store),
    getUserSession: Actions.getUserSession(store),
    getBarsData: Actions.getBarsData(store),
    getOverviewData: Actions.getOverviewData(store),
    getTransactionData: Actions.getTransactionData(store),

});

const mapDispatchToProps = {
    // onDeleteTransaction: Actions.delete_transaction,
    onGetBarsData: Actions.get_bars,
    onGetOverviewData: Actions.get_overview,
    onGetTransaction: Actions.get_transaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);