import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//BD
// import { initDB } from './src/db/init';
//Componentes
// import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  // cargar la BD al iniciar la app
  // useEffect(() => {
  //   try {
  //     initDB();
  //   } catch (error) {
  //     console.log("Error al inicializar la DB:", error);
  //   }
  // }, []); 
  // El [ ] vacío asegura que solo ocurra una vez


  return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Hola</Text></View>

  // return <MainNavigator />;
  // return (
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     <Text>Si ves esto, el error está en el Navegador o en Home</Text>
  //   </View>
  // );

}

 