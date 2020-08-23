import React from 'react';
import './auth.css';
import Header from 'components/header';
import { IoIosMail, IoMdKey, IoIosEye, IoIosEyeOff} from "react-icons/io";
import { IconContext } from "react-icons";

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
                                <div className="auth-form">
                                    <label htmlFor="email">Email :</label>
                                    <IconContext.Provider value={{ className: 'auth-icons' }}><IoIosMail /></IconContext.Provider>
                                    <input type = "text" placeholder ="Email" id="email" onChange={(email)=> this.setState({email: email.target.value})}></input>
                                </div>

                                <div className="auth-form">
                                    <label htmlFor="pass">Password :</label>
                                    <IconContext.Provider value={{ className: 'auth-icons' }}><IoMdKey /></IconContext.Provider>

                                    <input type = {this.state.showPass ? "text" : "password"} value={this.state.password} placeholder ="Password" id="pass" onChange = {(password) => this.setState({password: password.target.value})}></input>
                                 
                                    <IconContext.Provider value={{ className: 'auth-icons-pass' }}>
                                        {this.state.showPass ? (
                                        <IoIosEye onClick={()=>{this.setState({showPass : !this.state.showPass})}}/>
                                        ):(
                                        <IoIosEyeOff onClick={()=>{this.setState({showPass : !this.state.showPass})}}/>
                                        )}</IconContext.Provider>
                                </div>
                            </div>
                            <button className="auth-button" onClick={()=>(this._submitLogin())}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;