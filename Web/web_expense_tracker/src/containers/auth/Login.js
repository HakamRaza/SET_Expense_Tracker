import React from 'react';
import './auth.css';
import Header from 'components/header';

import { IoIosMail, IoMdKey, IoIosEye, IoIosEyeOff} from "react-icons/io";
import { IconContext } from "react-icons";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state={
            email:"",
            password:"",
            showPass:false,
        }
    }

    _submitLogin(){
        const {email, password} = this.state;

        const formData = {
            email,
            password,
        }

        console.log("login", formData);
        this.props.history.push("/dashboard");
    }

    render(){
        return(
            <div>
                <Header/>
                <div className="auth">
                    
                    <div className="auth-card">
                        <p>Login Into Your Dashboard</p>

                        <div className="auth-bgp">
                            <div>
                                <Form>
                                    <div className="auth-input">
                                        <Form.Group controlId="formBasicEmail">
                                            <IconContext.Provider value={{ className: 'auth-icons' }}><IoIosMail /></IconContext.Provider>

                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control style={{fontSize:"0.8em", paddingLeft:36}} type="email" placeholder="Enter email" onChange={(email)=> this.setState({email: email.target.value})}/>
                                        </Form.Group>
                                    </div>

                                    <div className="auth-input">
                                        <Form.Group controlId="formBasicPassword">
                                            <IconContext.Provider value={{ className: 'auth-icons' }}><IoMdKey /></IconContext.Provider>

                                            <Form.Label>Password</Form.Label>
                                            <Form.Control style={{fontSize:"0.8em", paddingLeft:36}} type={this.state.showPass? "text" : "password"} placeholder="Password" onChange = {(password) => this.setState({password: password.target.value})}/>
                                        </Form.Group>

                                        <div>
                                            <IconContext.Provider value={{ className: 'auth-icons-pass' }}>
                                                {this.state.showPass ? (
                                                <IoIosEye onClick={()=>{this.setState({showPass : !this.state.showPass})}}/>
                                                ):(
                                                <IoIosEyeOff onClick={()=>{this.setState({showPass : !this.state.showPass})}}/>
                                            )}</IconContext.Provider>
                                        </div>
                                    </div>
                                    <Button variant="primary" type="submit" onClick={()=>(this._submitLogin())}>Submit</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;