import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
//Styles  
import { COLORS as C } from '../global/styles/Styles.style';
// Pantallas
import Home from '../screens/Home';
import Gallery from '../screens/Gallery';
import MyPhotos from '../screens/MyPhotos';


const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // 1. Configuración de iconos
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Inicio') iconName = 'home-outline';
            else if (route.name === 'Comunidad') iconName = 'earth-outline';
            else if (route.name === 'Mis Fotos') iconName = 'images-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // 2. Colores de la barra
          tabBarActiveTintColor: C.accent,
          tabBarInactiveTintColor: C.inactive,
          tabBarStyle: { backgroundColor: C.primary, borderTopWidth: 0 },
          headerStyle: { backgroundColor: C.primary },
          headerTintColor: C.text,
        })}
      >
        <Tab.Screen name="Inicio" component={Home} />
        <Tab.Screen name="Comunidad" component={Gallery} />
        <Tab.Screen name="Mis Fotos" component={MyPhotos} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;