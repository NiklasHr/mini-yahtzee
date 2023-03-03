import { ScrollView, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import styles from '../styles/styles';
import Header from "./header";
import Footer from "./footer";

export default Scoreboard = () => {

    return ( 
        <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center', justifyContent:'center'}}>
            <Header />

            <FontAwesome5 name="list-ol" size={48} color="#2895dd" />
            <Text style={styles.text}>Top Scores:</Text>
            <Text style={styles.textSmall}>No scores yet.</Text>

            <Footer />
        </ScrollView>
    )
}