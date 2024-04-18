import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RegisterForm from '../RegisterForm/RegisterForm';

const RegisterPage = ({ onRegister }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>
      <RegisterForm onRegister={onRegister} />
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

export default RegisterPage;
