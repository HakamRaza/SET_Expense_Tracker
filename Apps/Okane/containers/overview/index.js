import React from "react";
import {ScrollView, View, Text, TouchableOpacity, Modal, StyleSheet} from "react-native";
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import {VictoryChart} from 'victory-native';
import Ionicons from 'react-native-vector-icons/Ionicons';




import StatsBar from "components/statsBar";
import BudgetBarOverview from "components/budgetBar@overview";


class Overview extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            taskTitle:"",
            taskDetails:"",
            taskStatus:"",
            date: new Date(),
            mode: 'date',
            show:false,
            show2:false,
            selectedStartDate: moment().format("DD-MM-YYYY"),
            selectedEndDate: null,
            image: null,
            selectedImage:'',
            selectedImage2:'',
            status:'',
            modalVisible:""
        }
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

  
    render(){
        const {modalVisible} = this.state;
        return(
            <View>
               
                {/* <Modal visible={modalOpen} animationType="slide">
                    <View style={StyleSheet.modalContainer}>
                        <Text> Hello from the modal :)</Text>
                    </View>
                </Modal>  */}
                {/* <DropDownPicker
                    item={[
                        {label: 'Jan', value: 'Jan'},
                        {label: 'February', value: 'February'},
                        {label: 'March', value: 'March'},
                        {label: 'April', value: 'April'},
                        {label: 'May', value: 'May'},
                        {label: 'June', value: 'June'},
                        {label: 'July', value: 'July'},
                        {label: 'August', value: 'August'},
                        {label: 'September', value: 'September'},
                        {label: 'October', value: 'October'},

                    ]}
                    placeholder="Select Task Status"
                    defaultValue={this.state.status}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        status: item.value
                    })}
                    /> */}

                <ScrollView contentContainerStyle={{alignItems:"center"}} >
                {/* <ScrollView style={{ flex:1, alignItems:"center"}} > */}
                    <StatsBar
                    barTitle="Savings" 
                    barAmount="24583.00"
                    />
                    <StatsBar 
                    barTitle="Expenses"
                    barAmount="945.60"
                    />
                    <BudgetBarOverview
                    barTitle="Expenses"
                    budget="900.00"
                    barAmountLeft="443.25"
                    AccExpenses="456.75"
                    />
                    
                </ScrollView>
                <TouchableOpacity style={styles.addButton}>

                    <Ionicons 
                    name={"ios-add-circle-outline"} 
                    size={25} 
                    color={"red"}
                    />

                </TouchableOpacity>   
            </View>
        )
    }
}

const styles = StyleSheet.create({
    addButton: {
      position: "relative",
      bottom: 50,
      left : 50,
      zIndex: 3,
      backgroundColor: "lime",
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: "center",
      alignItems:"center"

    }
  });



export default Overview;