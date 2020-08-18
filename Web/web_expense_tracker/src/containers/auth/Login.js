import React from 'react';
import './auth.css';
import { IoIosMail, IoMdKey} from "react-icons/io";
import { IconContext } from "react-icons";

class Login extends React.Component{
    constructor(){
        super();

        this.state={
            email:"",
            password:"",
        }
    }

    render(){
        return(
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
                                <input type = "password" placeholder ="Password" id="pass" onChange = {(password) => this.setState({password: password.target.value})}></input>
                            </div>
                        </div>
                        <button className="auth-button">Submit</button>
                    </div>

                </div>
        </div>
        );
    }
}

export default Login;