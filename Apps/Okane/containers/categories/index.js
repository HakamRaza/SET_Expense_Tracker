import React from "react";
import {FlatList, ScrollView, View, Text, StyleSheet, TouchableOpacity,TouchableWithoutFeedback,Alert, Modal} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import MonthPicker from 'react-native-month-year-picker';
import LinearGradient from 'react-native-linear-gradient';
import { VictoryPie} from 'victory-native';

import BudgetBarCategories from "components/budgetBar@categories";
import ValueInputField from "components/valueInput";
import SubmitButton from "components/submit";
import ColorBox from "components/colorOptionsBox";
import DropDownPicker from "react-native-dropdown-picker";
import { SwipeListView } from 'react-native-swipe-list-view';

import {connect} from "react-redux";
import Actions from "actions";

// const data = [
//     { x: 1, y: 16.7 ,label: "Food"},
//     { x: 2, y: 7.3 , label: "Food"}
//   ];

class Categories extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            modalVisible: false, 
            editModalVisible: false, 
            selectedMonthYear:  moment().format("MMM YYYY"),
            show:false,
            date: new Date(),
            category_title: "",
            budget: "",
            selectedColor: "",
            month:8,
            year: 2020,
            AllBarsData: []
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }

    setEditModalVisible = (visible) => {
        this.setState({ editModalVisible: visible });
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

    onEditCatDonePressed(){
        const data = {
            category_title:this.state.category_title,
            budget:this.state.budget,
            color: this.state.selectedColor
        };
        // console.log("this is new category ",data);
        this.props.onUpdateCategory(data);
    }

    onDeleteCategoryPressed(id){
        console.log(this.state.taskList.id);
        this.props.onDeleteCategory(id);
    }

    componentDidMount(){
        const data ={ 
            month: this.state.month,
            year: this.state.year
        }
        this.props.onGetBars(data);
        this.props.onGetPie(data);
    }

    componentDidUpdate(prevProps){
        const {getGetPieData, getNewCategoryData, getGetBarsData, getDeleteCategoryData} = this.props;
        
        if (prevProps.getNewCategoryData.isLoading && !getNewCategoryData.isLoading) {
            // console.log("prevProps", prevProps.getNewCategoryData.isLoading);
            // console.log("latest props", getNewCategoryData.isLoading);
            console.log("this is new cat", getNewCategoryData.data);
            if(Object.keys(getNewCategoryData.data).length !== 0 &&
            getNewCategoryData.data !== null) {
                const data ={ 
                    month: this.state.month,
                    year: this.state.year
                }
                this.props.onGetBars(data);
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
            this.setState({AllBarsData:getGetBarsData.data.barsData}, 
                () => {
                    console.log("this is AllBarsData @ container", this.state.AllBarsData);
                }
            );
            console.log("this is getGetBarsData @ container", getGetBarsData.data.barsData);   
            // console.log("this is AllBarsData @ container", this.state.AllBarsData);   
        }

        if (prevProps.getGetPieData.isLoading && !getGetPieData.isLoading) {
            // console.log("prevProps", prevProps.getGetPieData.isLoading);
            // console.log("latest props", getGetPieData.isLoading);
            this.setState({getPieData:getGetPieData});
            console.log("this is getPieData @ container", getGetPieData.data.pieData);  
        }
        console.log("testing", this.props.getGetBarsData.data.totalExpenses)

        // if(prevProps.getDeleteCategoryData.isLoading && !getDeleteCategoryData.isLoading){
        //     //     this.setState({ refreshing: false})
        //     //    console.log("dash updagte", getDeleteCategoryData.data[0])
        //     if(getDeleteCategoryData.data.status === "success"){
        //         Alert.alert("Success", "Your Task has been deleted", [
        //             {
        //                 text:'To Dash',
        //                 onPress:() => this.props.navigation.navigate("BottomTab"),
        //             },
        //             ]
        //         );
        //     }
        // }
    }

    render(){

        const { modalVisible, editModalVisible } = this.state;

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
                    <Text style={{fontWeight:"bold", fontSize: 20, marginVertical:10}}>
                        Monthly Expenses Breakdown
                    </Text>
                    <VictoryPie
                        width={300}
                        height={300}
                        colorScale={this.props.getGetPieData.data.colorData}
                        data={this.props.getGetPieData.data.pieData}    
                    />
                </View>
                {(this.props.getGetBarsData.data.totalBudget && this.props.getGetBarsData.data.totalExpenses) && (
                    <BudgetBarCategories 
                        barTitle="Total Budget"
                        balance={this.props.getGetBarsData.data.totalBudget-this.props.getGetBarsData.data.totalExpenses} 
                        // barBackgroundColor="#f5fcff"
                        AccExpenses={this.props.getGetBarsData.data.totalExpenses}
                        budget={this.props.getGetBarsData.data.totalBudget}
                        percentage={(this.props.getGetBarsData.data.totalExpenses/this.props.getGetBarsData.data.totalBudget)*350}
                    />
                )}
                
                <SwipeListView
                    data={this.state.AllBarsData}
                    onPress={()=> item.id}
                    renderItem = {({item}) =>(
                    
                        <TouchableOpacity onPress={() => {this.setEditModalVisible(true), }}>
                            <BudgetBarCategories 
                                barTitle={item.title}
                                balance={item.budget-item.totalExpense}
                                barBackgroundColor={item.color}
                                AccExpenses={item.totalExpense}
                                budget={item.budget}
                                percentage={(item.totalExpense/item.budget)*350}
                                // percentage={(350.75/300) * 350}
                            />
                        </TouchableOpacity>
                    
                    )}
                    renderHiddenItem={ ({item}) => (
                        <View style={styles.rowBack}>
                        <TouchableOpacity
                                style={styles.backLeftBtn}
                                onPress= {()=> this.onDeleteCategoryPressed(item.id)}>
                                <Text style={{fontWeight:"bold"}}>Delete</Text>
                        </TouchableOpacity>
                        </View>
                    )}

                    leftOpenValue={75}
                    stopLeftSwipe={80}

                    numColumns={1}
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
                            <View style={{flexDirection: "row" ,marginBottom: 10}}>
                                    <TouchableOpacity onPress={() => {this.setState({selectedColor:"#33FFFF"}); console.log("color here")}}>
                                        <ColorBox color="#33FFFF" selected={this.state.selectedColor} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {this.setState({selectedColor:"#FF66CC" })}}>
                                        <ColorBox color="#FF66CC" selected={this.state.selectedColor}/>
                                        {/* <ColorBox color="#F4A261" selected={this.state.selectedColor==="#F4A261"? true: false}/> */}
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {this.setState({selectedColor:"#F3E6E3" })}}>
                                        <ColorBox color="#F3E6E3" selected={this.state.selectedColor}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {this.setState({selectedColor:"#66FF99" })}}>
                                        <ColorBox color="#66FF99" selected={this.state.selectedColor}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {this.setState({selectedColor:"#33CCFF" })}}>
                                        <ColorBox color="#33CCFF" selected={this.state.selectedColor}/>     
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editModalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView} >
                        <View style={styles.modalView}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Edit Category</Text>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.setEditModalVisible(!editModalVisible);
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
                        
                            inputPlaceHolder={this.props.onPress.title}
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
                            <View style={{ backgroundColor:"red"}}>
                                <View style={{flexDirection: "row" , marginBottom: 10 }}>
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
                                <View style={{flexDirection: "row", marginBottom: 10 }}>
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
                                <View style={{flexDirection: "row" ,marginBottom: 10}}>
                                    <TouchableOpacity onPress={() => {this.setState({selectedColor:"#FFC1F3"}); console.log("color here")}}>
                                        <ColorBox color="#FFC1F3" selected={this.state.selectedColor} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {this.setState({selectedColor:"#CFFFFE" })}}>
                                        <ColorBox color="#CFFFFE" selected={this.state.selectedColor}/>
                                        {/* <ColorBox color="#F4A261" selected={this.state.selectedColor==="#F4A261"? true: false}/> */}
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {this.setState({selectedColor:"#F3E6E3" })}}>
                                        <ColorBox color="#F3E6E3" selected={this.state.selectedColor}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {this.setState({selectedColor:"#FBE2E5" })}}>
                                        <ColorBox color="#FBE2E5" selected={this.state.selectedColor}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {this.setState({selectedColor:"#DBE3E5" })}}>
                                        <ColorBox color="#DBE3E5" selected={this.state.selectedColor}/>     
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <SubmitButton
                                buttonTitle="Done"
                                submitButtonText="Done"
                                color="rgb(45, 156, 219)"
                                navigate = {()=>this.onNewCatDonePressed()}
                            />

                            <SubmitButton
                                buttonTitle="Delete"
                                submitButtonText="Delete"
                                color="#FF0000"
                                navigate = {()=>this.onEditCatDeletePressed()}
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

    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
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

    rowBack:{
        width: "100%",
        height:"100%",
        borderRadius: 5,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        position: "absolute",
        zIndex:-1,
    },

    backLeftBtn: {
        alignItems: 'flex-start',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 85,
        paddingLeft: 20,
        backgroundColor: "crimson",
        borderWidth:1
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
        height:"90%",
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
    getGetPieData: Actions.getGetPieData(store),
    getNewCategoryData: Actions.getNewCategoryData(store),
    getGetBarsData: Actions.getGetBarsData(store),
    getDeleteCateoryData: Actions.getDeleteCategoryData(store)
});

const mapDispatchToProps = {
    onGetPie: Actions.getPie,
    onGetBars: Actions.getBars,
    onNewCategory: Actions.newCategory,
    onDeleteCategory: Actions.deleteCategory 
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);  