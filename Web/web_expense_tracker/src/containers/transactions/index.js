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


class Transactions extends React.Component{
    constructor(){
        super();

        this.state={

            startDay:"",
            startMonth:"",
            startYear:"",
            endDay:"",
            endMonth:"",
            endYear:"",
            minPrice:"",
            maxPrice:"",
            description:"",
            categoryName:"",

        }
    }
    
    // _checkFormValidity(){
        //     var mail = document.getElementById('formBasicEmail').validity.valid;
        //     var pass = document.getElementById('formBasicPassword').validity.valid;
        //     var valid = mail && pass;
        
        //     this.setState({buttonValid: !valid});
        //     // console.log("form status", mail, pass);
        //     // console.log("sum", mail && pass);
        // }
        
        
    _submitGetTransaction(){

    }

    render(){
        return(
            <div className="latest-trans">
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
                                <td className="trans-col">000 Results</td>
                                <td className="trans-col">$ 0000.00</td>
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
                            <th>Categories</th>
                            <th>Total</th>
                            <th className="trans-col-desc">Description</th>
                            <th>Del/ Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sumTrans.map((item, index)=>(
                                <tr>
                                    <td>{index+1}</td>
                                    <td className="trans-col">{item.date}</td>
                                    <td className="trans-col">{item.categories}</td>
                                    <td className="trans-col">{item.total.toFixed(2)}</td>
                                    <td className="trans-col-desc">{item.desc}</td>
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

const mapStateToProps = store => ({getTransactionData: Actions.getTransactionData(store)});

const mapDispatchToProps = {onGetTransaction: Actions.get_transaction};

export default connect(mapStateToProps,mapDispatchToProps)(Transactions);