import React from 'react';
import './drawer.css';
import Actions from '../../actions';
import { connect } from "react-redux";
// import  { Redirect } from 'react-router-dom'
import {withRouter} from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class Drawer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            showDrawer: false,
        }
    }

    componentDidUpdate(prevProps){
        const { getLogoutData } = this.props;
        
        if(prevProps.getLogoutData.isLoading && !getLogoutData.isLoading){
            
            if(getLogoutData.data.status === "success") {        
                alert("Logout Success");
                this.props.history.push("/login");
        
            } else if (getLogoutData.error !== null){
                alert("Failed To Logout, Please Try Again");
        }}
    }
                
    _onLogout(){
        this.props.onLogout();
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
                            <Nav.Link href="/monthly-summary">Monthly Overview</Nav.Link>
                            <Nav.Link href="/category">Category Settings</Nav.Link>
                            </Nav>
                            <Form inline>
                                <Button variant="danger" onClick={()=>(this._onLogout())}>Logout</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
            </div>

        );
    }
}

const mapStateToProps = store => ({getLogoutData: Actions.getLogoutData(store)});
const mapDispatchToProps = {onLogout: Actions.logout};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Drawer));