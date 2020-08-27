import React from 'react';
import './piechart.css';
import Actions from '../../actions';
import { connect } from "react-redux";

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { VictoryPie} from 'victory';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Drawer from '../../components/drawer';
import SumCardBar from '../../components/sumCardBar';
import SumCard from '../../components/sumCard';
import { wait } from '@testing-library/react';

const month = [
    "Jan",
    "Feb",
    "Mac",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
]

class PieChart extends React.Component{
    constructor(props){
        super(props);

        this.state={

            showModalAlert:false,
            modalTitleAlert:"",
            modalMsgAlert:"",

            currentMonth:"1",
            currentYear:"",
            selectedYear:"",

            budgetData:0,
            expensesData:0,
            totalSavings:0,

            piecolorData:[],
            pieData:[],

        }
    }

    componentDidMount(){
        const d = new Date();
        const yr = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        // const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);

        this.setState({
            // currentMonth: mo,
            currentYear: yr,
            selectedYear: yr,
        });
    }

    componentDidUpdate(prevProps){
        
        // console.log("this is component did update");
        
        const { getPieData, getOverviewData } = this.props;
        
        if(prevProps.getOverviewData.isLoading && !getOverviewData.isLoading){
            
            if(getOverviewData.data.status === "success") {
                
                this.setState({

                    budgetData: parseInt(getOverviewData.data.budgetData).toFixed(2),
                    expensesData: parseInt(getOverviewData.data.expensesData).toFixed(2),
                    totalSavings: parseInt(getOverviewData.data.totalSavings).toFixed(2),
                });

                
            } else if (getOverviewData.error !== null){
                
                this.setState({
                    showModalAlert:true,
                    modalTitleAlert: "Failed",
                    modalMsgAlert:"Failed to fetch Categories Bar List. Please Try Again",
                });
            }
        }

        if(prevProps.getPieData.isLoading && !getPieData.isLoading){
            
            if(getPieData.data.status === "success") {
                
                // console.log(getPieData.data);
                this.setState({
                    piecolorData: getPieData.data.colorData,
                    pieData: getPieData.data.pieData,
                });

                this._onGetMonthlyOverview();

                
            } else if (getPieData.error !== null){
                
                this.setState({
                    showModalAlert:true,
                    modalTitleAlert: "Failed",
                    modalMsgAlert:"Failed to Pie Chart Data or Data Not Exist. Please Try Again",
                });
            }
        }
    }

    _onGetMonthlyOverview(){
        const { currentMonth, selectedYear} = this.state;

        const formData = {
            month: currentMonth,
            year : selectedYear,
        }

        this.props.onGetOverviewData(formData);
    }

    _onGetMonthlyPieChart(){
        // console.log("get month pie chart");
        
        const { currentMonth, selectedYear} = this.state;

        const formData = {
            month: currentMonth,
            year : selectedYear,
        }

        // console.log(formData);

        this.props.onGetMonthlyPieData(formData);

    }

    _onSubmitMonthSummary(){
        // this._onGetMonthlyOverview();
        this._onGetMonthlyPieChart();

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

                <h3>Monthly Overview</h3>

                <div className="pipg-form">
                    <Form.Row>
                        <Col>
                        <Form.Group controlId="selectMonth">
                            {/* <Form.Label>Select Month :</Form.Label> */}
                            <Form.Control size="sm" as="select" onChange={(currentMonth)=> this.setState({currentMonth: currentMonth.target.value})}>
                                {month.map((item, index)=>(
                                    <option key={index+1} value={index+1}>{item}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        </Col><Col>
                        <Form.Group controlId="selectYear">
                            {/* <Form.Label>Select Year :</Form.Label> */}
                            <Form.Control size="sm" as="select" onChange={(selectedYear)=> this.setState({selectedYear: selectedYear.target.value})}>
                                <option key={this.state.currentYear} value={this.state.currentYear}>{this.state.currentYear}</option>
                                <option key={this.state.currentYear-1} value={this.state.currentYear-1}>{this.state.currentYear-1}</option>
                                <option key={this.state.currentYear-2} value={this.state.currentYear-2}>{this.state.currentYear-2}</option>
                                <option key={this.state.currentYear-3} value={this.state.currentYear-3}>{this.state.currentYear-3}</option>
                                <option key={this.state.currentYear-4} value={this.state.currentYear-4}>{this.state.currentYear-4}</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                            <Button variant="primary" size="sm" onClick={()=>this._onSubmitMonthSummary()}>Submit</Button>
                        </Col>
                    </Form.Row>

                </div>
                <br/>
                <p>Chart :</p>
                <div className="pipg-holder">
                    <div>
                        <div className="piepg-pie">
                            <VictoryPie
                            style={{data: {stroke: "black", strokeWidth: 2},}}
                            // innerRadius={110}
                            colorScale={this.state.piecolorData}

                            data={this.state.pieData}

                            animate={{
                                duration: 2000
                            }}
                            />
                        </div>
                    </div>


                </div>

                <div className="pipg-sum2">

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
    getPieData: Actions.getPieData(store),
    getOverviewData: Actions.getOverviewData(store),

});

const mapDispatchToProps = {
    onGetMonthlyPieData: Actions.get_pie,
    onGetOverviewData: Actions.get_overview,
};

export default connect(mapStateToProps, mapDispatchToProps)(PieChart);