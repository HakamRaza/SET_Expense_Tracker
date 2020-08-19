import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView, ImageBackground} from "react-native";

import SubmitButton from "components/submit";
import TextInputField from "components/textInput";

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

    loginButtonPressed(){
        this.props.navigation.navigate("Overview")
    }

    registerButtonPressed(){
        this.setState({ showLoginForm: false});
    }
    
    registerPageButtonPressed(){
        this.setState({ showLoginForm: true});
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
                            abc={(password)=>this.setState({password})}
                            showHide="true"
                        />
                        <View style={{marginTop: 13}}>
                            <SubmitButton
                                buttonTitle="Register"
                                submitButtonText="Register"
                                navigate = {()=>this.registerPageButtonPressed()}
                            />
                        </View>

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

export default Auth;