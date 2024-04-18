import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LoginForm from '../LoginForm/LoginForm';

const LoginPage = ({ onLogin }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Your Account</Text>
      <LoginForm onLogin={onLogin} loading={false} />
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

export default LoginPage;
