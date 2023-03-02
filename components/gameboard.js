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
//React Native Easy Grid is used in the Gameboard (in teacher's version)

let board = [];

export default Gameboard = () => {

    const [isPressed, setIsPressed] = useState(false);
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [selectedValue, setSelectedValue] = useState(new Array(MAX_SPOT).fill(false));
    const [selectedPoints, setSelectedPoints] = useState(new Array(MAX_SPOT).fill(false));

    //Row displaying dice throws
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

    //Row displaying dice values from 1 to 6
    const valueRow = [];
    for (let i = 0; i < 6; i++){
        valueRow.push(
            <Col key={'valueRow' +  i}>
                <Pressable 
                    style={styles.center}
                    key={'valueRow' + i} onPress={() => selectValue(i)}>
                    <MaterialCommunityIcons 
                        name={'numeric-' + (i + 1) + '-circle'}
                        key={'valueRow' + i}
                        size={40}
                        color={getValueColor(i)}>
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }

    //Row displaying saved point amount.
    const pointsRow = [];
    for (let i = 0; i < 6; i++) {
        pointsRow.push(
            <Col key={'points' +  i}>
                <Text
                    key={'points' + pointsRow} 
                    style={styles.center}
                >0</Text>
            </Col>
        )
    }

    function getDiceColor(i) {
        return selectedDices[i] ? 'black' : '#2895dd';
    }

    function getValueColor(i) {
        return selectedValue[i] ? 'black' : '#2895dd';
    }

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    function selectValue(i) {
        let value = [...selectedValue];
        value[i] = selectedValue[i] ? false : true;
        setSelectedValue(value);
    }

    function handlePress() {
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setIsPressed(current => !current);
            throwDices();
        } else if (nbrOfThrowsLeft === 0) {
            //Resetting values and hiding dice buttons so user can't cheat
            setIsPressed(current => !current);
            setNbrOfThrowsLeft(3);
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        } else {
            throwDices();
        }
    }

    useEffect(() => {
        checkWinner();
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Game has not started');
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS-1);
        }
    }, [nbrOfThrowsLeft]);

    function checkWinner() {
        if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
            setStatus('You won');
        } else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
            setStatus('You won, game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        } else if (nbrOfThrowsLeft === 0) {
            setStatus('Game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        } else {
            
        }
    }

    function throwDices() {
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    }

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

            <Text style={styles.text}>Total: ....</Text>
            <Text style={styles.text}>You are {BONUS_POINTS_LIMIT} points away from bonus</Text>
            <View style={styles.flex}>{pointsRow}</View>
            <View style={styles.flex}>{valueRow}</View>
            
            
            <Footer />
        </ScrollView>
    )
}