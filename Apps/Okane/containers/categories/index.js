import React from "react";
import {ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import { VictoryPie} from 'victory-native';

import BudgetBarCategories from "components/budgetBar@categories";

const data = [
    { x: 1, y: 16.7 ,label: "Food"},
    { x: 2, y: 7.3 , label: "Food"}
  ];

class Categories extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            modalVisible: false, 
            selectedMonth:  moment().format("MMM YYYY"),
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }

    render(){

        const { modalVisible } = this.state;

        return(
            <View>
                <View>
                    <TouchableOpacity style={styles.monthYearPickerHolder}
                                // onPress={()=>this.setState({show:true})}
                                onPress={()=>this.setState({show:true})}
                            >
                        <Text style={{fontSize:18}}>{this.state.selectedMonth}</Text>
                    </TouchableOpacity>
                </View> 

            <ScrollView>
                <View style={styles.container}>
                    <VictoryPie
                    width={300}
                    height={300}
                    colorScale={["tomato", "orange",  ]}
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

            </ScrollView>
                <TouchableOpacity style={styles.addButton}>

                    <Ionicons 
                    name={"ios-add-circle-outline"} 
                    size={25} 
                    color={"white"}
                    />

                </TouchableOpacity> 
            </View>
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

    monthYearPickerHolder:{
        borderWidth:0.5, 
        borderColor:"black",
        height:50,
        width: "100%",
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center"

    },


    addButton: {
        position: "absolute",
        bottom: 50,
        left: 315,
        zIndex: 3,
        backgroundColor: "rgb(0,163,255)",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems:"center"
  
      }
  });

export default Categories;  