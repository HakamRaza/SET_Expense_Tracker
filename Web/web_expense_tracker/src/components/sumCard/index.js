import React from 'react';
import './sumcard.css';
import Card from 'react-bootstrap/Card';
import { IconContext } from "react-icons";
import { IoIosPodium, IoIosTimer } from "react-icons/io";

export default class SumCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Card border="primary" style={{ width: '18rem', marginTop:10}}>
                    <Card.Body>
                    <Card.Text>{this.props.title || ""} :</Card.Text>
                    <Card.Title><b>$ {this.props.total.toFixed(2) || 0}</b></Card.Title>

                    <Card.Text>
                        {this.props.type === '1' ? (
                            <IconContext.Provider value={{ className: 'sumc-icons' }}>
                                <IoIosPodium/>
                            </IconContext.Provider>
                        ):(
                            <IconContext.Provider value={{ className: 'sumc-icons' }}>
                                <IoIosTimer/>
                            </IconContext.Provider>
                        )}
                    </Card.Text>

                    </Card.Body>
                </Card>
            </div>
        );
    }

}