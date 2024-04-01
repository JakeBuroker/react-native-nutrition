import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithCredential, 
  signInWithEmailAndPassword, // Explicit import
  createUserWithEmailAndPassword // Explicit import
} from 'firebase/auth';
import { API_TOKEN } from '@env'

// Your Firebase configuration
const firebaseConfig = {
  apiKey: API_TOKEN,
  authDomain: 'react-native-nutrition.firebaseapp.com',
  // other config values
};

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();

export default function App() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID',
  });

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((result) => {
          console.log('Signed in with Google!', result.user);
          setUser(result.user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });
    return unsubscribe; // Proper cleanup on unmount
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log('Logged in with:', userCredentials.user.email);
        setUser(userCredentials.user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log('Registered with:', userCredentials.user.email);
        setUser(userCredentials.user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Text>Welcome, {user.displayName || 'User'}!</Text>
          <Button title="Sign out" onPress={() => auth.signOut()} />
        </View>
      ) : (
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
          <Button title="Login" onPress={handleLogin} />
          <Button title="Register" onPress={handleRegister} />
          <Button
            disabled={!request}
            title="Login with Google"
            onPress={promptAsync}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
});
