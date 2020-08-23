import React from "react";
import {View, Text} from "react-native";

import TransactionRecord from "components/transactionRecord"

class Transaction extends React.Component{
    render(){
        return(
            <View style={{backgroundColor: "lime", flex:1}}>
                <Text>This is Transaction page</Text>
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
            </View>
        )
    }
}

export default Transaction;