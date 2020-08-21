import React from "react";
import {ScrollView, View, Text, TouchableOpacity} from "react-native";
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';


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
            status:''
        }
    }

  
    render(){
        return(
            <View>    
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
            </View>
        )
    }
}

export default Overview;