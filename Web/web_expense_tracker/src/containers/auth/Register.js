import React from 'react';
import './auth.css';
import Header from 'components/header';
import { IoIosMail, IoMdKey, IoIosEyeOff, IoIosEye } from "react-icons/io";
import { IconContext } from "react-icons";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Register extends React.Component{
    constructor(props){
        super(props);

        this.state={
            email:"",
            password:"",
            password_conf:"",
            showPass: false,
        }
    }

    _submitRegister(){
        const {email, password, password_conf} = this.state;

        const formData = {
            email,
            password,
            password_conf,
        }

        console.log("register", formData);
        this.props.history.push("/login");

    }

    render(){
        return(
            <div>
                <Header/>
                <div className="auth">
                    <div className="reg-card">
                        <p>Register and Unleash Your Potential</p>

                        <div className="auth-bgp">
                            <div>
                                <Form>
                                    <div className="auth-input">
                                        <Form.Group controlId="formBasicEmail">
                                            <IconContext.Provider value={{ className: 'auth-icons' }}><IoIosMail /></IconContext.Provider>

                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control style={{fontSize:"0.8em", paddingLeft:36}} type="email" placeholder="Enter email" onChange={(email)=> this.setState({email: email.target.value})}/>
                                            <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                            </Form.Text>
                                        </Form.Group>
                                    </div>

                                    <div className="auth-input">
                                        <Form.Group controlId="formBasicPassword">
                                            <IconContext.Provider value={{ className: 'auth-icons' }}><IoMdKey /></IconContext.Provider>

                                            <Form.Label>Password</Form.Label>
                                            <Form.Control style={{fontSize:"0.8em", paddingLeft:36}} type="password" placeholder="Password" onChange = {(password) => this.setState({password: password.target.value})}/>
                                        </Form.Group>
                                    </div>

                                    <div className="auth-input">

                                        <Form.Group controlId="formBasicPassword">
                                            <IconContext.Provider value={{ className: 'auth-icons' }}><IoMdKey /></IconContext.Provider>

                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control style={{fontSize:"0.8em", paddingLeft:36}} type={this.state.showPass? "text" : "password"} placeholder="Retype Password" onChange = {(password_conf) => this.setState({password_conf: password_conf.target.value})}/>
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
                                    <Button variant="primary" type="submit" onClick={()=>(this._submitRegister())}>Register</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;