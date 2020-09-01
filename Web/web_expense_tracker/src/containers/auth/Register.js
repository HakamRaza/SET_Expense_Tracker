import React from 'react';
import './auth.css';
import Header from 'components/header';
import Actions from '../../actions';
import { connect } from "react-redux";

import { IoIosMail, IoMdKey, IoIosEyeOff, IoIosEye } from "react-icons/io";
import { IconContext } from "react-icons";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner'

class Register extends React.Component{
    constructor(props){
        super(props);

        this.state={
            email:"",
            password:"",
            password_conf:"",

            showPass: false,
            alertMsg:"",
            alertVar:"",
            onLoading:false,
            buttonValid:true,

        }
    }

    componentDidMount(){
        Actions.resetUserSession();
    }

    componentDidUpdate(prevProps){
        const { getRegisterData } = this.props;
        
        if(prevProps.getRegisterData.isLoading && !getRegisterData.isLoading){
            this.setState({onLoading:false});
            
            if(getRegisterData.data.status === "success") {

                alert("Registration Success! Please Log In");
                this.props.history.push("/login");
                
            } else if (getRegisterData.error !== null){
                
                this.setState({
                    showAlert: true,
                    alertMsg: getRegisterData.error.data.error,
                    alertVar:"danger",
                });
            }
        }
    }

    _checkFormValidity(){
        var mail = document.getElementById('formBasicEmail').validity.valid;
        var pass = document.getElementById('formBasicPassword').validity.valid;
        var pass2 = document.getElementById('formBasicPassword2').validity.valid;
        var valid = mail && pass && pass2;
        // console.log("form status", mail, pass, pass2);
        // console.log("sum", mail && pass && pass2);
        
        this.setState({buttonValid: !valid});
    }

    _submitRegister(){
        const {email, password, password_conf} = this.state;

        if(email !=="" && password !=="" && password_conf !==""){

            if(password === password_conf){
                this.setState({onLoading:true});

                const formData = {
                    email,
                    password,
                    password_conf,
                }
        
                this.props.onRegister(formData);

            } else {
                
                this.setState({
                    showAlert: true,
                    alertMsg:"Password Mismatch",
                    alertVar:"warning",
                })
            }

        } else {
            this.setState({
                showAlert: true,
                alertMsg:"Please Fill All Forms",
                alertVar:"warning",
            })
        }
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
                                <Form onChange={()=>(this._checkFormValidity())}>
                                    <fieldset disabled={this.state.onLoading}>

                                        <div className="auth-input">
                                            <Form.Group controlId="formBasicEmail">
                                                <IconContext.Provider value={{ className: 'auth-icons' }}><IoIosMail /></IconContext.Provider>

                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control required style={{fontSize:"0.8em", paddingLeft:36}} type="email" title="Unique email" placeholder="Enter email" onChange={(email)=> this.setState({email: email.target.value})}/>
                                                <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                                </Form.Text>
                                            </Form.Group>
                                        </div>

                                        <div className="auth-input">
                                            <Form.Group controlId="formBasicPassword">
                                                <IconContext.Provider value={{ className: 'auth-icons' }}><IoMdKey /></IconContext.Provider>

                                                <Form.Label>Password</Form.Label>
                                                <Form.Control required style={{fontSize:"0.8em", paddingLeft:36}} type="password" title="+6 characters" placeholder="Password" pattern=".{6,}" onChange = {(password) => this.setState({password: password.target.value})}/>
                                            </Form.Group>
                                        </div>

                                        <div className="auth-input">

                                            <Form.Group controlId="formBasicPassword2">
                                                <IconContext.Provider value={{ className: 'auth-icons' }}><IoMdKey /></IconContext.Provider>

                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control required  style={{fontSize:"0.8em", paddingLeft:36}} type={this.state.showPass? "text" : "password"} title="Must match above" placeholder="Retype Password" pattern=".{6,}" onChange = {(password_conf) => this.setState({password_conf: password_conf.target.value})}/>
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

                                        {this.state.onLoading ? (<span><Spinner animation="border" size="sm"/> Registering ..</span>): (<Button variant="primary" disabled={this.state.buttonValid} onClick={()=>(this._submitRegister())}>Register</Button>)}
                                    </fieldset>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.showAlert && (
                    <div style={{marginTop:50}}>
                        <Alert variant={this.state.alertVar} onClose={() => this.setState({showAlert:false})} dismissible>
                        <p>{this.state.alertMsg}</p></Alert>
                    </div>
                )}

            </div>
        );
    }
}

const mapStateToProps = store => ({
    getRegisterData: Actions.getRegisterData(store),
});

const mapDispatchToProps = {onRegister: Actions.register};

export default connect(mapStateToProps,mapDispatchToProps)(Register);