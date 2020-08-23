import React from 'react';
import './dummy.css';
import Contact from './Contact';
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
                                <p><b>Okane</b> was founded in 1985 and began publishing software for the Apple Macintosh. Its first product in 1985 was MacAuto, an automotive logbook. In the years to follow, it released FolderJump, FetchIt and KopyKat. Three very popular utilities for the Macintosh.
                                <br/></p>
                                <p>
                                In 1997, Okane released version 5 of MoreInfo, which was to become the best selling version of the software.  MoreInfo continues to be sold today to loyal Newton users.
                                <br/></p>
                                
                                <Accordion>
                                    <Card style={{backgroundColor:"#318fb5"}}>
                                        <Accordion.Toggle as={Card.Header} eventKey="0" style={{textAlign:"center"}}>
                                        ...Click to read more!
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                            <p>
                                            In  of 1998, Okane released its first Palm application, TravelTracker. Since then, TravelTracker has been updated numerous times, the current version being 4. TravelTracker continues to be a popular product and is used by travelers throughout the world.
                                            <br/></p>
                                            <p>
                                            On July 11, 2008, Okane released its first product for the iPhone, TravelTracker.  Inspired by the Palm OS version, the iPhone version is even more powerful and comprehensive than the popular Palm OS version.
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
                <Contact/>
            </div>
        );
    }
}