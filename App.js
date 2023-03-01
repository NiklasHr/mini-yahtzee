import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons'; 

import styles from './styles/styles'
import Footer from './components/footer';
import Header from './components/header';
import Gameboard from './components/gameboard';
import Home from './components/home';
import Scoreboard from './components/scoreboard';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} 
        options={{tabBarIcon: () =>  <FontAwesome5 name="house-user" size={24} color="black" />}}
        />
        <Tab.Screen name='Gameboard' component={Gameboard} 
        options={{tabBarIcon: () =>  <FontAwesome5 name="dice" size={24} color="black" />}}
        />
        <Tab.Screen name='Scoreboard' component={Scoreboard} 
        options={{tabBarIcon: () =>  <FontAwesome5 name="list-alt" size={24} color="black" />}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}