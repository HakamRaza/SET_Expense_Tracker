import React from "react";
import {View, Text, TouchableOpacity, Alert} from "react-native";
import SubmitButton from "components/submit";

class Settings extends React.Component{

    logoutPressed(){
        // this.props.onResetUserSession();
        Alert.alert("Bye Bye!", "Log Out",[
            {
                text: "Okay",
                onPress: () => this.props.navigation.navigate("Auth"),
            },
        ]);
    }

    render(){
        return(
            <View style={{backgroundColor: "skyblue", flex:1, alignItems:"center", justifyContent:"center"}}>
                <Text>This is Settings page</Text>
                <TouchableOpacity  onPress={()=>this.logoutPressed()}>
                    <SubmitButton
                    buttonTitle="Log Out"
                    submitButtonText="Log Out"
                    // navigate = {()=>this.onNewTransDonePressed()}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

export default Settings;