import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
// Pantallas
import Home from '../screens/Home';
import Gallery from '../screens/Gallery';
import MyPhotos from '../screens/MyPhotos';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Inicio" component={Home} />
        <Tab.Screen name="Comunidad" component={Gallery} />
        <Tab.Screen name="Mis Fotos" component={MyPhotos} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;