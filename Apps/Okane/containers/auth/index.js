import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView, ImageBackground} from "react-native";

import SubmitButton from "components/submit";
import TextInputField from "components/textInput";

import {connect} from 'react-redux';
import Actions from "actions";

const images = { 
    header_auth: require("assets/images/Head.png"),
}

class Auth extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showLoginForm: true,
        }
    }

    componentDidMount(){
        // this.ref.current.animateNextTransition; 
        // console.log("DID MOUNT ", this.props.getUserSession);
        const {getUserSession} = this.props;
        if (Object.keys(getUserSession.data).length !== 0) {
          this.props.navigation.navigate("Overview");
        }
      }

    componentDidUpdate(prevProps){
        const {getLoginData, getRegisterData} = this.props;
        // console.log("login componenetDidUpdate", getLoginData);
              //true                                //false
        if (prevProps.getLoginData.isLoading && !getLoginData.isLoading) {
        //   console.log("prevProps", prevProps.getLoginData.isLoading);
        //   console.log("latest props", getLoginData.isLoading);
          this.setState({loading: false});
  
          if(Object.keys(getLoginData.data).length !== 0 &&
            getLoginData.data !== null) {
            // console.log("TOKEN is ", getLoginData.data);
            Alert.alert("Success", "Login successful", [
              {
                text:'To Overview',
                onPress:() => this.props.navigation.navigate("Overview"),
              },
            ]
            );
  
        } else if(getLoginData.error !== null) { 
          Alert.alert("Failed", "Login Failed")
          }
        }
  
        if (prevProps.getRegisterData.isLoading && !getRegisterData.isLoading) {
          console.log("prevProps", prevProps.getRegisterData.isLoading);
          console.log("latest props", getRegisterData.isLoading);
          this.setState({loading: false});
  
          if(Object.keys(getRegisterData.data).length !== 0 &&
            getLoginData.data !== null) {
            Alert.alert("Success", "Your Account is created", [
              {
                text:'To Log In',
                onPress:this.setState({ showLoginForm: true}),
              },
            ]
            
            );
  
        } else if(getRegisterData.error !== null) { 
          Alert.alert("Failed", "Please In All the necessary field")
          }
        }
      }

    loginButtonPressed(){
        // this.props.navigation.navigate("Overview");
        this.setState({loading:true});
        const data = {
            email:this.state.email,
            password:this.state.password,
            password_confirmation: this.state.password_confirmation
        };
        console.log("this is login", data);
        this.props.onLogin(data);

    }

    registerButtonPressed(){
        this.setState({ showLoginForm: false});
    }
    
    registerPageButtonPressed(){
        // this.setState({ showLoginForm: true, loading:true});
        const data = {
            email:this.state.email,
            password:this.state.password,
            password_confirmation: this.state.password_confirmation
        };
        // this.setState({loading:true});
        this.props.onRegister(data);

    }


    render() {
        return(
            <View>
                <ImageBackground source={images.header_auth} style={styles.headerAuth}>
                </ImageBackground>
            <View style={{marginTop: 180, height: "80%"}}>
                {this.state.showLoginForm ? 
                (
                    <View style={styles.centerView}>

                        <TextInputField
                            inputTitle="Email"
                            inputPlaceHolder="Your email"
                            inputType="default"
                            abc={(email)=>this.setState({email})}
                        />
    
                        <TextInputField
                            inputTitle="Password"
                            inputPlaceHolder="Your Password"
                            inputType="default"
                            inputSecure={true}
                            abc={(password)=>this.setState({password})}
                            showHide="true"
                        />
                        <View style={{marginTop: 50}}>
                            <SubmitButton
                                buttonTitle="Log In"
                                submitButtonText="Log In"
                                navigate = {()=>this.loginButtonPressed()}
                            />

                            <SubmitButton
                                loading={this.state.loading}
                                buttonTitle="Register"
                                submitButtonText="Register"
                                navigate={()=> this.registerButtonPressed()}
                            />
                        </View>

                    </View>

                ):(
                    <View style={styles.centerView}>

                        <TextInputField
                            inputTitle="Email"
                            inputPlaceHolder="Your email"
                            inputType="default"
                            abc={(email)=>this.setState({email})}
                        />

                        <TextInputField
                            inputTitle="Password"
                            inputPlaceHolder="Your Password"
                            inputType="default"
                            inputSecure={true}
                            abc={(password)=>this.setState({password})}
                            showHide="true"
                        />

                        <TextInputField
                            inputTitle="Confirm Password"
                            inputPlaceHolder="Your Confirm Password"
                            inputType="default"
                            inputSecure={true}
                            abc={(password_confirmation)=>this.setState({password_confirmation})}
                            showHide="true"
                        />
                        <View style={{marginTop: 13}}>
                            <SubmitButton
                                loading={this.state.loading}
                                buttonTitle="Register"
                                submitButtonText="Register"
                                navigate = {()=>this.registerPageButtonPressed()}
                            />
                        </View>

                        <Text><a>Return to Log In</a></Text>

                    </View>
                )}
            </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    headerAuth:{
        flex:1,
        resizeMode:"cover",
        width: "100%",
        marginBottom:5,
        height: 180
    },


    centerView:{
        alignItems: "center",
        paddingVertical: 10,
    },

})

const mapStateToProps = (store) => ({
    getUserSession: Actions.getUserSession(store),
    getLoginData: Actions.getLoginData(store),
    getRegisterData: Actions.getRegisterData(store),
});

const mapDispatchToProps = {
    onLogin: Actions.login,
    onRegister: Actions.register
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);