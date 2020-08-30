import React from 'react';
import './dummy.css';
import Apps from './Apps';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'

// const decoratedOnClick = useAccordionToggle(eventKey, onClick);

export default class About extends React.Component {
    render(){
        return(
            <div id="about">
                {/* <Header/> */}
                <div id="about-wrap">
                    <div id="about-item">
                        <div id="about-text" >
                            <h2>About Us:</h2>
                            <br/>
                            <p><i>A Leader in Expense Tracking Innovation</i></p>
                            <div style={{textAlign:"justify"}}>
                                <p><b>Okane</b> was founded in 2020 and Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                                <br/></p>
                                <p>
                                In July 2020, Okane released version 1.0 of Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                                <br/></p>
                                
                                <Accordion>
                                    <Card style={{backgroundColor:"#318fb5"}}>
                                        <Accordion.Toggle as={Card.Header} eventKey="0" style={{textAlign:"center"}}>
                                        ...Click to read more!
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                            <p>
                                            In  of 1998, Okane released its first At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet continues to be a popular product and is used by travelers throughout the world.
                                            <br/></p>
                                            <p>
                                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                                            <br/></p>
                                            <p>
                                            Okane prides itself it providing great products along with great customer service. We appreciate comments and feedback from all our customers.</p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>

                        </div>

                    </div>
                </div>
                {/* <Contact/> */}
                <Apps/>
            </div>
        );
    }
}