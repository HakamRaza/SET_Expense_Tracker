import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ActivityIndicator, } from "react-native";

class SubmitButton extends React.Component{
    render(){
        return (
            <TouchableOpacity
                style={styles.submitButton}
                onPress={this.props.navigate}
                disabled={this.props.loading}
            >

            {this.props.loading?
            (<ActivityIndicator size="small" color="rgb(0, 150, 0)" />
            ):(<Text style={{fontWeight:"bold", color: "white"}}>{this.props.submitButtonText}</Text>
            )}
            </TouchableOpacity>
        )
    }
}

const styles =StyleSheet.create({
    submitButton: {
        width: 250,
        paddingVertical: 15,
        justifyContent:"center",
        alignItems: "center",
        fontWeight: "bold",
        backgroundColor: "rgb(45, 156, 219)",
        paddingVertical: 15,
        marginVertical:10,
        borderRadius:25,
        shadowOpacity:1,
        shadowColor: "rgba(0,0,0,0.3)",
        shadowRadius:3,
        shadowOffset:{
            height: 3,
        },
    }
})

export default SubmitButton;