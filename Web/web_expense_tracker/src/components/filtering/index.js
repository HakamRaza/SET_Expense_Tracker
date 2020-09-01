import React from 'react';
import './filtering.css';
import Actions from '../../actions';
import { connect } from "react-redux";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal'


class FilterBar extends React.Component{
    constructor(props){
        super(props);

        this.state={

            startDate:"",
            endDate:"",
            minPrice:"",
            maxPrice:"",
            description:"",
            categoryName:"",
            onLoading:false,
            buttonValid:false,
            getCategories:[],
            showModal:false,
            modalTitle:"",
            modalMsg:"",
            comparisonState:true,

        }
    }
    
    _checkFormValidity(){
            var sdate = document.getElementById('sdate').validity.valid;
            var edate = document.getElementById('edate').validity.valid;
            var mnp = document.getElementById('mnp').validity.valid;
            var mxp = document.getElementById('mxp').validity.valid;
            var keyw = document.getElementById('keyw').validity.valid;
            var catname = document.getElementById('catname').validity.valid;
            var valid = sdate && edate && mnp && mxp && keyw && catname;
            this.setState({buttonValid: !valid});
        }
        
        
    _submitGetTransaction(){
        this.setState({onLoading:true});

        const { startDate, endDate, minPrice, maxPrice, description, categoryName, comparisonState } = this.state;

        if(minPrice !=="" && maxPrice !==""){

            if(maxPrice <= minPrice){

                this.setState({
                    comparisonState:false,
                    showModal:true,
                    modalTitle: "Invalid Values",
                    modalMsg:"Maximum Price must more than Minimum Price",
                });
            }
        }
        
        if (startDate !=="" && endDate !==""){
            if(endDate <= startDate){
                
                this.setState({
                    comparisonState:false,
                    showModal:true,
                    modalTitle: "Invalid Values",
                    modalMsg:"End Date must be after the Start Date",
                });
            }
        }

        if(comparisonState){

            const formData = {
                startDate,
                endDate,
                minPrice,
                maxPrice,
                description,
                categoryName,
            }

            this.props.onGetTransaction(formData);
            
        } else {

            this.setState({comparisonState:true});
        }
        
    }

    componentDidMount(){
        this.props.onGetCategories();
    }

    componentDidUpdate(prevProps){
        const { getCategoriesData, getTransactionData, updateTransactionData, deleteTransactionData, getNewTransactionData } = this.props;
        
        if(prevProps.getCategoriesData.isLoading && !getCategoriesData.isLoading){
            this.setState({onLoading:false});
            
            if(getCategoriesData.data.status === "success") {
                
                this.setState({getCategories:getCategoriesData.data.categoryList});

                
            } else if (getCategoriesData.error !== null){

                if(getCategoriesData.error.data !== null){
                    
                    this.setState({
                        showModal:true,
                        modalTitle: "Failed",
                        modalMsg:"Failed to fetch Categories List. Please Re-Login",
                    });
                }
            }
        }

        if(prevProps.getTransactionData.isLoading && !getTransactionData.isLoading){
            
            this.setState({onLoading:false});
        }

        if(prevProps.updateTransactionData.isLoading && !updateTransactionData.isLoading){
            this._submitGetTransaction();
        }

        if(prevProps.deleteTransactionData.isLoading && !deleteTransactionData.isLoading){
            this._submitGetTransaction();
        }

        if(prevProps.getNewTransactionData.isLoading && !getNewTransactionData.isLoading){
            this._submitGetTransaction();
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

                <p>Search Parameter: </p>

                <div className="filter-cont">
                <Accordion>
                    <Card bg='light'>
                        <Accordion.Toggle as={Card.Header} eventKey="0" style={{textAlign:"center"}}>
                            Click Here Start .. 
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>

                                <Form onChange={()=>(this._checkFormValidity())}>
                                    <fieldset disabled={this.state.onLoading}>
                                    <div className="filter-holder">
                                        <Form.Group controlId="sdate">
                                            <Form.Label>Start Date :</Form.Label>
                                            <Form.Control size="sm" type="date" placeholder="Select Start Date ..." onChange={(startDate)=> this.setState({startDate: startDate.target.value})}/>
                                        </Form.Group>

                                        <Form.Group controlId="edate">
                                            <Form.Label>End Date :</Form.Label>
                                            <Form.Control size="sm" type="date" placeholder="Select End Date ..." onChange={(endDate)=> this.setState({endDate: endDate.target.value})}/>
                                        </Form.Group>

                                        <Form.Group controlId="mnp">
                                            <Form.Label>Minimum Price Value :</Form.Label>
                                            <Form.Control size="sm" type="number" min="0" step="0.01" placeholder="Min Price ..." onChange={(minPrice)=> this.setState({minPrice: minPrice.target.value})}/>
                                        </Form.Group>

                                        <Form.Group controlId="mxp">
                                            <Form.Label>Maximum Price Value :</Form.Label>
                                            <Form.Control size="sm" min="0" max="1000000" value={this.state.maxPrice} step="0.01" type="number" placeholder="Max Price ..." onChange={(maxPrice)=> this.setState({maxPrice: maxPrice.target.value})}/>
                                        </Form.Group>

                                        <Form.Group controlId="keyw">
                                            <Form.Label>Unique Keyword :</Form.Label>
                                            <Form.Control size="sm" type="text" placeholder="Description Unique Identifier ..." onChange={(description)=> this.setState({description: description.target.value})}/>
                                        </Form.Group>

                                        <Form.Group controlId="catname">
                                            <Form.Label>Category :</Form.Label>
                                            <Form.Control size="sm" as="select" onChange={(categoryName)=> this.setState({categoryName: categoryName.target.value})}>
                                                <option value="">- Select Category -</option>

                                                {this.state.getCategories.map( item=>(
                                                    <option key={item.category_title} value={item.category_title}>{item.category_title}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </div>

                                    {this.state.onLoading ? (<span><Spinner animation="border" size="sm"/> Searching..</span>): (<Button variant="primary" disabled={this.state.buttonValid} onClick={()=>(this._submitGetTransaction())}>Search</Button>)}
                                    </fieldset>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    getCategoriesData: Actions.getCategoriesData(store),
    getTransactionData: Actions.getTransactionData(store),
    updateTransactionData: Actions.updateTransactionData(store),
    deleteTransactionData: Actions.deleteTransactionData(store),
    getNewTransactionData: Actions.newTransactionData(store),

});

const mapDispatchToProps = {
    onGetCategories: Actions.get_categories,
    onGetTransaction: Actions.get_transaction,
};

export default connect(mapStateToProps,mapDispatchToProps)(FilterBar);