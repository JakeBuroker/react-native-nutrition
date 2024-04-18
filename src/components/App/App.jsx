import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import LandingPage from '../LandingPage/LandingPage';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { API_TOKEN } from '@env';

// Firebase configuration
const firebaseConfig = {
  apiKey: API_TOKEN,
  authDomain: 'react-native-nutrition.firebaseapp.com',
};

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const onLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        setUser(userCredentials.user);
        console.log('Logged in with:', userCredentials.user.email);
      })
      .catch(error => {
        console.error('Login failed:', error);
        alert(error.message);
      });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="Login">
              {() => <LoginPage onLogin={onLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterPage} />
          </>
        ) : (
          <Stack.Screen name="Home" component={LandingPage} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
