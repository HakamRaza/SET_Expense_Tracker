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
                    <Navbar bg="light" expand='sm'>
                    <Navbar.Brand href="/dashboard">
                        <div className="header-logo">
                            <h2 style={{marginLeft:25, paddingTop:18}}>Okane</h2>
                        </div>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>

                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/transaction">Transaction History</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/category">Category Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/monthly-summary">Monthly Overview</NavDropdown.Item>
                            </NavDropdown>
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