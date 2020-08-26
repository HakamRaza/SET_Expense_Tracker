import React from 'react';
import './addnewtrans.css';
import Actions from '../../actions';
import { connect } from "react-redux";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
// import { Alert } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'


class AddTransaction extends React.Component{
    constructor(){
        super();

        this.state={
            trans_category:"",
            trans_desc:"",
            // trans_date: new Date().toISOString().substring(0, 10),
            trans_date:"",
            trans_value:0,

            buttonValid: true,
            onLoading: false,
            getCategories:[],

            showModal:false,
            modalTitle:"",
            modalMsg:"",

        }
    }

    _checkFormValidity(){
        var val1 = document.getElementById('selectCat').validity.valid;
        var val2 = document.getElementById('selectDesc').validity.valid;
        var val3 = document.getElementById('selectDate').validity.valid;
        var val4 = document.getElementById('selectVal').validity.valid;

        var valid = val1 && val2 && val3 && val4;
        // console.log(valid);
        this.setState({buttonValid: !valid});
    }


    componentDidMount(){
        //setting current date
        const d = new Date();
        const yr = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        const dt = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

        const cdt = `${yr}-${mo}-${dt}`;
        this.setState({trans_date: cdt })

        // console.log(`${yr}-${mo}-${dt}`);
        // console.log(new Date().toISOString());
        
        //get categories
        this.props.onGetCategories();
    }

    componentDidUpdate(prevProps){
        const { getCategoriesData } = this.props;
        const { getNewTransactionData } = this.props;
        
        
        if(prevProps.getCategoriesData.isLoading && !getCategoriesData.isLoading){
            
            if(getCategoriesData.data.status === "success") {
                
                this.setState({getCategories:getCategoriesData.data.categoryList});
                
            } else if (getCategoriesData.error !== null){

                if(getCategoriesData.error.status !== null){
                    
                //     this.setState({
                //         showModal:true,
                //         modalTitle: "Failed",
                //         modalMsg:getCategoriesData.data.status,
                //     });

                // } else {
                    
                    this.setState({
                        showModal:true,
                        modalTitle: "Failed",
                        modalMsg:"Failed to get Categories List",
                    });
                }
                // Alert('Oops, failed to retrieve Categories List');
            }

            this.setState({onLoading:false});
        }
        
        if(prevProps.getNewTransactionData.isLoading && !getNewTransactionData.isLoading){
            
            if(getNewTransactionData.data.status === "success") {

                this.setState({
                    showModal:true,
                    modalTitle: "Success!",
                    modalMsg:"New Transaction Added."
                });

                
            } else if (getNewTransactionData.error !== null){

                console.log(getNewTransactionData.error.data.error);

                if(getNewTransactionData.error.data.error !== null){
                    
                    this.setState({
                        showModal:true,
                        modalTitle: "Failed",
                        modalMsg:getNewTransactionData.error.data.error
                    });

                } else {
                    
                    this.setState({
                        showModal:true,
                        modalTitle: "Failed",
                        modalMsg:"Failed to record new Transaction"
                    });
                }

                // Alert('Oops, failed to record new Transaction');
            }

            this.setState({onLoading:false});
        }
        // console.log(this.state.getCategories);
    }

    _submitNewTransaction(){
        this.setState({onLoading:true});

        const { trans_category, trans_desc, trans_date, trans_value } = this.state;
        
        if(trans_category !=="" && trans_desc !=="" && trans_date !=="" && trans_value !==""){
            
            const formData = {
                trans_category,
                trans_desc,
                trans_date,
                trans_value,
            }

            // console.log('formdata add trans', formData);
            // this.props.onAddTransaction(formData);
            this.props.onNewTransaction(formData);

        } else {
            this.setState({
                showModal:true,
                modalTitle: "Oops..",
                modalMsg:"Make sure to fill up all the items",
            });
            // Alert("Oops, make sure to fill all the items")
        }
    }

    render(){
        return(
            <div>
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

                {/* <h3 onClick={()=>this.setState({showModal:true})}>Show Modal</h3> */}

                <Form onChange={()=>(this._checkFormValidity())}>
                    <fieldset disabled={this.state.onLoading}>

                    <Form.Group controlId="selectCat">
                        <Form.Label>Category :</Form.Label>
                        <Form.Control required size="sm" as="select" onChange={(trans_category)=> this.setState({trans_category: trans_category.target.value})}>
                            <option value="">- Select Category -</option>

                            {this.state.getCategories.map( item=>(
                                <option value={item.id}>{item.category_title}</option>
                            ))}

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="selectDesc">
                        <Form.Label>Description :</Form.Label>
                        <Form.Control required size="sm" type="text" pattern=".{1,25}" placeholder="Max 25 Chars" onChange={(trans_desc)=> this.setState({trans_desc: trans_desc.target.value})}/>
                    </Form.Group>

                    <Form.Group controlId="selectDate">
                        <Form.Label>Date :</Form.Label>
                        <Form.Control required size="sm" type="text" min="2020-01-01" max="2050-01-01" value={this.state.trans_date} onChange={(trans_date)=> this.setState({trans_date: trans_date.target.value})}/>
                    </Form.Group>

                    <Form.Group controlId="selectVal">
                        <Form.Label>Value (RM) :</Form.Label>
                        <Form.Control required size="sm" type="number" min="0" step="0.01" placeholder="Transaction Value" onChange={(trans_value)=> this.setState({trans_value: trans_value.target.value})}/>
                    </Form.Group>

                    {this.state.onLoading ? (<span><Spinner animation="border" size="sm"/> Saving ...</span>): (<Button variant="primary" disabled={this.state.buttonValid} onClick={()=>(this._submitNewTransaction())}>ADD NEW</Button>)}
                    
                    </fieldset>
                </Form>

            </div>
        );
    }
}


const mapStateToProps = store => ({
                                //same as in action
    getCategoriesData: Actions.getCategoriesData(store),
    getNewTransactionData: Actions.newTransactionData(store),
});

const mapDispatchToProps = {
                                //same as in actions
    onGetCategories: Actions.get_categories,
    onNewTransaction: Actions.new_transaction,
};

export default connect(mapStateToProps,mapDispatchToProps)(AddTransaction);