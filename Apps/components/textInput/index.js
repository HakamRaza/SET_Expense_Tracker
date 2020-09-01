import React from "react";
import {View , Image, Text, TextInput, StyleSheet, TouchableOpacity, TextInputComponent} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const images = { 
    eye_open: require("assets/images/eye.svg"),               
    eye_off: require("assets/images/eye-off.svg"),               
}

class TextInputField extends React.Component{
    constructor(props){
        super(props);
        this.state={
            viewPassword:true,
        };
    }
    
    render(){
        return(
            
            <View>
                {/* <Text style={styles.title}>{this.props.inputTitle}</Text> */}
                <TextInput
                placeholder={this.props.inputPlaceHolder}
                style={styles.formInput}
                keyboardType={this.props.inputType || "default"}
                secureTextEntry={this.props.inputSecure && this.state.viewPassword}
                onChangeText={this.props.abc}
                />
    
                {this.props.showHide && (
                    <TouchableOpacity
                    onPress={()=> this.setState({viewPassword: !this.state.viewPassword})}
                    style={{flexDirection:"row", marginLeft:20}}
                    >
                        <FontAwesome name={this.state.viewPassword? "eye":"eye-slash"} size={15}  />
                        <Text style={{marginLeft:10}}>{this.state.viewPassword? "Show":"Hide"}</Text>
                    </TouchableOpacity>
                )}
            </View>
            //this is testing
        );
    }
}

const styles = StyleSheet.create({
    formInput:{
        width: 250,
        height: 50,
        paddingHorizontal: 30,
        marginVertical:15,
        borderColor: "black",
        borderWidth:1,
        borderRadius: 25,
        overflow: "hidden",
        shadowOpacity:0.2,
        // shadowColor: "black",
        shadowRadius:5,
        shadowOffset:{
            height: 2,
            width:2
        },
    },

    
})

export default TextInputField;