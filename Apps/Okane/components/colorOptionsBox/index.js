import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from "react-native";

class ColorBox extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={[styles.colorBox, {backgroundColor:this.props.color, borderColor: this.props.selected===this.props.color? "green": "black"}]}>
                <Text>{this.props.selected===this.props.color? "A" : "B" }</Text>
                </View>
            // <View ></View>
        )
    }
}

const styles ={ 
    colorBox: {
        width: 35,
        height: 35,
        borderWidth: 5,
        marginLeft:15
    }
};

export default ColorBox;