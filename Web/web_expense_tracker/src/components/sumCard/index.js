import React from 'react';
import './sumcard.css';


export default class SumCard extends React.Component{
    render(){
        return(
            <div>
                {this.props.type === 'bar' ? (

                <div className="sc-container">
                    <div className="sc-container-loader">
                        <div className="sc-text">
                            <p><b>{this.props.title || ""} :</b></p>
                            <p>
                                RM {parseInt(this.props.left).toLocaleString('en-US', {minimumFractionDigits: 2}) || "0"} of 
                                RM {parseInt(this.props.total).toLocaleString('en-US', {minimumFractionDigits: 2}) || "0"} used
                            </p>
                            
                        </div>
                    </div>
                    <div className="sc-percent">
                        <p>{this.props.percent} %</p>
                    </div>
                </div>

                ) : (
                <div className="sc-container">
                    <p><b>{this.props.title || ""} :</b></p>
                    <p>RM {parseInt(this.props.val).toLocaleString('en-US', {minimumFractionDigits: 2}) || "0"}</p>
                </div>
                )}


            </div>
        );
    }

}