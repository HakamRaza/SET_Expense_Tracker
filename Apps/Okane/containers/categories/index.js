import React from "react";
import {ScrollView, View, Text, StyleSheet, TouchableOpacity,Alert, Modal} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import MonthPicker from 'react-native-month-year-picker';

import { VictoryPie} from 'victory-native';

import BudgetBarCategories from "components/budgetBar@categories";
import ValueInputField from "components/valueInput";
import SubmitButton from "components/submit";
import ColorBox from "components/colorOptionsBox";
import DropDownPicker from "react-native-dropdown-picker";

import {connect} from "react-redux";
import Actions from "actions";

const data = [
    { x: 1, y: 16.7 ,label: "Food"},
    { x: 2, y: 7.3 , label: "Food"}
  ];

class Categories extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            modalVisible: false, 
            selectedMonthYear:  moment().format("MMM YYYY"),
            show:false,
            date: new Date(),
            category_title: "",
            budget: "",
            selectedColor: "",
            month:8,
            year: 2020,
            getBarsData: []
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }

    onNewCatDonePressed(){
        const data = {
            category_title:this.state.category_title,
            budget:this.state.budget,
            color: this.state.selectedColor
        };
        // console.log("this is new category ",data);
        this.props.onNewCategory(data);
    }

    componentDidMount(){
        const data ={ 
            month: this.state.month,
            year: this.state.year
        }
        this.props.onGetBars(data);
    }

    componentDidUpdate(prevProps){
        const {getNewCategoryData, getGetBarsData} = this.props;
        
        if (prevProps.getNewCategoryData.isLoading && !getNewCategoryData.isLoading) {
            // console.log("prevProps", prevProps.getNewCategoryData.isLoading);
            // console.log("latest props", getNewCategoryData.isLoading);
            console.log("this is new cat", getNewCategoryData.data);
            if(Object.keys(getNewCategoryData.data).length !== 0 &&
            getNewCategoryData.data !== null) {
                Alert.alert("Success", "New Category has been created", [
                    {
                        text:'To Categories',
                        // onPress:() => this.setModalVisible(!modalVisible),
                    },
                ]
                );
                
            } else if(getNewCategoryData.error !== null) { 
                Alert.alert("Failed", "Please fill in all the fields")
            }
        }

        if (prevProps.getGetBarsData.isLoading && !getGetBarsData.isLoading) {
            // console.log("prevProps", prevProps.getGetBarsData.isLoading);
            // console.log("latest props", getGetBarsData.isLoading);
            this.setState({getBarsData:getGetBarsData});
            console.log("this is getBarsData @ container", getGetBarsData);  
        }
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
                        <Text style={{fontSize:18}}>{this.state.selectedMonthYear}</Text>
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
                <View style={{height:100}}></View>
            </ScrollView>
                <TouchableOpacity style={styles.addButton} onPress={() => {this.setModalVisible(true)}}>

                    <Ionicons 
                    name={"ios-add-circle-outline"} 
                    size={36} 
                    color={"white"}
                    />

                </TouchableOpacity> 
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView} >
                        <View style={styles.modalView}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>New Category</Text>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(!modalVisible);
                                        console.log("close-cross");
                                    }}
                                    >
                                    <Ionicons 
                                    name={"ios-close"} 
                                    size={40} 
                                    color={"rgb(0,163,255)"}
                                    style={styles.closeButton}
                                
                                    />
                                </TouchableOpacity>
                            </View>
                            <ValueInputField
                            inputTitle="Name"
                            inputPlaceHolder="Something"
                            inputType="default"
                            abc={(category_title)=>this.setState({category_title})}
                            />
                            <ValueInputField
                            inputTitle="Budget Allocation"
                            inputPlaceHolder="0.00"
                            inputType="numeric"
                            abc={(budget)=>this.setState({budget})}
                            />

                            <Text>Color</Text>

                            <View style={{flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => {this.setState({selectedColor:"#F1D302"}); console.log("color here")}}>
                                    <ColorBox color="#F1D302" selected={this.state.selectedColor} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {this.setState({selectedColor:"#F4A261" })}}>
                                    <ColorBox color="#F4A261" selected={this.state.selectedColor}/>
                                    {/* <ColorBox color="#F4A261" selected={this.state.selectedColor==="#F4A261"? true: false}/> */}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {this.setState({selectedColor:"#EA526F" })}}>
                                    <ColorBox color="#EA526F" selected={this.state.selectedColor}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {this.setState({selectedColor:"#AAFCB8" })}}>
                                    <ColorBox color="#AAFCB8" selected={this.state.selectedColor}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {this.setState({selectedColor:"#53D8FB" })}}>
                                    <ColorBox color="#53D8FB" selected={this.state.selectedColor}/>     
                                </TouchableOpacity>
                            </View>

                            <SubmitButton
                                buttonTitle="Done"
                                submitButtonText="Done"
                                navigate = {()=>this.onNewCatDonePressed()}
                            />
                        </View>
                    </View>
                </Modal>
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
        bottom: 70,
        left: 315,
        zIndex: 3,
        backgroundColor: "rgb(0,163,255)",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems:"center"
  
      },

    modalHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent:"space-between"
    },
    
    modalTitle:{
        fontSize:25,
        fontWeight: "bold",
        marginBottom:15
    },
    
    closeButton: {
        position: "absolute",
        top: -5,
        right:10,
    },

    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "rgba(0,0,0,0.5)"
      },
      modalView: {
        width:"100%",
        height:"80%",
      //   height:450,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
  });

const mapStateToProps = (store) => ({
    getNewCategoryData: Actions.getNewCategoryData(store),
    getGetBarsData: Actions.getGetBarsData(store),
    
});

const mapDispatchToProps = {
    onNewCategory: Actions.newCategory,
    onGetBars: Actions.getBars,
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);  