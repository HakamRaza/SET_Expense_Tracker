import React from 'react';
import './categcard.css';

export default class CategoriesCard extends React.Component{
    render(){
        return(
            <div className="categ-card-cont">
                <p><b>{this.props.name}</b></p>
                <p>Budget (RM) : {this.props.budget}</p>
                <p>Expenses (RM) : {this.props.expense}</p>
                <p>Balance (RM)  : {this.props.bal}</p>
                <div className="categ-card-loader">
                    <div className="categ-card-loading" style={{width:`${this.props.expense/this.props.budget*100}%`}}></div>
                </div>
            </div>
        );
    }
}