import React from 'react';
import './piechart.css';
import Actions from '../../actions';
import { connect } from "react-redux";

import Form from 'react-bootstrap/Form';
import { VictoryPie} from 'victory';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Drawer from '../../components/drawer';
import SumCardBar from '../../components/sumCardBar';
import SumCard from '../../components/sumCard';


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

class PieChart extends React.Component{
    constructor(props){
        super(props);

        this.state={

            showModalAlert:false,
            modalTitleAlert:"",
            modalMsgAlert:"",

            currentMonth:"",
            currentYear:"",

            budgetData:0,
            expensesData:0,
            totalSavings:0,

        }
    }

    componentDidUpdate(prevProps){
        
        console.log("this is component did update");
        
        const { getBarsData, getOverviewData, getTransactionData } = this.props;
        
        if(prevProps.getOverviewData.isLoading && !getOverviewData.isLoading){
            
            if(getOverviewData.data.status === "success") {
                
                this.setState({

                    budgetData: parseInt(getOverviewData.data.budgetData).toFixed(2),
                    expensesData: parseInt(getOverviewData.data.expensesData).toFixed(2),
                    totalSavings: parseInt(getOverviewData.data.totalSavings).toFixed(2),
                    // graphBudget: getOverviewData.data.graphBudget,
                    // graphDailyExpense: getOverviewData.data.graphDailyExpense,
                    // graphTotalExpense: getOverviewData.data.graphTotalExpense,
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

    _onGetMonthlyOverview(){
        const { currentMonth, currentYear} = this.state;

        const formData = {
            // month: currentMonth,
            // year : currentYear,
            month: 8,
            year : 2020,
        }

        this.props.onGetOverviewData(formData);
    }

    render(){
        return(
            <div className="pipg-cont">
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

                <h3 onClick={()=>this._onGetMonthlyOverview()}>Monthly Overview</h3>

                <div>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Month :</Form.Label>
                        <Form.Control as="select">
                            <option>Jan 2020</option>
                            <option>Feb 2020</option>
                            <option>Mac 2020</option>
                            <option>Apr 2020</option>
                        </Form.Control>
                    </Form.Group>
                </div>

                <div className="pipg-holder">
                    <div>
                        <div className="piepg-pie">
                            <VictoryPie
                            style={{data: {stroke: "black", strokeWidth: 2},}}
                            // innerRadius={110}
                            colorScale={["white","#005086", "green"]}

                            data={[
                                { x: "Test", y: 50},
                                { x: "Test 2", y: 50 },
                                { x: "Test 3", y: 30 },
                            ]}

                            animate={{
                                duration: 2000
                            }}
                            />
                        </div>
                    </div>


                </div>

                <div className="pipg-sum2">
                    {/* <SumCardBar title={sumData[0].type} left={sumData[0].left} total={sumData[0].total} percent={(sumData[0].left/ sumData[0].total*100)}/>
                    <SumCard type='1' title={sumData[1].type} total={sumData[1].total}  />
                    <SumCard type='2'title={sumData[2].type} total={sumData[2].total}  /> */}

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
        );
    }
}

const mapStateToProps = store => ({
    // deleteTransactionData: Actions.deleteTransactionData(store),
    // getBarsData: Actions.getBarsData(store),
    getOverviewData: Actions.getOverviewData(store),
    // getTransactionData: Actions.getTransactionData(store),

});

const mapDispatchToProps = {
    // onDeleteTransaction: Actions.delete_transaction,
    // onGetBarsData: Actions.get_bars,
    onGetOverviewData: Actions.get_overview,
    // onGetTransaction: Actions.get_transaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PieChart);