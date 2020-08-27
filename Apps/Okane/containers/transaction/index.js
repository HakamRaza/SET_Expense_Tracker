import React from "react";
import {View, Text, ScrollView, TouchableOpacity, TouchableHighlight, Modal} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-community/picker';
import {DropDown} from "react-native-material-dropdown"

import TransactionRecord from "components/transactionRecord";
import ValueInputField from "components/valueInput";
import SubmitButton from "components/submit";

import {connect} from "react-redux";
import Actions from "actions";

class Transaction extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            amount: "",
            description:"",
            date: new Date(),
            mode: 'date',
            selectedDate: moment().format("DD-MM-YYYY"),
            selectedDateforDTP: "",
            show:false,
            DDCategoryList:[],
            TransactionHistory:[],
            category_id:"",
            month:8,
            year: 2020,

        }
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible})
    }

    handleDatePicked= date => {
        console.log("A date has been picked :", date);
        this.setState({selectedDate: moment(date).format("DD-MM-YYYY"), show:false});
        this.setState({selectedDateforDTP:date})
    }

    hideDateTimePicker = date => {
        this.setState({show:false});
    }

    componentDidMount(){
        this.props.onGetCategories();   
        const data={
            month:this.state.month,
            year: this.state.year
        }
        this.props.onGetTransactions(data);
    }

    componentDidUpdate(prevProps){
        const{getCategoryData, getTransactionData} = this.props;

        if(prevProps.getCategoryData.isLoading && !getCategoryData.isLoading){
            if(getCategoryData.data.status === "success"){
                console.log("this is getCategoryList didupdate", getCategoryData.data)
                this.setState({DDCategoryList:getCategoryData.data.categoryList});
            }
        }
        if(prevProps.getTransactionData.isLoading && !getTransactionData.isLoading){
            if(getTransactionData.data.status === "success"){
                console.log("this is TransactionData didupdate", getTransactionData.data)
                this.setState({TransactionHistory:getTransactionData.data.categoryList});
            }
        }
    }

    render(){

        const {modalVisible} = this.state;
        return(
            <View style={{backgroundColor: "white"}}>
                <View>
                    <TouchableOpacity style={styles.monthYearPickerHolder}
                                // onPress={()=>this.setState({show:true})}
                                onPress={()=>this.setState({showDateFilter:true})}
                            >
                        <Text style={{fontSize:18}}>{this.state.language}</Text>
                    </TouchableOpacity>
                </View> 
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
                                <Text style={styles.modalTitle}>New Transaction</Text>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(!modalVisible);
                                        console.log("close-cross");
                                    }}>
                                    <Ionicons 
                                    name={"ios-close"} 
                                    size={40} 
                                    color={"rgb(0,163,255)"}
                                    style={styles.closeButton}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{
                                        borderWidth:1, 
                                        borderColor:"black",
                                        borderRadius:25,
                                        width: 250,
                                        height: 50,
                                        paddingHorizontal: 30,
                                        marginBottom: 20,
                                        backgroundColor:"white",
                                        justifyContent:"center"
                                        }}
                                        onPress={()=>this.setState({show:true})}
                                    ><Text>{this.state.selectedDate}</Text>
                            </TouchableOpacity>
                                    
                                <DateTimePicker
                                    value={this.state.selectedDateforDTP}
                                    isVisible={this.state.show}
                                    mode={this.state.mode}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                    // style={{backgroundColor:"black"}}
                                    // onChange={()=>console.log(date)}
                                    // onChange={(event, a)=>
                                    //     { 
                                    //         console.log(selectedDate);
                                    //         this.setState({selectedDate: moment(a).format("DD-MM-YYYY, h:mm:ss a"), show:false});
                                    //     }}
                                /> 
                            <ValueInputField
                            inputTitle="Description"
                            inputPlaceHolder="Something"
                            inputType="default"
                            abc={(description)=>this.setState({description})}
                            />
                            <ValueInputField
                            inputTitle="Amount"
                            inputPlaceHolder="0.00"
                            inputType="numeric"
                            abc={(amount)=>this.setState({amount})}
                            />

                            <View style={{width:"100%", alignItems:"flex-start",paddingHorizontal: 30, marginBottom:15}}>
                                <Text style={styles.title}>Category</Text>

                                <TouchableOpacity
                                    style={{
                                        width: 250,
                                        height: 50,
                                        justifyContent:"center",
                                        paddingHorizontal: 30,
                                        marginVertical:15,
                                        borderColor: "black",
                                        borderWidth:1,
                                        borderRadius: 25,
                                        overflow: "hidden",
                                        shadowOpacity:0.2,
                                        // shadowColor: "black",
                                        shadowRadius:5,
                                        shadowOffset:{
                                            height: 2,
                                            width:2 },

                                    }}>
                                    <RNPickerSelect
                                        onValueChange={(value)=>this.setState({category_id:value})}
                                        items = {this.state.DDCategoryList.map((category) => 
                                            ({
                                                label: category.category_title,
                                                value: category.id,
                                            }))}
                                    />
                                </TouchableOpacity>
                            </View>
                            <SubmitButton
                                buttonTitle="Done"
                                submitButtonText="Done"
                                navigate = {()=>this.setModalVisible(!modalVisible)}
                            />
                        </View>
                    </View>
                </Modal>

                <ScrollView >
                    <TransactionRecord
                        itemName="Chicken Burger and Nasi "
                        itemPrice={5.60}
                        category="Food"
                        dateCreated="7 Aug 2020"
                        color="orange"
                    />



                </ScrollView>
                <TouchableOpacity style={styles.addButton} onPress={() => {this.setModalVisible(true)}}>

                        <Ionicons 
                        name={"ios-add-circle-outline"} 
                        size={36} 
                        color={"white"}
                        />

                </TouchableOpacity> 
            </View>
        )
    }
}

const styles = {

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

title:{
    fontSize: 18,
    fontWeight:"bold",
},

closeButton: {
    position: "absolute",
    top: -5,
    right:10,
},

addButton: {
    position: "absolute",
    bottom: 20,
    left: 315,
    zIndex: 3,
    backgroundColor: "rgb(0,163,255)",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems:"center"

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
};

const mapStateToProps = (store) => ({
    getCategoryData: Actions.getGetCategoryData(store),
    getTransactionData: Actions.getGetTransactionData(store),
});

const mapDispatchToProps = {
    onGetCategories: Actions.getCategory,
    onGetTransactions: Actions.getTransaction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);