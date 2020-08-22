import React from 'react';
import Drawer from '../../components/drawer';
import Sidebar from '../../components/sidebar';
import './categories.css';
import Modal from '../../components/modal';
import apiData from '../../apiData';

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
        // console.log(apiData[0].GetCategoryBar.barsData);

        return(
            <div>
                <Drawer/>
                {/* <p>This is Category Page</p> */}
                <div className="cat-cont">
                    <Sidebar/>
                    
                    <div className="cat-card-cont">
                        {apiData[0].GetCategoryBar.barsData.map(item=>(
                            <div className="cat-card" style={{backgroundColor:item.color}}>
                                <p>Category :</p>
                                <p>{item.title}</p>

                                <p>Budget Allocation :</p>
                                <p>${item.budget.toFixed(2)}</p>

                                <p>Current Transaction :</p>
                                <p>${item.totalExpense.toFixed(2)}</p>

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