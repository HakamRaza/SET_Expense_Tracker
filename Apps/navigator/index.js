import React from "react";
import {Text, TouchableOpacity, StyleSheet, Modal, View} from "react-native";
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import Auth from "containers/auth";
import Overview from "containers/overview";
import Categories from "containers/categories";
import Transaction from "containers/transaction";
import Settings from "containers/settings";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class BottomTab extends React.Component{
    render(){
        return(
            <Tab.Navigator tabBarOptions={{
                activeTintColor:"white",
                inactiveTintColor: "rgb(0,163,255)",
                activeBackgroundColor: "rgb(0,163,255)",
                inactiveBackgroundColor:"white",
                style:{height:80},
                labelStyle:{marginBottom:5}
                }}
            >
                <Tab.Screen
                name="Overview"
                component={Overview}
                options={{
                    tabBarIcon: ({color, focused})=> (
                    <AntDesign 
                    name={ focused? "linechart": "linechart"} 
                    size={36} 
                    color={color}
                    />
                    ),  
                }}
                />
          
                <Tab.Screen
                name="Categories"
                component={Categories}
                options={{
                    tabBarIcon: ({color, focused})=> (
                    <Icon 
                    name={ focused? "border-all": "border-all"} 
                    size={36} 
                    color={color}
                    />
                    ),  
                }}
                />

                <Tab.Screen
                name="Transaction"
                component={Transaction}
                options={{
                    tabBarIcon: ({color, focused})=> (
                    <Ionicons 
                    name={ focused? "ios-list": "ios-list"} 
                    size={36} 
                    color={color}
                    />
                    ),  
                }}
                />

                <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({color, focused})=> (
                    <AntDesign
                    name={ focused? "setting": "setting"} 
                    size={36} 
                    color={color}
                    />
                    ),  
                }}
                />
            </Tab.Navigator>

        )
    }
}

class Navigator extends React.Component {
    
    render(){
        return(
                                        
            <NavigationContainer>
                <Stack.Navigator>

                    <Stack.Screen
                        name="Auth"
                        component={Auth}
                        options=
                        {{ 
                            headerTitle:"Login", 
                            headerShown: false,
                        }}
                    />

                    <Stack.Screen
                        name="Overview"
                        component={BottomTab}
                        options=
                        {

                            ({route}) => {
                                const routeName = getFocusedRouteNameFromRoute(route)??'Overview';
                                
                                switch(routeName) {
                                    
                                    case 'Overview':{
                                        return {
                                            headerTitle: 'Overview',
                                            headerLeft: null, 
                                            headerTitleAlign: "left",
                                            headerTitleStyle:{color:"white", fontSize:25},
                                            headerStyle:{backgroundColor: "rgb(0,163,255)", height: 80},
                                            // headerRight: ()=>   <TouchableOpacity
                                            //                         onPress = { ()=> this.setState(!modalVisible)}
                                            //                     >

                                            //                         {/* <Ionicons  */}
                                            //                         name={"ios-add-circle-outline"} 
                                            //                         size={25} 
                                            //                         color={"white"}
                                            //                         />

                                            //                     </TouchableOpacity>,
                                            // headerRightContainerStyle: {marginRight:20},
                                            swipeEnabled:false

                                        }
                                    }
                                    case 'Categories':{
                                        return {
                                            headerTitle: 'Categories',
                                            headerLeft: null, 
                                            headerTitleAlign: "left",
                                            headerTitleStyle:{color:"white", fontSize:25},
                                            headerStyle:{backgroundColor: "rgb(0,163,255)", height: 80},
                                            // headerRight: ()=>   <TouchableOpacity>

                                            //                         <Ionicons 
                                            //                         name={"ios-add-circle-outline"} 
                                            //                         size={25} 
                                            //                         color={"white"}
                                            //                         />

                                            //                     </TouchableOpacity>,
                                            // headerRightContainerStyle: {marginRight:20}
                                        }
                                    }
                                    case 'Transaction':{
                                        return {
                                            headerTitle: 'Transaction',
                                            headerLeft: null, 
                                            headerTitleAlign: "left",
                                            headerTitleStyle:{color:"white", fontSize:25},
                                            headerStyle:{backgroundColor: "rgb(0,163,255)", height: 80},
                                            // headerRight: ()=> 
                                            //                     <TouchableOpacity
                                            //                         onPress = {()=>this.setModalVisible(true)}>

                                            //                         <Ionicons 
                                            //                         name={"ios-add-circle-outline"} 
                                            //                         size={25} 
                                            //                         color={"white"}
                                            //                         />
                                            //                     </TouchableOpacity>,
                                            // headerRightContainerStyle: {marginRight:20}
                                        }
                                    }
                                    case 'Settings':{
                                        return {
                                            headerTitle: 'Settings',
                                            headerLeft: null, 
                                            headerTitleAlign: "left",
                                            headerTitleStyle:{color:"white", fontSize:25},
                                            headerStyle:{backgroundColor: "rgb(0,163,255)", height: 80},
                                        }
                                    }
                                }
                            
                            }
                        }
                        
                    />


                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigator; 