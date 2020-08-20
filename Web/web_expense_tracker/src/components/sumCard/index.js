import React from 'react';
import './sumcard.css';


export default class SumCard extends React.Component{
    render(){
        return(
            <div>
                <div className="sc-container">
                    <p><b>{this.props.title || ""} :</b></p>
                    <p>RM {this.props.total.toFixed(2) || 0}</p>
                </div>
            </div>
        );
    }

}