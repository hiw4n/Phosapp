import React, { useState, useEffect, useRef } from 'react';
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
    const [fotoCapturada, setFotoCapturada] = useState(null);
    const cameraRef = useRef(null); // El mando empieza "desconectado" (null)
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

  const tomarFoto = async () => {
    if (cameraRef.current) {
      // 1. Le decimos al mando: "¡Dispara!"
      const foto = await cameraRef.current.takePictureAsync();
      // 2. Por ahora, solo vamos a ver en la consola si funcionó
      console.log("¡Foto capturada!", foto.uri);
    }
  };

  return (
<View style={GS.containerCenter}>
      <Text style={GS.title}>Reto del día:</Text>
      
      <View style={GS.card}>
        <Text style={GS.retoText}>{reto}</Text>
      </View>

      <View style={GS.cameraContainer}>
        <CameraView 
          ref={cameraRef}
          style={GS.camera}
          facing="back"
        >
        </CameraView>

        <TouchableOpacity style={GS.button} onPress={tomarFoto}>
            <Text style={GS.buttonText}>CAPTURAR RETO 📸</Text>
          </TouchableOpacity>

      </View>

      <TouchableOpacity style={GS.button} onPress={generarReto}>
        <Text style={GS.buttonText}>NUEVO RETO</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Home;