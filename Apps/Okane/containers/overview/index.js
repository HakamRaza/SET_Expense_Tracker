import React from "react";
import {ScrollView, Text} from "react-native";
import StatsBar from "components/statsBar";
import BudgetBarOverview from "components/budgetBar@overview";

class Overview extends React.Component{
    render(){
        return(
            <ScrollView contentContainerStyle={{alignItems:"center"}} >
            {/* <ScrollView style={{ flex:1, alignItems:"center"}} > */}
                <StatsBar />
                <StatsBar />
                <BudgetBarOverview/>
            </ScrollView>
        )
    }
}

export default Overview;