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
                <View style={styles.container}>
                    <View style={styles.scoreboardContainer}>
                        <Text style={styles.text}>Name</Text>
                        <Text style={styles.text}>Score</Text>
                        <Text style={styles.text}>Date</Text>
                        <Text style={styles.text}>Time</Text>
                    </View>
                    {scores.map((score, index) => (
                    <View key={index} style={[styles.scoreboardContainer, {borderBottomWidth:0}]}>
                        <Text style={styles.text}>{score.playerName} </Text>
                        <Text style={styles.text}>{score.scoreTotal}</Text>
                        <Text style={styles.text}>{score.currentDate} </Text>
                        <Text style={styles.text}>{score.currentTime}</Text>
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