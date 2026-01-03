import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
// Permissions camera
import { CameraView, useCameraPermissions } from "expo-camera";
//styles
import { globalStyles as SGS } from "../global/styles/Styles.style";

const Home = () => {
  //TODO: Retox, cambiar más adelante por data dinámica.
  const retos = [
    "Retrato con luz de ventana",
    "Líneas de fuga en la calle",
    "Fotografía en Blanco y Negro",
    "Primer plano de una textura",
    "Captura un reflejo en el agua",
  ];
  const [reto, setReto] = useState("¿Listo para un reto?");
  // Persmisions camera ---------------------------------------- START
  const [cameraPermission, cameraRequestPermission] = useCameraPermissions();
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
      <View style={SGS.container}>
        <Text style={{ textAlign: "center" }}>
          Necesitamos tu permiso para mostrar la cámara
        </Text>
        <TouchableOpacity onPress={cameraRequestPermission} style={SGS.button}>
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
    try {
      const opciones = { 
        quality: 0.7, 
        base64: false, // Cambia a false si no necesitas el chorro de texto base64 para ahorrar memoria
        skipProcessing: false 
      };
      const data = await cameraRef.current.takePictureAsync(opciones);
      
      setFotoCapturada(data.uri);
      console.log("Foto guardada en:", data.uri);
    } catch (error) {
      console.log("Error al tomar foto:", error);
    }
  }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={SGS.containerCenter}>
        <Text style={SGS.title}>Reto del día:</Text>

        <View style={SGS.card}>
          <Text style={SGS.retoText}>{reto}</Text>
        </View>

        <View style={SGS.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={SGS.camera}
            facing="back"
          ></CameraView>

          <TouchableOpacity style={SGS.button} onPress={tomarFoto}>
            <Text style={SGS.buttonText}>CAPTURAR RETO 📸</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={SGS.button} onPress={generarReto}>
          <Text style={SGS.buttonText}>NUEVO RETO</Text>
        </TouchableOpacity>

        {fotoCapturada && (
          <View style={SGS.containerCaptura}>
            <Text style={SGS.text}>Tu captura:</Text>
            <Image source={{ uri: fotoCapturada }} style={SGS.capture} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Home;
