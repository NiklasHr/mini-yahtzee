import { View, Text, TextInput, ScrollView } from 'react-native';
import { useState } from 'react'
import { Button } from 'react-native-paper';
import styles from '../styles/styles';
import Header from "./header";
import Footer from "./footer";
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from './constants'
import { FontAwesome5 } from '@expo/vector-icons'; 

export default Home = () => {

    const [playerName, setPlayerName] = useState('');
    const [isPressed, setIsPressed] = useState(false);

    return ( 
        <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
            <Header />
            {!isPressed ? 
            <>
                
                <FontAwesome5 name="info" size={24} color="#2895dd" style={styles.icon}/>
                <Text style={styles.text}>Enter your name for scoreboard.</Text>
                <TextInput style={styles.input} onChangeText={(n) => setPlayerName(n)}></TextInput>
                <Button 
                    style={styles.button} 
                    mode='contained'
                    labelStyle={{fontSize: 20}}
                    onPress={() => setIsPressed(current => !current)}
                >OK</Button>
            </>
            :
            <>
                <FontAwesome5 name="info" size={30} color="#2895dd" style={styles.icon}/>
                <Text style={styles.text}>Rules:</Text>
                <Text style={styles.textSmall}>
                    THE GAME: Upper section of the classic Yahtzee dice game. You have {NBR_OF_DICES} dices and
                    for the every dice you have {NBR_OF_THROWS} throws. After each throw you can keep dices in
                    order to get same dice spot counts as many as possible. In the end of the turn you must select
                    your points from {MIN_SPOT} to {MAX_SPOT}. Game ends when all points have been selected.
                    The order for selecting those is free.
                </Text>
                <Text style={styles.textSmall}>
                    POINTS: After each turn game calculates the sum for the dices you selected. Only the dices having
                    the same spot count are calculated. Inside the game you can not select same points from {MIN_SPOT} to {MAX_SPOT} again
                </Text>
                <Text style={styles.textSmall}>
                    GOAL: To get points as much as possible. {BONUS_POINTS_LIMIT} points is the limit of
                    getting bonus which gives you {BONUS_POINTS} points more.
                </Text>
                <Text style={styles.text}>Good luck {playerName}</Text>
            </>
            }
            <Footer />
        </ScrollView>
    )
}