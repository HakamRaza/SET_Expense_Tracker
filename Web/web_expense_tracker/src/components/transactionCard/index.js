import React from 'react';
import './transcard.css';

export default class TransactionCard extends React.Component{
    render(){
        console.log(this.props.percent);

        return(
            <div className="transc-cont">
                <p className="tc-p01"><b>{this.props.date}</b></p>
                <p className="tc-p02">{this.props.categ}</p>
                <p className="tc-p03"><i>{(this.props.desc)}...</i></p>
                <p className="tc-p04">RM {this.props.total}</p>
            </div>
        );
    }

}