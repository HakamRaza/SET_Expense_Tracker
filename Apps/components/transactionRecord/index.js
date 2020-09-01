import React from "react";
import {View, Text, ScrollView, TouchableOpacity} from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';

class TransactionRecord extends React.Component{
    render(){
        return(
                <View style={{backgroundColor:"white",height: 80, flexDirection: "row",justifyContent:"flex-start", borderWidth:0.5, 
                borderColor: "grey",}}>
                    <View style={{backgroundColor: this.props.color, width: 10, borderWidth:1, borderColor:"grey"}}></View>
                    <View style={{ flex:1, flexDirection:'row', alignItems:"center", justifyContent:'space-between', paddingHorizontal:10}}>
                        <View>
                        <Text style={styles.textUpperSec}>{this.props.itemName}</Text>
                        <Text>Category: {this.props.category}</Text>
                        </View>
                        <View>
                        <Text style={styles.textUpperSec}>-RM{parseFloat(this.props.itemPrice).toFixed(2)}</Text>
                        <Text style={styles.textBottomSec}>{this.props.dateCreated}</Text>
                        </View>
                    </View>

                   
                    
                </View>
        )
    }
}

const styles = {

    upperContent:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft:10,
        width:"80%",
    }, 

    bottomContent:{
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft:10,
    }, 
    
    textUpperSec:{
        fontSize: 18,
        fontWeight: "bold"
    },

    textBottomSec: {
        fontSize: 14,
        textAlign:'right'
    },



}

export default TransactionRecord;