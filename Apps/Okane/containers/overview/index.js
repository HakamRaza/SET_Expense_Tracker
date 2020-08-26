import React from "react";
import {ScrollView, View, Text, TouchableOpacity, Modal, StyleSheet, Picker} from "react-native";
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import {VictoryChart, VictoryLine} from 'victory-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StatsBar from "components/statsBar";
import BudgetBarOverview from "components/budgetBar@overview";

import {connect} from "react-redux";
import Actions from "actions";

const DailyExpenses = [
     
    { x: 1, y: 1 },
    { x: 2, y: 4 },
    { x: 3, y: 1 },
    { x: 4, y: 2 },
    { x: 5, y: 5 },
    { x: 6, y: 2 },
    { x: 7, y: 1 },
    { x: 8, y:9 },
    { x: 9, y: 1 },
    { x: 10, y: 5 },
    { x: 11, y: 5 },
    { x: 12, y: 8 },
]

const AccExpenses = [
     
    { x: 1, y: 1 },
    { x: 2, y: 3 },
    { x: 3, y: 4 },
    { x: 4, y: 6 },
    { x: 5, y: 7 },
    { x: 6, y: 9 },
    { x: 7, y: 10 },
    { x: 8, y: 13 },
    { x: 9, y: 15 },
    { x: 10, y: 30 },
    { x: 11, y: 24 },
    { x: 12, y: 35 },
]

const budgetLine = [
     
    { x: 1, y:30 },
    { x: 2, y: 30 },
    { x: 3, y: 30 },
    { x: 4, y: 30 },
    { x: 5, y: 30 },
    { x: 6, y: 30 },
    { x: 7, y: 30 },
    { x: 8, y: 30 },
    { x: 9, y: 30 },
    { x: 10, y: 30 },
    { x: 11, y: 30 },
    { x: 12, y: 30 },
]

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
            status:'',
            modalVisible:"",
            selectedMonth: "Aug 2020",
            language:"",
            getOverviewData:[],
            graphBudgetData:[],
            graphDailyExpenseData:[],
            graphTotalExpenseData:[],
            month:8,
            year: 2020,
        }
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    componentDidMount(){
        const data ={ 
            month: this.state.month,
            year: this.state.year
        }
        this.props.onGetOverview(data);
        console.log("data to overview saga",data)
    }

    componentDidUpdate(prevProps){
        const {getOverviewData} = this.props;
        
        if (prevProps.getOverviewData.isLoading && !getOverviewData.isLoading) {
            console.log("this is Buget Data @ container", this.state.graphBudgetData);  
            console.log("this is Daily Expense Data @ container", getOverviewData.data.graphDailyExpense);  
            console.log("this is Total Expense @ container", getOverviewData.data.graphTotalExpense);  
        }
    }

  
    render(){
        const {modalVisible} = this.state;
        return(
            <View style={{flex:1}}>

                <View>
                    <TouchableOpacity style={styles.monthYearPickerHolder}
                                // onPress={()=>this.setState({show:true})}
                                onPress={()=>this.setState({show:true})}
                            >
                        <Text style={{fontSize:18}}>{this.state.language}</Text>
                    </TouchableOpacity>
                </View> 
                
                {this.state.show && (
                    <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: "100%" , backgroundColor: "white"}}
                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                )}  

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
                    barAmount={this.props.getOverviewData.data.totalSavings}
                    />
                    <StatsBar 
                    barTitle="Expenses"
                    barAmount={this.props.getOverviewData.data.expensesData}
                    />
                    <BudgetBarOverview
                    barTitle="Budget"
                    budget={this.props.getOverviewData.data.budgetData}
                    barAmountLeft="443.25"
                    AccExpenses={this.props.getOverviewData.data.expensesData}
                    />
                    
                    {/* <VictoryChart
                    // theme={VictoryTheme.material}
                    >
                    <VictoryLine
                        style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"}
                        }}
                        data={[
                        { x: 1, y: 2 },
                        { x: 2, y: 3 },
                        { x: 3, y: 5 },
                        { x: 4, y: 4 },
                        { x: 5, y: 7 }
                        ]}
                    />
                    </VictoryChart> */}

                    <VictoryChart 
                        height={350}  
                        width={350} 
                        
                    >
                            <VictoryLine
                            interpolation="natural"
                            text={"Daily Expenses (RM)"}
                            style={{
                                data: { stroke: "green" }
                            }}
                            
                            data={this.props.getOverviewData.data.graphDailyExpense}/>

                            <VictoryLine
                            interpolation="natural"

                            style={{
                                data: { stroke: "blue" }
                            }}

                            data={this.props.getOverviewData.data.graphTotalExpense}/>

                            <VictoryLine
                            interpolation="natural"

                            style={{
                                data: { stroke: "red" }
                            }}

                            data={this.props.getOverviewData.data.graphBudget}/>
                        </VictoryChart>

                </ScrollView>
                <TouchableOpacity style={styles.addButton}>

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

const styles = StyleSheet.create({
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
      bottom: 20,
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

  const mapStateToProps = (store) => ({
    getOverviewData: Actions.getGetOverviewData(store),
});

const mapDispatchToProps = {
    onGetOverview: Actions.getOverview,
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);