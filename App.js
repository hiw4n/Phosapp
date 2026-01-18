import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/services/firebaseConfig';

// Pantallas
import LoginScreen from './src/screens/LoginScreen';
import MainTabNavigator from './src/navigation/MainNavigator'; // Tu navegación actual

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Suscribirse al estado de Firebase
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      setUser(userFirebase);
    });
    return unsubscribe; // Limpiar al desmontar
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Si hay usuario, vamos a la App
          <Stack.Screen name="App" component={MainTabNavigator} />
        ) : (
          // Si no, al Login
          <Stack.Screen name="Auth" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}