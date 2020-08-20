import React from "react";
import {View, Text, TouchableOpacity} from "react-native";

class StatsBar extends React.Component{
    render(){
        return(
            <View style={[styles.statsBarHolder, {backgroundColor:"yellow"}]}>
            {/* // <View style={[styles.statsBarHolder, {backgroundColor:{this.props.barBackgroundColor}}]}> */}
                <Text style={styles.barTitle}>Savings</Text>
                <Text style={styles.barAmount}>RM24583.00</Text>
            </View>
        )
    }
}

const styles = {
    statsBarHolder:{
        width:350,
        height:85,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.5)",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 30,
        marginTop: 10,
        shadowOpacity:1,
        shadowColor: "rgba(0,0,0,0.3)",
        shadowRadius:3,
        shadowOffset:{
            height: 3,
        },
    },
    
    barTitle : {
        fontSize: 20,
        color: "#4F4F4F"
    },

    barAmount : {
        fontSize: 20,
        marginTop:5,
        fontWeight: "bold",
    },
}

export default StatsBar;