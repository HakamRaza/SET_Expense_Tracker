import React from 'react';
import './transaction.css';
import Drawer from '../../components/drawer';
import Actions from '../../actions';
import { connect } from "react-redux";

import FilterBar from '../../components/filtering';
import Table from 'react-bootstrap/Table';
import { IoIosTrash, IoMdCreate } from "react-icons/io";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class Transactions extends React.Component{
    constructor(props){
        super(props);

        this.state={
            itemID:"",
            update_category:"",
            update_desc:"",
            update_date:"",
            update_value:0,

            temp_category:"",
            temp_desc:"",
            temp_date:"",
            temp_value:0,


            getTransaction:[],
            getTransactionAmount:[],
            getCategories:[],
            showModalAlert:false,
            modalTitleAlert:"",
            modalMsgAlert:"",
            showModalUpdate:false,
            showModalDelete:false,
        }
    }

    componentDidMount(){
        
        const {getUserSession} = this.props;
        
        if( Object.keys(getUserSession.data).length == 0){
            this.props.history.push("/login");
        }
    }

    componentDidUpdate(prevProps){
        
        const { getTransactionData, updateTransactionData, getCategoriesData, deleteTransactionData } = this.props;
        
        if(prevProps.getTransactionData.isLoading && !getTransactionData.isLoading){
            
            if(getTransactionData.data.status === "success") {
                
                this.setState({getTransaction:getTransactionData.data.data});
                this.setState({getTransactionAmount:getTransactionData.data});


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


        if(prevProps.updateTransactionData.isLoading && !updateTransactionData.isLoading){
            
            if(updateTransactionData.data.status === "success") {
                
                this.setState({
                    showModalAlert:true,
                    modalTitleAlert: "Success",
                    modalMsgAlert:"Transaction Update Sucess!",
                });

            } else if (updateTransactionData.error !== null){

                this.setState({
                    showModalAlert:true,
                    modalTitleAlert: "Failed",
                    modalMsgAlert:"Failed to update Transaction. Please Try Again",
                });
            }
        }

        if(prevProps.getCategoriesData.isLoading && !getCategoriesData.isLoading){
            
            if(getCategoriesData.data.status === "success") {
                
                this.setState({getCategories:getCategoriesData.data.categoryList});
                
            } else if (getCategoriesData.error !== null){

                if(getCategoriesData.error.status !== null){
                    
                    this.setState({
                        showModal:true,
                        modalTitle: "Failed",
                        modalMsg:"Failed to get Categories List",
                    });
                }
            }
        }

       if(prevProps.deleteTransactionData.isLoading && !deleteTransactionData.isLoading) {

            if(deleteTransactionData.data.status === "success") {
                    
                this.setState({
                    showModalAlert:true,
                    modalTitleAlert: "Success",
                    modalMsgAlert:"Transaction Delete Sucess!",
                });

                
            } else if (deleteTransactionData.error !== null){

                this.setState({
                    showModalAlert:true,
                    modalTitleAlert: "Failed",
                    modalMsgAlert:"Failed to delete Transaction. Please Try Again",
                });
            }
        }

    }
    
    _confirmation(selectID, item){
        
        const itemID = item.id;
        this.setState({itemID:itemID});
        
        switch (selectID) {
            case "update":
                this.setState({
                    showModalUpdate:true,
                    temp_category:item.category_title,
                    temp_desc: item.description,
                    temp_date: item.date,
                    temp_value: item.amount,
                });
            
            break;
            
            case "delete":
                this.setState({showModalDelete:true,});

            break;
            
            default:
                break;
        }
    }

    _updateTransaction(){
        
        const { update_category, update_desc, update_date, update_value, itemID} = this.state;
        
        const formData={
            itemID,
            update_category,
            update_desc,
            update_date,
            update_value
        }
        
        this.props.onUpdateTransaction(formData);
        this.setState({showModalUpdate:false});
    }
    
    _deleteTransaction(){
        
        this.props.onDeleteTransaction(this.state.itemID)
        this.setState({showModalDelete:false});
    }

    render(){
        return(
            <div className="latest-trans">
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

                {this.state.showModalDelete && (
                    <div>
                    <Modal centered show={true} onHide={()=>this.setState({showModalDelete:false})}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Transaction</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Delete Transaction? <i>(This will affect your total expenses and saving calculation)</i></Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={()=>this.setState({showModalDelete:false})}>Close</Button>
                            <Button variant="danger" onClick={()=>this._deleteTransaction()}>Delete</Button>
                        </Modal.Footer>
                    </Modal>
                </div>)}

                {this.state.showModalUpdate && (
                    <div>
                    <Modal centered show={true} onHide={()=>this.setState({showModalUpdate:false})}>
                        <Modal.Header closeButton>
                        <Modal.Title>Update </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="updateCat">
                            <Form.Label>Category :</Form.Label>
                            <Form.Control required value={this.state.temp_category} size="sm" as="select" onChange={(update_category)=> this.setState({update_category: update_category.target.value})}>
                                <option value="">Default: {this.state.temp_category}</option>
                                {this.state.getCategories.map( item=>(
                                    <option key={item.id} value={item.id}>{item.category_title}</option>
                                ))}
                            </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="updateDesc">
                                <Form.Label>Description :</Form.Label>
                                <Form.Control 
                                required value={this.state.temp_desc} 
                                size="sm" type="text" pattern=".{1,25}" 
                                placeholder="Max 25 Chars" 
                                onChange={(update_desc)=> this.setState({
                                    update_desc: update_desc.target.value,
                                    temp_desc: update_desc.target.value,
                                })}/>
                            </Form.Group>

                            <Form.Group controlId="updateDate">
                                <Form.Label>Date :</Form.Label>
                                <Form.Control 
                                required value={this.state.temp_date}
                                size="sm" type="date" 
                                min="2020-01-01" max="2050-01-01" 
                                onChange={(update_date)=> this.setState({
                                    update_date: update_date.target.value,
                                    temp_date: update_date.target.value,
                                })}/>
                            </Form.Group>

                            <Form.Group controlId="updateVal">
                                <Form.Label>Value (RM) :</Form.Label>
                                <Form.Control 
                                required value={this.state.temp_value}
                                size="sm" type="number" min="0" step="0.01" 
                                placeholder="Transaction Value" 
                                onChange={(update_value)=> this.setState({
                                    update_value: update_value.target.value,
                                    temp_value: update_value.target.value,
                                })}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>

                            <Button variant="secondary" onClick={()=>this.setState({showModalUpdate:false})}>Close</Button>
                            <Button variant="success" onClick={()=>this._updateTransaction()}>Save</Button>
                        
                        </Modal.Footer>
                    </Modal>
                </div>)}
                
                <Drawer />
                <FilterBar/>
                <p><b>Results :</b></p>
                <br/>
                <div>
                    <Table responsive striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>Total Results <i>(max: 100 results)</i></th>
                            <th>Total Amount (RM)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="trans-col">{this.state.getTransaction.length} Results</td>
                                <td className="trans-col">{this.state.getTransactionAmount.totalAmount}</td>
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
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td className="trans-col">{item.date}</td>
                                    <td className="trans-col">{item.category_title}</td>
                                    <td className="trans-col">{item.amount}</td>
                                    <td className="trans-col-desc">{item.description}</td>
                                    <td className="trans-col">
                                        <div>
                                            <Button variant="warning" size="sm" onClick={()=>this._confirmation("update", item)}><IoMdCreate/> Edit</Button>{' '}
                                            <Button variant="danger" size="sm" onClick={()=>this._confirmation("delete", item)}><IoIosTrash /> Del</Button>{' '}
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
    getUserSession: Actions.getUserSession(store),
    getCategoriesData: Actions.getCategoriesData(store),
    getTransactionData: Actions.getTransactionData(store),
    updateTransactionData: Actions.updateTransactionData(store),
    deleteTransactionData: Actions.deleteTransactionData(store),
});

const mapDispatchToProps = {
    onUpdateTransaction: Actions.update_transaction,
    onGetTransaction: Actions.get_transaction,
    onDeleteTransaction: Actions.delete_transaction,
};

export default connect(mapStateToProps,mapDispatchToProps)(Transactions);