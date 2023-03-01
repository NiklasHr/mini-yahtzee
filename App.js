import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles/styles'
import Footer from './components/footer';
import Header from './components/header';
import Gameboard from './components/gameboard';
import Home from './components/home';
import Scoreboard from './components/scoreboard';

//Bottom tab navigator used in app
//import { NavigationContainer } from '@react-navigation/native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}