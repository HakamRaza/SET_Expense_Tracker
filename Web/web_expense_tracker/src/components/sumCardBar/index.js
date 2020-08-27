import React from 'react';
import './sumcardbar.css';
import Card from 'react-bootstrap/Card';
import { VictoryPie} from 'victory';

export default class SumCardBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Card border="warning" style={{ width: '18rem', marginTop:10}}>
                    <Card.Body>
                    <Card.Text>{this.props.title || ""} :</Card.Text>
                    <Card.Title><b>$ {this.props.left.toFixed(2) || 0}</b></Card.Title>

                    <Card.Text>
                        <div className="sumc-pie">

                                <VictoryPie
                                style={{data: {stroke: "#005086", strokeWidth: 5},}}
                                innerRadius={110}
                                colorScale={["white","#005086"]}
                                
                                data={[
                                    { x: "", y: this.props.total-this.props.left},
                                    { x: "", y: this.props.left },
                                ]}
                                
                                animate={{
                                    duration: 2000
                                }}
                                />
                        </div>
                            <div className="pie-cent"><p>{this.props.percent.toFixed(1)}%</p></div>
                            <div className="pie-total"><p> from $ {this.props.total.toFixed(2) || 0}</p></div>

                    </Card.Text>

                    </Card.Body>
                </Card>
            </div>
        );
    }

}