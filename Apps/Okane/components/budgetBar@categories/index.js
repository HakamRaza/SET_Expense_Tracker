import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

class BudgetBarCategories extends React.Component{
    constructor(props){
        super(props);
    }

    

    render(){
        return(
            <View style={[styles.contentHolder, {backgroundColor:this.props.barBackgroundColor}]}>
                <View style={styles.barContentUpper}>
                    <Text style={styles.barTitleLeft}>{this.props.barTitle}</Text>
                    <Text style={{color:this.props.balance<0? "red": "black", fontSize:20}}>RM {this.props.balance.toFixed(2)} left</Text>
                </View>
                <View style= {styles.percentageBarHolder}>
                    <View 
                        style={[styles.percentageBar,
                                {backgroundColor: this.props.AccExpenses>this.props.budget?"red":"#33FF66",
                                 width: this.props.percentage}
                                ]}>
                    {/* <View style={[styles.percentageBar,{width: this.props.percentage}]}> */}
                    </View>
                    <Text style={styles.barAmount}>RM{this.props.AccExpenses.toFixed(2)} of RM{this.props.budget.toFixed(2)}</Text>
                    
                </View>
            </View>
        )
    }
}

const styles = {

    contentHolder:{
        width: "100%",
        height: 110,    
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.5)",
        alignItems:"center"
    },

    barContentUpper:{
        width:"100%",
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: "center",
        paddingTop: 10,
        paddingHorizontal: 20
    },

    percentageBarHolder:{
        width: 350,
        overflow:"hidden",
        height: 50,
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

    barTitleLeft : {
        fontSize: 20,
        fontWeight: "bold",
    },

    barTitleRight : {
        fontSize: 20,
    },

    

    barAmount : {
        fontSize: 20,
    },

    percentageBar:{
        position: "absolute",
        zIndex:-2,
        height: 50,
        backgroundColor:"lime"
    }
}


export default BudgetBarCategories;