import React from 'react';
import './auth.css';
import Header from 'components/header';
import Actions from '../../actions';
import { connect } from "react-redux";

import { IoIosMail, IoMdKey, IoIosEye, IoIosEyeOff} from "react-icons/io";
import { IconContext } from "react-icons";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state={
            email:"",
            password:"",
            showPass:false,
            showAlert:false,
            alertMsg:"",
            alertVar:"",
            onLoading:false,
            buttonValid:true,

        }
    }
    
    componentDidMount(){
        // Actions.resetUserSession();

        const {getUserSession} = this.props;

        if( Object.keys(getUserSession.data).length !== 0){
            
            this.props.history.push("/dashboard");
        }
    }

    componentDidUpdate(prevProps){
        const { getLoginData } = this.props;
        
        if(prevProps.getLoginData.isLoading && !getLoginData.isLoading){
            this.setState({onLoading:false});
            
            if(getLoginData.data.status === "success") {
                this.props.history.push("/dashboard");
                
            } else if (getLoginData.error !== null){
                this.setState({
                    showAlert: true,
                    alertMsg: getLoginData.error.error,
                    alertVar:"danger",
                });
                
                // this.props.history.push("/login");
            }
        }
    }

    _checkFormValidity(){
        var mail = document.getElementById('formBasicEmail').validity.valid;
        var pass = document.getElementById('formBasicPassword').validity.valid;
        var valid = mail && pass;
        
        this.setState({buttonValid: !valid});
        // console.log("form status", mail, pass);
        // console.log("sum", mail && pass);
    }

    _submitLogin(){
        const {email, password} = this.state;

        if(email !=="" && password !==""){
            const formData = {
                email,
                password,
            }

            this.props.onLogin(formData);
            this.setState({onLoading:true});

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
                    <div className="auth-card">
                        <p>Login Into Your Dashboard</p>

                        <div className="auth-bgp">
                            <div>
                            <Form onChange={()=>(this._checkFormValidity())}>
                                    <fieldset disabled={this.state.onLoading}>
                                        <div className="auth-input">
                                            <Form.Group controlId="formBasicEmail">
                                                <IconContext.Provider value={{ className: 'auth-icons' }}><IoIosMail /></IconContext.Provider>
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control required style={{fontSize:"0.8em", paddingLeft:36}} type="email" placeholder="Enter email" onChange={(email)=> this.setState({email: email.target.value})}/>
                                            </Form.Group>
                                        </div>

                                        <div className="auth-input">
                                            <Form.Group controlId="formBasicPassword">
                                                <IconContext.Provider value={{ className: 'auth-icons' }}><IoMdKey /></IconContext.Provider>
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control required style={{fontSize:"0.8em", paddingLeft:36}} type={this.state.showPass? "text" : "password"} placeholder="Password" pattern=".{6,}" onChange = {(password) => this.setState({password: password.target.value})}/>
                                            </Form.Group>

                                            <div>
                                                <IconContext.Provider value={{ className: 'auth-icons-pass' }}>
                                                    {this.state.showPass ? (<IoIosEye onClick={()=>{this.setState({showPass : !this.state.showPass})}}/>):(<IoIosEyeOff onClick={()=>{this.setState({showPass : !this.state.showPass})}}/>
                                                )}</IconContext.Provider>
                                            </div>
                                        </div>

                                        {this.state.onLoading ? (<span><Spinner animation="border" size="sm"/> Login ...</span>): (<Button variant="primary" disabled={this.state.buttonValid} onClick={()=>(this._submitLogin())}>Submit</Button>)}
                                    </fieldset>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.showAlert && (
                    <Alert variant={this.state.alertVar} onClose={() => this.setState({showAlert:false})} dismissible>
                    <p>{this.state.alertMsg}</p></Alert>
                )}

            </div>
        );
    }
}

const mapStateToProps = store => ({
    getUserSession: Actions.getUserSession(store),
    getLoginData: Actions.getLoginData(store),
});
const mapDispatchToProps = {onLogin: Actions.login};

export default connect(mapStateToProps,mapDispatchToProps)(Login);