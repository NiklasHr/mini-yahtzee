import { View } from 'react-native';
import Header from "./header";
import Footer from "./footer";
import styles from '../styles/styles';
//React Native Easy Grid is used in the Gameboard (in teacher's version)

export default Gameboard = () => {

    return ( 
        <View style={styles.container}>
            <Header />
            <Footer />
        </View>
    )
}