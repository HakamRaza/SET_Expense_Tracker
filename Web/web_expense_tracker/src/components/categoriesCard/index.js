import React from 'react';
import './categcard.css';
import Card from 'react-bootstrap/Card';
// import { VictoryPie} from 'victory';

export default class CategoriesCard extends React.Component{
    render(){
        return(
            <div className="categ-card-cont">
                <Card border="primary" style={{ width: '18rem', marginTop:10, boxShadow: `5px 5px 0px ${this.props.color}`}}>
                    <Card.Body>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:"space-between"}}>
                            <Card.Title><b>{this.props.name || ""} </b></Card.Title>
                            <Card.Text><b style={{color:`${this.props.bal <= 0 ? "red" : "black"}`}}>$ {this.props.bal || 0} </b> left.</Card.Text>
                        </div>
                        <div>
                            <Card.Text>Total Budget: $ {this.props.budget.toFixed(2) || 0}</Card.Text>
                        </div>
                        <div className="categ-card-loader">
                            <div className="categ-card-loading" style={{width:`${this.props.expense/this.props.budget*100}%`}}></div>
                        </div>

                        <div className="categ-total"><p><b> {(this.props.expense/this.props.budget*100).toFixed(1) || 0} % </b>used</p></div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}