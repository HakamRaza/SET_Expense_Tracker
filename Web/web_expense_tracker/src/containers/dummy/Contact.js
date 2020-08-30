import React from 'react';
import Card from 'react-bootstrap/Card';

export default class Contact extends React.Component {
    render(){
        return(
            <div style={{backgroundColor:"#318fb5"}}>
                <div id="contact">
                    <h2>Contact Us :</h2>
                    <div className="cont-card-holder">
                        <Card className="cont-card">
                            <Card.Body style={{backgroundColor:"#318fb5"}}>
                                <Card.Title>Office Address :</Card.Title>
                                <Card.Text>
                                    <p> Okane Headquarters,</p>
                                    <p> InV Space,</p>
                                    <p> Sg. Metal, Sey Longer Duckroll E Sine.</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className="cont-card">
                            <Card.Body style={{backgroundColor:"#318fb5"}}>
                                <Card.Title>Contact Info :</Card.Title>
                                <Card.Text>
                                    <p>Email : info@okane.com.my</p>
                                    <p>Phone : 010-110 0011</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </div>
                </div>
            </div>
        );
    }
}