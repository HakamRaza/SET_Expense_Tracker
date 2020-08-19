import React from "react";
import {View, Text} from "react-native";

class Transaction extends React.Component{
    render(){
        return(
            <View style={{backgroundColor: "lime", flex:1}}>
                <Text>This is Transaction page</Text>
            </View>
        )
    }
}

export default Transaction;