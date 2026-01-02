import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
// Permissions camera
import { CameraView, useCameraPermissions } from 'expo-camera';
//styles
import { globalStyles as GS } from '../global/styles/styles.style';

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
    // Verificamos que el "mando" (ref) esté conectado
    if (cameraRef.current) {
      // 🔔 Esperamos a que la cámara termine de procesar
      const opciones = { quality: 0.7, base64: true };
      const data = await cameraRef.current.takePictureAsync(opciones);
      
      // 📦 Guardamos la ubicación de la foto en nuestra caja
      setFotoCapturada(data.uri);
      console.log("Foto guardada en:", data.uri);
  }
  };

  return (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={GS.containerCenter}>
        <Text style={GS.title}>Reto del día:</Text>
        
        <View style={GS.card}>
          <Text style={GS.retoText}>{reto}</Text>
        </View>

        <View style={GS.cameraContainer}>
          <CameraView 
            ref={cameraRef}
            style={GS.camera}
          >
          </CameraView>

          <TouchableOpacity style={GS.button} onPress={tomarFoto}>
              <Text style={GS.buttonText}>CAPTURAR RETO 📸</Text>
            </TouchableOpacity>

        </View>

        <TouchableOpacity style={GS.button} onPress={generarReto}>
          <Text style={GS.buttonText}>NUEVO RETO</Text>
        </TouchableOpacity>
      
        {fotoCapturada && (
          <View style={GS.containerCaptura}>
            <Text style={GS.text}>Tu captura:</Text>
            <Image 
              source={{ uri: fotoCapturada }} 
              style={GS.capture} 
            />
          </View>
        )}   
      
    </View>
  </ScrollView>
  );
};


export default Home;