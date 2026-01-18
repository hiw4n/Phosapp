import { enableScreens } from 'react-native-screens';
enableScreens(false);
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
//Styles  
import { globalStyles as SGS, COLORS as SC } from '../global/styles/Styles.style';
// Pantallas
import Home from '../screens/Home';
import Gallery from '../screens/Gallery';
import MyPhotos from '../screens/MyPhotos';
import Profile from '../screens/Profile';
import DesignSystem from '../playground/screens/_DesignSystem.ui';


const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = 'home-outline';
          else if (route.name === 'Comunidad') iconName = 'earth-outline';
          else if (route.name === 'Mis Fotos') iconName = 'images-outline';
          else if (route.name === 'Perfil') iconName = 'person-outline';
          else if (route.name === 'DesignSystem') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: SC.accent,
        tabBarInactiveTintColor: SC.inactive,
        tabBarStyle: SGS.tabBarStyle,
        headerStyle: SGS.headerStyle,
        headerTintColor: SC.text,
      })}
    >
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Comunidad" component={Gallery} />
      <Tab.Screen name="Mis Fotos" component={MyPhotos} />
      <Tab.Screen name="Perfil" component={Profile} />
      <Tab.Screen name="DesignSystem" component={DesignSystem} />
    </Tab.Navigator>
  );
};

export default MainNavigator;