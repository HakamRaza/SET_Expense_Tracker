import React from 'react';
import Drawer from '../../components/drawer';
import Actions from '../../actions';
import { connect } from "react-redux";

// import Sidebar from '../../components/sidebar';
import FilterBar from '../../components/filtering';
import Table from 'react-bootstrap/Table';
import './transaction.css';
import { IconContext } from "react-icons";
import { IoIosTrash, IoMdCreate } from "react-icons/io";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class Transactions extends React.Component{
    constructor(props){
        super(props);

        this.state={
            getTransaction:[],

            showModal:false,
            modalTitle:"",
            modalMsg:"",
            totalAmount:0,

        }
    }

    componentDidUpdate(prevProps){
        const { getTransactionData } = this.props;
        
        if(prevProps.getTransactionData.isLoading && !getTransactionData.isLoading){
            
            if(getTransactionData.data.status === "success") {
                
                this.setState({getTransaction:getTransactionData.data.data});

                
                
            } else if (getTransactionData.error !== null){

                if(getTransactionData.error.data !== null){
                    
                    this.setState({
                        showModal:true,
                        modalTitle: "Failed",
                        modalMsg:"Failed to fetch Transaction List. Please Try Again",
                    });
                }
            }
        }

        // console.log(this.state.getTransaction);

        
        // for (let i = 0; i < this.state.getTransaction; i++) {
        //     var totalAmount = parseInt(this.state.getTransaction[i]["amount"]);
        //     this.setState({totalAmount});
        // }
        
        // console.log(this.state.totalAmount);
    }

    render(){
        return(
            <div className="latest-trans">
                {<div>
                    <Modal show={this.state.showModal} onHide={()=>this.setState({showModal:false})}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.state.modalMsg}</Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={()=>this.setState({showModal:false})}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>}
                <Drawer />
                <FilterBar/>
                <p><b>Results :</b></p>
                <br/>
                <div>
                    <Table responsive striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>Total Results <i>(max: 100 results)</i></th>
                            <th>Total Expenses</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="trans-col">{this.state.getTransaction.length} Results</td>
                                <td className="trans-col">$ 
                                {
                                    // for (let i = 0; i < this.state.getTransaction.length; i++) {
                                    //     const element = this.state.getTransaction.amount[i];
                                    // }
                                }
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <div style={{maxHeight:400, overflowY:"scroll"}}>
                    <Table responsive striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Amount (RM)</th>
                            <th className="trans-col-desc">Description</th>
                            <th>Del/ Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.getTransaction.map((item, index)=>(
                                <tr>
                                    <td>{index+1}</td>
                                    <td className="trans-col">{item.date}</td>
                                    <td className="trans-col">{item.category_title}</td>
                                    <td className="trans-col">{item.amount}</td>
                                    <td className="trans-col-desc">{item.description}</td>
                                    <td className="trans-col">
                                        <div>
                                        <IconContext.Provider value={{ className: 'trans-icons' }}>
                                            <IoIosTrash/>
                                            <IoMdCreate/>
                                        </IconContext.Provider>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    getTransactionData: Actions.getTransactionData(store)
});

const mapDispatchToProps = {
    // onGetTransaction: Actions.get_transaction
};

export default connect(mapStateToProps,mapDispatchToProps)(Transactions);