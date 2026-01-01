import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// Permissions camera
import { CameraView, useCameraPermissions } from 'expo-camera';
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
  // Persmisions camera ---------------------------------------- START
    const [cameraPermission,cameraRequestPermission] = useCameraPermissions();
    useEffect(() => {
      // Pedimos permiso automáticamente al entrar
      cameraRequestPermission();
    }, []);
    // Accept
    if (!cameraPermission) return <View />;
    // DENIED
    if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Necesitamos tu permiso para mostrar la cámara</Text>
        <TouchableOpacity onPress={cameraRequestPermission} style={styles.button}>
          <Text>Dar Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }
  // Persmisions camera ---------------------------------------- END

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

      <View style={GS.cameraContainer}>
        <CameraView style={GS.camera} facing="back">
          {/* Aquí irán los botones sobre la cámara más adelante */}
        </CameraView>
      </View>

      <TouchableOpacity style={GS.button} onPress={generarReto}>
        <Text style={GS.buttonText}>NUEVO RETO</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Home;