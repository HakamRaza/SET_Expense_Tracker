import React from 'react';
import './sumcardbar.css';


export default class SumCardBar extends React.Component{
    render(){
        console.log(this.props.percent);

        return(
            <div>
                <div className="sc-container">
                    <div className="sc-container-loader" style={{width:`${this.props.percent}%`}}></div>

                    <p className="sc-percent">{this.props.percent.toFixed(2)} %</p>

                    <div className="sc-text">
                        <p><b>{this.props.title || ""} :</b></p>
                        <p>RM {this.props.left.toFixed(2)} of RM {this.props.total.toFixed(2)} left.</p>
                    </div>
                    
                </div>
            </div>
        );
    }

}