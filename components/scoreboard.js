import { View } from 'react-native';
import styles from '../styles/styles';
import Header from "./header";
import Footer from "./footer";

//react native paper DataTable used in teacher's example
import { DataTable } from "react-native-paper";

export default Scoreboard = () => {

    return ( 
        <View style={styles.container}>
            <Header />
            <Footer />
        </View>
    )
}