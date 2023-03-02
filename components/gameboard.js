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
    const [selectedAmount, setSelectedAmount] = useState(new Array(MAX_SPOT).fill(false));

    const diceRow = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        diceRow.push(
            <Pressable
                key={"diceRow" + i}
                onPress={() => selectDice(i)}>
                <MaterialCommunityIcons
                    name={board[i]}
                    key={"diceRow" + i}
                    size={50} 
                    color={getDiceColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        );
    }

    const amountRow = [];
        for (let i = 0; i < 6; i++){
            amountRow.push(
                <Pressable 
                    key={'amountRow' + i} onPress={() => selectAmount(i)}>
                    <MaterialCommunityIcons 
                        name={'numeric-' + (i + 1) + '-circle'}
                        key={'amountRow' + i}
                        size={40}
                        color={getAmountColor(i)}>
                    </MaterialCommunityIcons>
                </Pressable>
        )
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

    function getDiceColor(i) {
        return selectedDices[i] ? "black" : "#2895dd";
    }

    function getAmountColor(i) {
        return selectedAmount[i] ? "black" : "#2895dd";
    }

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    function selectAmount(i) {
        let amount = [...selectedAmount];
        amount[i] = selectedDices[i] ? false : true;
        setSelectedAmount(amount);
    }

    function checkWinner() {
        if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
        setStatus('You won');
        }
        else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
        setStatus('You won, game over');
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else if (nbrOfThrowsLeft === 0) {
        setStatus('Game over');
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else {
        setStatus('Keep on throwing');
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
            <View style={styles.flex}>{amountRow}</View>
            
            
            <Footer />
        </ScrollView>
    )
}