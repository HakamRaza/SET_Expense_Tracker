import React from "react";
import {ScrollView, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { VictoryPie} from 'victory-native';

import BudgetBarCategories from "components/budgetBar@categories";

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ];

class Categories extends React.Component{
    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Text>This is Categories page</Text>
                    <VictoryPie
                    width={300}
                    height={300}
                    colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                    />
                </View>
                <BudgetBarCategories 
                    barTitle="Total Budget"
                    balance={443.25} 
                    barBackgroundColor="#f5fcff"
                    AccExpenses={456.75}
                    budget={900}
                    percentage={(456.75/900)*350}
                />
                <BudgetBarCategories 
                    barTitle="Food"
                    balance="55.00" 
                    barBackgroundColor="rgb(244,162,97)"
                    AccExpenses={45}
                    budget={100}
                    percentage={0.45*350}
                />
                <BudgetBarCategories 
                    barTitle="Boba Tea"
                    balance={-50.75}
                    barBackgroundColor="rgb(241,211,2)"
                    AccExpenses={350.75}
                    budget={300}
                    percentage={(350.75/300) * 350}
                />

                <TouchableOpacity style={styles.addButton}>

                    <Ionicons 
                    name={"ios-add-circle-outline"} 
                    size={25} 
                    color={"red"}
                    />

                </TouchableOpacity>   

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff"
    },

    addButton: {
        position: "absolute",
        bottom: 50,
        right: 20,
        zIndex: 3,
        backgroundColor: "lime",
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems:"center"
  
      }
  });

export default Categories;  