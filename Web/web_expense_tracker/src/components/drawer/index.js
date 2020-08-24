import React from 'react';
import './drawer.css';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default class Drawer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showDrawer: false,
        }
    }

    _onLogout(){
        console.log("logout user");
        // this.props.history.push("/login");
    }

    render(){
        return(
            <div className="drawer-cont">
                    <Navbar bg="light" expand='md   '>
                    <Navbar.Brand href="/dashboard">
                        <div className="header-logo">
                            <h2 style={{marginLeft:25, paddingTop:18}}>Okane</h2>
                        </div>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/transaction">History</Nav.Link>
                            <Nav.Link href="/category">Category Settings</Nav.Link>
                            <Nav.Link href="/monthly-summary">Monthly Overview</Nav.Link>
                            </Nav>
                            <Form inline>
                                <Button variant="danger" type="submit" onClick={()=>(this._onLogout())}>Logout</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
            </div>

        );
    }
}