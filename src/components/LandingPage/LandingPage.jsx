import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const LandingPage = ( ) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To Native Nutrition!</Text>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
  });
  
export default LandingPage;
  
