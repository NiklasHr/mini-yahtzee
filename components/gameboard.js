import { useState, useEffect } from 'react'
import { View, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from './constants';
import Header from "./header";
import Footer from "./footer";
import styles from '../styles/styles';
import { Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Next step: display total value and save selected value.

let board = [];

export default Gameboard = ({navigation}) => {

    const [playerName, setPlayerName] = useState('')
    const [isPressed, setIsPressed] = useState(false);
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);

    //Information on selected dice values from 1-6
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    //Information on selected number values from 1-6
    const [selectedPoints, setSelectedPoints] = useState(new Array(MAX_SPOT).fill(false));
    //Information on dice values that were used to render dices.
    const [diceValues, setDiceValues] = useState(new Array(MAX_SPOT).fill(0));
    //Rendering status messages
    const [status, setStatus] = useState('');
    //Rendering bonus message
    const [bonus, setBonus] = useState('');
    //Total point count for number values from 1-6
    const [pointsTotal, setPointsTotal] = useState(new Array(MAX_SPOT).fill(0));
    //Setting total score
    const [scoreTotal, setScoreTotal] = useState(0);

    //Getting player name from storage
    const getName = async () => {
        try {
            const value = await AsyncStorage.getItem('name')
            return value;
        } catch(e) {
        alert(e)
        }
    }

    //Row displaying user's dice throws
    const diceRow = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        diceRow.push(
            <Pressable
                key={'diceRow' + i}
                onPress={() => selectDice(i)}>
                <MaterialCommunityIcons
                    name={board[i]}
                    key={'diceRow' + i} 
                    size={50} 
                    color={getDiceColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        );
    }

    //Sets color for dices.
    function getDiceColor(i) {
        return selectedDices[i] ? 'black' : '#2895dd';
    }
    //Function for determining selected dices.
    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }


    //Row displaying saved point amount above valueRow
    const pointsCountRow = [];
    for (let i = 0; i < MAX_SPOT; i++) {
        pointsCountRow.push(
            <Col key={'points' + i}>
                <Text
                    key={'points' + pointsCountRow} 
                    style={styles.center}
                >{getPointsCount(i)}</Text>
            </Col>
        )
    }

    //Row displaying dice values from 1 to 6 below pointsRow
    const pointsRow = [];
    for (let i = 0; i < MAX_SPOT; i++){
        pointsRow.push(
            <Col key={'pointsRow' +  i}>
                <Pressable 
                    style={styles.center}
                    key={'pointsRow' + i} onPress={() => selectPoints(i)}>
                    <MaterialCommunityIcons 
                        name={'numeric-' + (i + 1) + '-circle'}
                        key={'pointsRow' + i}
                        size={40}
                        color={getPointsColor(i)}>
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }
    //Sets color for points
    function getPointsColor(i) {
        return selectedPoints[i] ? 'black' : '#2895dd';
    }

    //Function for determining selected points & some error alerts.
    //Upon selecting a number, it saves points from all selected dices.
    function selectPoints(i) {
        let selectedPoint = [...selectedPoints];
        let points = [...pointsTotal];

        //First we check that user has no throws left, then if selectedPoint value is false, we alter it
        if (nbrOfThrowsLeft === 0 && !selectedPoint[i]) {
            selectedPoint[i] = true;
            let nbrOfDices = diceValues.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
            points[i] = nbrOfDices * (i + 1);
            setPointsTotal(points);
            setSelectedPoints(selectedPoint);
            //After user saves his points, we reset game.
            setIsPressed(current => !current);
            setNbrOfThrowsLeft(3);
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        } else if (nbrOfThrowsLeft === 0 && selectedPoint[i]) {
            alert('You cannot save points on a previously used number')
        } else if (nbrOfThrowsLeft != 0) {
            alert('You need to use all your throws before saving points')
        }

        //Setting total score
        setScoreTotal(
            points.reduce((a, b) => {return a + b;}, 0)
        );
    }

    //Gets selected points for dices.
    function getPointsCount(i) {
        return pointsTotal[i];
    } 

    //Function used upon pressing 'Throw dices' button.
    //isPressed is used to control whether diceRow or a picture of dices is shown.
    function handlePress() {
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setIsPressed(current => !current);
            throwDices();
        } else if (nbrOfThrowsLeft === 1) {
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
            throwDices();
        } else if (nbrOfThrowsLeft === 0) {
            alert('You must save your points')
        } else {
            throwDices();
        }
    }

    //Function for throwing dices, called by handlePress function
    //setDiceValues is used to save dice values so they can be used later.
    function throwDices() {
        let values = [...diceValues];
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                values[i] = randomNumber;
            }
        }
        setDiceValues(values);
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    }

    //Renders status messages depending on amount of throws left.
    useEffect(() => {
        if (nbrOfThrowsLeft === 3) {
            setStatus('Throw dice')
        }  else if (nbrOfThrowsLeft > 0 && nbrOfThrowsLeft < 3) {
            setStatus('Select dice and throw again');
        }  else if (nbrOfThrowsLeft === 0) {
            setStatus('Select which dice to keep');
        }   
        
        if (scoreTotal >= BONUS_POINTS_LIMIT) {
            setScoreTotal(scoreTotal + BONUS_POINTS)
            setBonus('Bonus points added (+50)')
        } else {
            bonusCount = BONUS_POINTS_LIMIT - scoreTotal
            setBonus('You are ' + bonusCount + ' points away from bonus')
        }
        //Setting player name
        getName().then((name) => setPlayerName(name));
    }, [nbrOfThrowsLeft]);

    const getTime = () => {
        var hours = new Date().getHours();
        var min = new Date().getMinutes(); 
        return hours + ':' + min;
    }

    const getCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return date + '-' + month + '-' + year;
    }

    //Saving player points for scoreboard
    const savePlayerPoints = async () => {
        try {    
          // Create an object with the required data
          const playerPoints = {
            scoreTotal: scoreTotal,
            playerName: playerName,
            currentDate: getCurrentDate(),
            currentTime: getTime(),
          };
      
          // Save the playerData object as a JSON string in AsyncStorage
          await AsyncStorage.setItem('scoreboard', JSON.stringify(playerPoints));
      
          console.log('Player points saved successfully.');
        } catch (error) {
          console.error('Error saving player points:', error);
        }
      };
      

    return ( 
        <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center', justifyContent:'center'}}>
            <Header />

            {!isPressed ? 
            <>
                <FontAwesome5 name="dice" size={48} color="#2895dd" />
            </>
            :
            <>
                <View style={styles.flex}>{diceRow}</View>
            </>
            }

            <Text style={styles.text}>Throws left {nbrOfThrowsLeft}</Text>
            <Text style={styles.text}>{status}</Text>
            <Button
                style={styles.button}
                mode='contained'
                labelStyle={{fontSize: 20}}
                onPress={() => handlePress()}
            >Throw dices</Button>
            <Button
                style={styles.button}
                mode='contained'
                labelStyle={{fontSize: 20}}
                onPress={() => savePlayerPoints()}
            >Save</Button>

            <Text style={styles.text}>Total: {scoreTotal}</Text>
            <Text style={styles.text}>{bonus}</Text>
            <View style={styles.flex}>{pointsCountRow}</View>
            <View style={styles.flex}>{pointsRow}</View>
            <Text style={styles.text}>Player: {playerName}</Text>
             
            <Footer />
        </ScrollView>
    )
}