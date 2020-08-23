import React from "react";
import {View, Text} from "react-native";

class TransactionRecord extends React.Component{
    render(){
        return(
                <View style={{backgroundColor:"white",height: 80, flexDirection: "row",justifyContent:"flex-start", borderWidth:0.5, 
                borderColor: "grey",}}>
                    <View style={{backgroundColor: "orange", width: 10}}></View>
                    <View style={{flexDirection:"column", justifyContent:"space-evenly"}}>
                        <View style={styles.upperContent}> 
                            <Text style={styles.textUpperSec}>{this.props.itemName}</Text>
                            <Text style={styles.textUpperSec}>-RM{this.props.itemPrice}</Text>
                        </View>
                        <View style={styles.bottomContent}>
                            <Text style={styles.textBottomSec}>Category: {this.props.category}</Text>
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
        paddingHorizontal:10,
        width:"80%",
    }, 

    bottomContent:{
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal:10,
    }, 
    
    textUpperSec:{
        fontSize: 18,
        fontWeight: "bold"
    },

    textBottomSec: {
        fontSize: 14,
    }

}

export default TransactionRecord;