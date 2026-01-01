import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
//styles
import { globalStyles as GS } from '../global/styles/Styles.style';

const Home = () => {
  //TODO: Retox, cambiar más adelante por data dinámica.
  const retos = [
    "Retrato con luz de ventana",
    "Líneas de fuga en la calle",
    "Fotografía en Blanco y Negro",
    "Primer plano de una textura",
    "Captura un reflejo en el agua"
  ];
  const [reto, setReto] = useState("¿Listo para un reto?");

  const generarReto = () => {
    const indiceAleatorio = Math.floor(Math.random() * retos.length);
    setReto(retos[indiceAleatorio]);
  };

  return (
    <View style={GS.containerCenter}>
      <Text style={GS.title}>Reto del día:</Text>
      
      <View style={GS.card}>
        <Text style={GS.retoText}>{reto}</Text>
      </View>

      <TouchableOpacity style={GS.button} onPress={generarReto}>
        <Text style={GS.buttonText}>GENERAR RETO</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Home;