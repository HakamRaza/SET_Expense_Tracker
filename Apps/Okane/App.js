import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as V from 'victory-native';
import { View, StyleSheet, Text} from 'react-native';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import configureStore from './store/configureStore';
const {persistor, store} = configureStore();

import Navigator from "./navigator";

class App extends React.Component{

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={{flex:1}}>
            <Navigator/>
          </View> 
         </PersistGate>
     </Provider>
    )
  }
}



export default App;