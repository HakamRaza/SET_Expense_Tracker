import React from 'react';
import './auth.css';
import Header from 'components/header';
import { IoIosMail, IoMdKey, IoIosEyeOff, IoIosEye } from "react-icons/io";
import { IconContext } from "react-icons";

class Login extends React.Component{
    constructor(){
        super();

        this.state={
            email:"",
            password:"",
            password_conf:"",
            showPass:false,
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
    }

    render(){
        return(
            <div>
                <Header/>
                <div className="auth-reg">
                    <div className="auth-card">
                        <p>Register and Unleash Your Potential</p>

                        <div className="auth-bgp-reg">
                            <div>
                                <div className="auth-form">
                                    <label htmlFor="email">Email :</label>
                                    <IconContext.Provider value={{ className: 'auth-icons' }}><IoIosMail /></IconContext.Provider>
                                    <input type = "text" placeholder ="Email" id="email" onChange={(email)=> this.setState({email: email.target.value})}></input>
                                </div>

                                <div className="auth-form">
                                    <label htmlFor="pass">Password :</label>
                                    <IconContext.Provider value={{ className: 'auth-icons' }}><IoMdKey /></IconContext.Provider>
                                    <input type = "password" value={this.state.password} placeholder ="Password" id="pass" onChange = {(password) => this.setState({password: password.target.value})}></input>
                                </div>

                                <div className="auth-form">
                                    <label htmlFor="pass_conf">Password Confirmation :</label>
                                    <br/>
                                    <IconContext.Provider value={{ className: 'auth-icons' }}><IoMdKey /></IconContext.Provider>

                                    <input type ={this.state.showPass? "text":"password"} value={this.state.password_conf} placeholder ="Retype your Password" id="pass_conf" onChange = {(password_conf) => this.setState({password_conf: password_conf.target.value})}></input>

                                    <IconContext.Provider value={{ className: 'auth-icons-pass' }}>
                                        {this.state.showPass ? (
                                        <IoIosEye onClick={()=>{this.setState({showPass : !this.state.showPass})}}/>
                                        ):(
                                        <IoIosEyeOff onClick={()=>{this.setState({showPass : !this.state.showPass})}}/>
                                    )}</IconContext.Provider>
                                     
                                </div>
                            </div>
                            <button className="auth-button" onClick={()=>(this._submitRegister())}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;