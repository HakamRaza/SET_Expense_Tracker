import React from 'react';
import './filtering.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'

export default class FilterBar extends React.Component{
    render(){
        return(
            <div>
                <p>Search Parameter: </p>

                <div className="filter-cont">
                <Accordion>
                    <Card bg='light'>
                        <Accordion.Toggle as={Card.Header} eventKey="0" style={{textAlign:"center"}}>
                        Click Here Start ..
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form className="filter-holder">

                                    <Form.Group>
                                        <Form.Label>Select Start Date</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder="Select Start Date ..." />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Select End Date</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder="Select End Date ..." />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Range Starting Price</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder="Starting Price ..." />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Range Ending Price :</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder="Ending Price ..." />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Description :</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder="Description Unique Identifier ..." />
                                    </Form.Group>

                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control size="sm" as="select">
                                        <option>Category 1</option>
                                        <option>Category 2</option>
                                        <option>Category 3</option>
                                        <option>Category 4</option>
                                        <option>Category 5</option>
                                        </Form.Control>
                                    </Form.Group>

                                </Form>
                                    <Button variant="primary" type="submit">Search</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>



                </div>




                {/* <div className='filter-container'>
                    <div className="filter-holder">
                        <div className="filter-form">Categories Select</div>
                        <div className="filter-form">Start Date Select</div>
                        <div className="filter-form">End Date Select</div>
                        <div className="filter-form">Less Than Search</div>
                        <div className="filter-form">More Than Search</div>
                        <div className="filter-form">Description Search</div>
                    </div>
                    <div className="filbut-holder">
                        <button className="filter-button">Search</button>
                    </div>
                </div> */}
            </div>
        );
    }
}