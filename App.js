import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//BD
import { initDB } from './src/db/init';
//Componentes
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  // cargar la BD al iniciar la app
  useEffect(() => {
    try {
      initDB();
    } catch (error) {
      console.log("Error al inicializar la DB:", error);
    }
  }, []); 
  // El [ ] vacío asegura que solo ocurra una vez
 // return <View ><Text>Cargando...</Text></View>;
 return <MainNavigator />;

}

 