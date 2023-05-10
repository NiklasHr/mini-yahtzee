import { Pressable, ScrollView, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; 
import styles from '../styles/styles';
import Header from "./header";
import Footer from "./footer";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Scoreboard = () => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        getPlayerPoints();
    }, []);

    // Retrieve player points from AsyncStorage
    const getPlayerPoints = async () => {
        try {
            const playerPointsString = await AsyncStorage.getItem('scoreboard');
            if (playerPointsString !== null) {
                const playerPoints = JSON.parse(playerPointsString);
                setScores([playerPoints]);
            }
        } catch (error) {
            console.error('Error retrieving player points:', error);
        }
    };

    const refreshScores = () => {
        getPlayerPoints();
    };

    return ( 
        <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center', justifyContent:'center'}}>
            <Header />

            <FontAwesome5 name="list-ol" size={48} color="#2895dd" />
            <Text style={styles.text}>Top Scores:</Text>

            {scores.length > 0 ? (
                <View>
                    {scores.map((score, index) => (
                        <View key={index}>
                            <Text style={styles.text}>{score.playerName}: {score.scoreTotal}</Text>
                            <Text style={styles.textSmall}>{score.currentDate} {score.currentTime}</Text>
                        </View>
                    ))}
                </View>
            ) : (
                <Text style={styles.textSmall}>No scores yet</Text>
            )}

            <Pressable onPress={refreshScores}>
                <Text style={styles.textLink}>Refresh Scores</Text>
            </Pressable>

            <Footer />
        </ScrollView>
    );
}