import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/styles';

export default Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.title}>
        Author: Niklas Härö
      </Text>
    </View>
  )
}