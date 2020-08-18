import React from 'react';
import './auth.css';


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
                    <div className="auth-bgp"></div>
                    <div className="auth-form">
                        <label htmlFor="email">Email :</label>
                        <input type = "text" placeholder ="Email" id="email" onChange={(email)=> this.setState({email: email.target.value})}></input>
                        
                        <label htmlFor="pass">Password :</label>
                        <input type = "password" placeholder ="Password" id="pass" onChange = {(password) => this.setState({password: password.target.value})}></input>

                        <button>Submit</button>
                    </div>
                </div>
        </div>
        );
    }
}

export default Login;