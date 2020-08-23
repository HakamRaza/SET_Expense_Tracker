import React from 'react';
import Card from 'react-bootstrap/Card';

export default class Contact extends React.Component {
    render(){
        return(
            <div id="contact">
                <h2>Contact Us :</h2>
                <div className="cont-card-holder">
                    <Card className="cont-card">
                        <Card.Body>
                            <Card.Title>Office Address :</Card.Title>
                            {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                            <Card.Text>
                                <p> Okane Headquarters,</p>
                                <p> Invoke Space,</p>
                                <p> Sg. Besi, Selangor Darul Ehsan.</p>
                            </Card.Text>
                            {/* <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link> */}
                        </Card.Body>
                    </Card>

                    <Card className="cont-card">
                        <Card.Body>
                            <Card.Title>Contact Info :</Card.Title>
                            {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                            <Card.Text>
                                <p>Email : info@okane.com.my</p>
                                <p>Phone : 000-000 0000</p>
                            </Card.Text>
                            {/* <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link> */}
                        </Card.Body>
                    </Card>

                </div>
            </div>
        );
    }
}