import React from 'react';
import './modal.css';
import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const color=['lightgreen', 'lightblue', 'lightpink','lightgray', 'lightcyan']

export default class Modal extends React.Component {

    render(){
        return(
            <div className="modal-bg">
                <div className="modal-form">
                    <div className="modal-close" onClick={this.props.onclick}>
                        <IconContext.Provider value={{ className: 'trans-icons' }}>
                            <IoMdClose/>
                        </IconContext.Provider>
                    </div>


                    <Form.Group>
                        <Form.Label>Category Name :</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="Category Name"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Budget Allocate $ :</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="Budget in $" />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Color Selection :</Form.Label>
                        <Form.Control as="select">
                        {color.map(item=>(
                        <option className='color-cont' style={{backgroundColor:item}}>{item}</option>
                        ))}
                        </Form.Control>
                    </Form.Group>

                        <Button variant="primary" type="submit">{this.props.butText}</Button>

                    {/* <p>Name :</p>
                    <input type="text" placeholder="Categories Name"/>
                    <p>Budget:</p>
                    <input type="text" placeholder="Categories Budget"/>
                    <p>Choose Color: </p>
                    <button>ADD</button> */}
                </div>
            </div>
        );
    }
}