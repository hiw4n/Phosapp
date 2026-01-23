import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { PhotoProvider } from './src/context/PhotoContext';
import { initDB } from './src/db/init';

import Home from './src/screens/Home';
import GalleryScreen from './src/screens/GalleryScreen';
import CameraScreen from './src/screens/CameraScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import Profile from './src/screens/Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'grid';
          if (route.name === 'Inicio') iconName = 'home';
          else if (route.name === 'Galería') iconName = 'images';
          else if (route.name === 'Mis Fotos') iconName = 'albums';
          else if (route.name === 'Perfil') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00ADB5',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Ocultamos el header del tab para usar el del Stack
      })}
    >
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Galería" component={GalleryScreen} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <PhotoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Main" 
            component={MyTabs} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Camera" 
            component={CameraScreen} 
            options={{ title: 'Cámara' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PhotoProvider>
  );
}