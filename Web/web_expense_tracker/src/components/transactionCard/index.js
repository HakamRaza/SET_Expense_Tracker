import React from 'react';
import './transcard.css';
import Card from 'react-bootstrap/Card';


export default class TransactionCard extends React.Component{
    render(){
        return(

            <div>
                <Card border="secondary" style={{ width: '18rem', marginTop:10}}>
                    <Card.Body>
                    <div className="tc-holder1">
                        <Card.Title>{this.props.categ || ""}</Card.Title>
                        <Card.Title style={{color:"red", fontSize:18}}>- $ {this.props.total || ""}</Card.Title>
                    </div>
                    <Card.Text>{this.props.desc || "..."}</Card.Text>

                    <div className="tc-holder3">
                        <Card.Text><i>{this.props.date || "DD-MM-YYYY"}</i></Card.Text>
                    </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}