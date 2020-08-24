import React from 'react';
import Drawer from '../../components/drawer';
// import Sidebar from '../../components/sidebar';
import './categories.css';
import Modal from '../../components/modal';
import apiData from '../../apiData';
// import CategoriesCard from '../../components/categoriesCard';
import Card from 'react-bootstrap/Card';
import { IconContext } from "react-icons";
import { IoIosTrash, IoMdCreate } from "react-icons/io";


const sumCat = [
    {
        name:"Food",
        budget: 800,
        totalexpense: 400,
        color:"lightblue",
    },

    {
        name:"Drinks & Boba",
        budget: 300,
        totalexpense: 150,
        color:"lightgreen",

    },

    {
        name:"House Bills",
        budget: 100,
        totalexpense: 0,
        color:"lightblue",

    },

    {
        name:"Savings",
        budget: 900,
        totalexpense: 302.04,
        color:"lightcoral",

    },

    {
        name:"Drinks & Boba",
        budget: 300,
        totalexpense: 150,
        color:"lightgreen",

    },

    {
        name:"House Bills",
        budget: 100,
        totalexpense: 0,
        color:"lightcoral",

    },

    {
        name:"Savings",
        budget: 900,
        totalexpense: 302.04,
        color:"lightsalmon",

    },

    {
        name:"Drinks & Boba",
        budget: 300,
        totalexpense: 150,
        color:"yellow",

    },

    {
        name:"House Bills",
        budget: 100,
        totalexpense: 0,
        color:"limegreen",

    },

    {
        name:"Savings",
        budget: 900,
        totalexpense: 302.04,
        color:"limegreen",

    },
]


export default class Category extends React.Component{
    constructor(){
        super();

        this.state={
            showAddMore: false,
            showDelCat: false,
            showEditCat: false,
        }
    }

    _addCategories(){
        console.log("Add more Categories");
        this.setState({showAddMore:true});
        
    }

    _delCategories(){
        console.log("Delete a Category");
        this.setState({showDelCat:true});
        
    }

    _editCategories(){
        console.log("Edit a Category");
        this.setState({showEditCat:true});
        
    }
    
    render(){
        // console.log(apiData[0].GetCategoryBar.barsData);

        return(
            <div>
                <Drawer/>
                <div className="cat-cont">
                    
                    <div className="cat-card-cont">
                        
                        <div className="categ-card-cont">
                            <Card border="primary" style={{ width: '100%', marginTop:10,}}>
                                <Card.Body>
                                    <div style={{display:'flex', flexDirection:'row', justifyContent:"space-between"}} onClick={()=>{this._addCategories()}}>
                                        <Card.Title><b> + Click Here to Add More</b></Card.Title>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                        {/* {apiData[0].GetCategoryBar.barsData.map(item=>( */}
                        {sumCat.map(item=>(


                        <div className="categ-card-cont">
                            <Card border="primary" style={{ width: '100%', marginTop:10, backgroundColor: `${item.color}`}}>

                                <Card.Body>
                                    <div style={{display:'flex', flexDirection:'row', justifyContent:"space-between"}}>
                                        <Card.Title><b>{item.name} </b></Card.Title>
                                    </div>
                                    <div>
                                    <Card.Text>Total Budget: $ {item.budget.toFixed(2)}</Card.Text>
                                    </div>
                                    <div>
                                        <IconContext.Provider value={{ className: 'trans-icons' }}>
                                            <IoIosTrash onClick={()=>{this._delCategories()}}/>
                                            <IoMdCreate onClick={()=>{this._editCategories()}}/>
                                        </IconContext.Provider>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        ))}

                    </div>
                </div>

                {this.state.showAddMore && (<Modal butText = 'ADD' onclick={()=>this.setState({showAddMore:false})}/>)}
                {this.state.showEditCat && (<Modal butText = 'SAVE' name="Category A" onclick={()=>this.setState({showEditCat:false})}/>)}
                {this.state.showDelCat && (<Modal butText = 'DELETE' name="Category B" onclick={()=>this.setState({showDelCat:false})}/>)}
            </div>
        );
    }
}