import React from 'react';
import Drawer from '../../components/drawer';
import Sidebar from '../../components/sidebar';
import './categories.css';
import Modal from '../../components/modal';

const sumCat = [
    {
        name:"Food",
        month_budget: 800,
        color: "red",
    },

    {
        name:"Drinks & Boba Tea Whatever",
        month_budget: 300,
        color: "bisque",
    },

    {
        name:"House Bills",
        month_budget: 100,
        color: "lightblue",
    },

    {
        name:"Savings",
        month_budget: 900,
        color: "lightblue",
    },

    {
        name:"Drinks & Boba Tea Whatever",
        month_budget: 300,
        color: "lightgreen",
    },

    {
        name:"House Bills",
        month_budget: 100,
        color:"lightblue",
    },

    {
        name:"Savings",
        month_budget: 900,
        color: "lightgreen",
    },

    {
        name:"Drinks & Boba Tea Whatever",
        month_budget: 300,
        color: "lightgreen",
    },

    {
        name:"House Bills",
        month_budget: 100,
        color:"lightblue",
    },

    {
        name:"Savings",
        month_budget: 900,
        color: "lightgreen",
    },
]

export default class Category extends React.Component{
    constructor(){
        super();

        this.state={
            showAddMore: false,
        }
    }

    _addCategories(){
        console.log("Add more Categories");
        this.setState({showAddMore:true});

    }

    render(){
        return(
            <div>
                <Drawer/>
                {/* <p>This is Category Page</p> */}

                <div className="cat-cont">
                    <Sidebar/>
                    
                    <div className="cat-card-cont">
                        {sumCat.map(item=>(
                            <div className="cat-card" style={{backgroundColor:item.color}}>
                                <p>Category :</p>
                                <p>{item.name}</p>

                                <p>Budget Allocation :</p>
                                <p>{item.month_budget}</p>

                                <p>Color Selection :</p>
                                <p>{item.color}</p>
                            </div>
                        ))}
                        
                        <div className="cat-card-add" onClick={()=>{this._addCategories()}}>
                            <p> + Click Here to Add More</p>
                        </div>

                    </div>

                </div>

                {this.state.showAddMore && (<Modal onclick={()=>this.setState({showAddMore:false})}/>)}

            </div>
        );
    }
}