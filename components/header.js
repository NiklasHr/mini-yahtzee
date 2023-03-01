import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/styles';

export default Header = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.title}>
        Mini-Yahtzee
      </Text>
    </View>
  )
}