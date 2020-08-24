import React from "react";
import {View, Text, TouchableOpacity} from "react-native";

class BudgetBarOverview extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={[styles.budgetBarOverviewHolder, {backgroundColor:"lime"}]}>
            {/* // <View style={[styles.BudgetBarOverviewHolder, {backgroundColor:{this.props.barBackgroundColor}}]}> */}
                <View style={styles.barContentUpper}>
                    <Text style={styles.barTitleLeft}>{this.props.barTitle}</Text>
                    <Text style={styles.barTitleRight}>RM{this.props.barAmountLeft}left</Text>
                </View>
                <Text style={styles.barAmount}>RM{this.props.AccExpenses} of RM{this.props.budget}</Text>
            </View>
        )
    }
}

const styles = {
    budgetBarOverviewHolder:{
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

    barContentUpper:{
        width:"100%",
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: "center",
    },
    
    barTitleLeft : {
        fontSize: 20,
        color: "#4F4F4F"
    },

    barTitleRight : {
        fontSize: 20,
    },

    

    barAmount : {
        fontSize: 20,
        marginTop:5,
        fontWeight: "bold",
    },
}

export default BudgetBarOverview;