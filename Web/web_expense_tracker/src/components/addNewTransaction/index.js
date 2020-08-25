import React from 'react';
import './addnewtrans.css';
import Actions from '../../actions';
import { connect } from "react-redux";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { Alert } from 'react-bootstrap';


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
        
    }

    // componentDidUpdate(prevProps){
    //     const { getLoginData } = this.props;
        
    //     if(prevProps.getLoginData.isLoading && !getLoginData.isLoading){
    //         this.setState({onLoading:false});
            
    //         if(getLoginData.data.status === "success") {
    //             this.props.history.push("/dashboard");
                
    //         } else if (getLoginData.error !== null){
    //             this.setState({
    //                 showAlert: true,
    //                 alertMsg: getLoginData.error.error,
    //                 alertVar:"danger",
    //             });
                
    //             // this.props.history.push("/login");
    //         }
    //     }
    // }

    _submitAddTransaction(){
        this.setState({onLoading:true});

        const { trans_category, trans_desc, trans_date, trans_value } = this.state;
        
        if(trans_category !=="" && trans_desc !=="" && trans_date !=="" && trans_value !==""){
            
            const formData = {
                trans_category,
                trans_desc,
                trans_date,
                trans_value,
            }

            console.log('formdata add trans', formData);
            // this.props.onAddTransaction(formData);
        } else {
            Alert("Oops, make sure to fill all the items")
        }

        setTimeout(() => {
            this.setState({onLoading:false});
        }, 2000);

    }

    render(){
        return(
            <div>
                <Form onChange={()=>(this._checkFormValidity())}>
                    <fieldset disabled={this.state.onLoading}>

                    <Form.Group controlId="selectCat">
                        <Form.Label>Category :</Form.Label>
                        <Form.Control required as="select" onChange={(trans_category)=> this.setState({trans_category: trans_category.target.value})}>
                        {/* {color.map(item=>(
                        <option className='color-cont' style={{backgroundColor:item}}>{item}</option>
                        ))} */}
                            <option value="">- Select Category -</option>
                            <option value="1">Category 1</option>
                            <option value="2">Category 2</option>
                            <option value="3">Category 3</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="selectDesc">
                        <Form.Label>Description :</Form.Label>
                        <Form.Control required size="sm" type="text" pattern=".{1,25}" placeholder="Max 25 Chars" onChange={(trans_desc)=> this.setState({trans_desc: trans_desc.target.value})}/>
                    </Form.Group>

                    <Form.Group controlId="selectDate">
                        <Form.Label>Date :</Form.Label>
                        <Form.Control required size="sm" type="date" min="2020-01-01" max="2050-01-01" value={this.state.trans_date} onChange={(trans_date)=> this.setState({trans_date: trans_date.target.value})}/>
                    </Form.Group>

                    <Form.Group controlId="selectVal">
                        <Form.Label>Value (RM) :</Form.Label>
                        <Form.Control required size="sm" type="number" min="0" step="0.01" placeholder="Transaction Value" onChange={(trans_value)=> this.setState({trans_value: trans_value.target.value})}/>
                    </Form.Group>

                    {this.state.onLoading ? (<span><Spinner animation="border" size="sm"/> Saving ...</span>): (<Button variant="primary" disabled={this.state.buttonValid} onClick={()=>(this._submitAddTransaction())}>ADD NEW</Button>)}
                    
                    </fieldset>

                </Form>

            </div>
        );
    }
}

// const mapStateToProps = store => ({getLoginData: Actions.getLoginData(store)});
// const mapDispatchToProps = {onLogin: Actions.login};

const mapStateToProps = store => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps,mapDispatchToProps)(AddTransaction);