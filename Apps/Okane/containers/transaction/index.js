import React from "react";
import {View, Text, ScrollView, TouchableOpacity} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import TransactionRecord from "components/transactionRecord"

class Transaction extends React.Component{
    render(){
        return(
            <View style={{backgroundColor: "white"}}>
                <ScrollView>
                    <TransactionRecord
                        itemName="Chicken Burger"
                        itemPrice={5.60}
                        category="Food"
                        dateCreated="7 Aug 2020"
                    />
                    <TransactionRecord
                        itemName="Chicken Burger"
                        itemPrice={5.60}
                        category="Food"
                        dateCreated="7 Aug 2020"
                    />
                    <TransactionRecord
                        itemName="Chicken Burger"
                        itemPrice={5.60}
                        category="Food"
                        dateCreated="7 Aug 2020"
                    />
                    <TransactionRecord
                        itemName="Chicken Burger"
                        itemPrice={5.60}
                        category="Food"
                        dateCreated="7 Aug 2020"
                    />
                    <TransactionRecord
                        itemName="Chicken Burger"
                        itemPrice={5.60}
                        category="Food"
                        dateCreated="7 Aug 2020"
                    />
                    <TransactionRecord
                        itemName="Chicken Burger"
                        itemPrice={5.60}
                        category="Food"
                        dateCreated="7 Aug 2020"
                    />
                    <TransactionRecord
                        itemName="Chicken Burger"
                        itemPrice={5.60}
                        category="Food"
                        dateCreated="7 Aug 2020"
                    />
                    <TransactionRecord
                        itemName="Chicken Burger"
                        itemPrice={5.60}
                        category="Food"
                        dateCreated="7 Aug 2020"
                    />
                    <TransactionRecord
                        itemName="Chicken Burger"
                        itemPrice={5.60}
                        category="Food"
                        dateCreated="7 Aug 2020"
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

const styles = {
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

};

export default Transaction;