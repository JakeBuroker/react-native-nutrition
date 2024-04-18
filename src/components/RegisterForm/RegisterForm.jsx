import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';

const RegisterForm = ({ onRegister, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <Button title="Register" onPress={() => onRegister(email, password)} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
});

export default RegisterForm;
