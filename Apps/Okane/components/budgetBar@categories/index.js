import React from "react";
import {View, Text, TouchableOpacity, Modal, Alert} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ValueInputField from "components/valueInput";
import SubmitButton from "components/submit";
import ColorBox from "components/colorOptionsBox";

import {connect} from "react-redux";
import Actions from "actions";

class BudgetBarCategories extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            editModalVisible: false, 
        }
    }

    setEditModalVisible = (visible) => {
        this.setState({ editModalVisible: visible });
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


    render(){
        const {  editModalVisible } = this.state;
        return(
            <View>
                    {/* <TouchableOpacity onPress={() => this.setEditModalVisible(true)}> */}
                <View style={[styles.contentHolder, {backgroundColor:this.props.barBackgroundColor}]}>
                        <View style={styles.barContentUpper}>
                            <Text style={styles.barTitleLeft}>{this.props.barTitle}</Text>
                            <Text style={{color:this.props.balance<0? "red": "black", fontSize:20}}>$ {this.props.balance.toFixed(2)} left</Text>
                        </View>
                        <View style= {styles.percentageBarHolder}>
                            <View 
                                style={[styles.percentageBar,
                                        {backgroundColor: this.props.AccExpenses>this.props.budget?"red":"#33FF66",
                                        width: this.props.percentage}
                                        ]}>
                            {/* <View style={[styles.percentageBar,{width: this.props.percentage}]}> */}
                            </View>
                            <Text style={styles.barAmount}>$ {this.props.AccExpenses.toFixed(2)} of $ {this.props.budget.toFixed(2)}</Text> 
                        </View>
                </View>
                    {/* </TouchableOpacity> */}
                {/* <Modal
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
                            inputPlaceHolder="Something"
                            inputValue={this.props}
                            inputType="default"
                            abc={(category_title)=>this.setState({category_title})}
                            />
                            <ValueInputField
                            inputTitle="Budget Allocation"
                            inputPlaceHolder="0.00"
                            inputType="numeric"
                            abc={(budget)=>this.setState({budget})}
                            />

                            <View>
                                <Text style={styles.modalText}>Color</Text>
                                <View >
                                    <View style={{flexDirection: "row" , marginBottom: 10 }}>
                                        <TouchableOpacity onPress={() => {this.setState({selectedColor:"#FFFF33"}); console.log("color here")}}>
                                            <ColorBox color="#FFFF33" selected={this.state.selectedColor} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {this.setState({selectedColor:"#FFCC33" })}}>
                                            <ColorBox color="#FFCC33" selected={this.state.selectedColor}/>
                            
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {this.setState({selectedColor:"#FF9933" })}}>
                                            <ColorBox color="#FF9933" selected={this.state.selectedColor}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {this.setState({selectedColor:"#FF6633" })}}>
                                            <ColorBox color="#FF6633" selected={this.state.selectedColor}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {this.setState({selectedColor:"#FF3333" })}}>
                                            <ColorBox color="#FF3333" selected={this.state.selectedColor}/>     
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{flexDirection: "row", marginBottom: 10 }}>
                                        <TouchableOpacity onPress={() => {this.setState({selectedColor:"#FFFFFF"}); console.log("color here")}}>
                                            <ColorBox color="#FFFFFF" selected={this.state.selectedColor} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {this.setState({selectedColor:"#FFCCFF" })}}>
                                            <ColorBox color="#FFCCFF" selected={this.state.selectedColor}/>
                            
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {this.setState({selectedColor:"#FF99FF" })}}>
                                            <ColorBox color="#FF99FF" selected={this.state.selectedColor}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {this.setState({selectedColor:"#CC99FF" })}}>
                                            <ColorBox color="#CC99FF" selected={this.state.selectedColor}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {this.setState({selectedColor:"#9999FF" })}}>
                                            <ColorBox color="#9999FF" selected={this.state.selectedColor}/>     
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{flexDirection: "row" ,marginBottom: 10}}>
                                        <TouchableOpacity onPress={() => {this.setState({selectedColor:"#99FF66"}); console.log("color here")}}>
                                            <ColorBox color="#99FF66" selected={this.state.selectedColor} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {this.setState({selectedColor:"#33FF66" })}}>
                                            <ColorBox color="#33FF66" selected={this.state.selectedColor}/>
                            
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {this.setState({selectedColor:"#00FF99" })}}>
                                            <ColorBox color="#00FF99" selected={this.state.selectedColor}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {this.setState({selectedColor:"#33FFFF" })}}>
                                            <ColorBox color="#33FFFF" selected={this.state.selectedColor}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {this.setState({selectedColor:"#00CCFF" })}}>
                                            <ColorBox color="#00CCFF" selected={this.state.selectedColor}/>     
                                        </TouchableOpacity>
                                    </View>
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
                                navigate = {()=>this.onEditCatDeletePressed(this.props.categoryId)}
                            />
                        </View>
                    </View>
                </Modal> */}
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
}


export default BudgetBarCategories;