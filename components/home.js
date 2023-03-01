import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../styles/styles';
import Header from "./header";
import Footer from "./footer";
import { FontAwesome5 } from '@expo/vector-icons'; 

export default Home = () => {

    return ( 
        <View style={styles.container}>
            <Header />
            <FontAwesome5 name="info" size={24} color="#2895dd" style={styles.icon}/>
            <Text style={styles.text}>Enter your name for scoreboard.</Text>
            <TextInput style={styles.input}></TextInput>
            <Button 
                style={styles.button} 
                mode='contained'
                labelStyle={{fontSize: 20}}
                >OK</Button>
            <Footer />
        </View>
    )
    }