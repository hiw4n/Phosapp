import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
// Permissions camera
import { CameraView, useCameraPermissions } from "expo-camera";
import { guardarRetoEnDB } from "../services/retosService";
// Permissions Locallization
import * as Location from "expo-location";
//Global styles
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
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // Persmisions camera ---------------------------------------- START
  const [fotoCapturada, setFotoCapturada] = useState(null);
  const [ladoCamara, setLadoCamara] = useState('back');
  const [flash, setFlash] = useState('off');
  const [linterna, setLinterna] = useState(false); // true o false
  
  const cameraRef = useRef(null); // El mando empieza "desconectado" (null)
  
  const [cameraPermission, cameraRequestPermission] = useCameraPermissions();
  
  useEffect(() => {
    // Pedimos permiso automáticamente al entrar
    cameraRequestPermission();
    // permisos localización ------------
    (async () => {
        // Pedimos permiso para usar el GPS "en primer plano" (mientras la app se usa)
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permiso de ubicación denegado ❌');
          return;
        }
        // Si tenemos permiso, obtenemos la posición actual
        let actualLocation = await Location.getCurrentPositionAsync({});
        setLocation(actualLocation);
        console.log("📍 Ubicación obtenida:", actualLocation.coords.latitude, actualLocation.coords.longitude);
      })();
  }, []);

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
        guardarRetoEnDB(reto, data.uri);
      } catch (error) {
        console.log("Error al tomar foto:", error);
      }
    }
  };

  if (!cameraPermission) return <View />;
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
          facing={ladoCamara}        // <--- Depende del estado
          enableTorch={linterna}      // <--- Depende del estado
        >
          {/* Contenedor de botones sobre la cámara */}
          <View style={SGS.controlesSuperiores}>
            
            {/* Botón Girar Cámara */}
            <TouchableOpacity 
              style={SGS.botonCircular} 
              onPress={() => setLadoCamara(ladoCamara === 'back' ? 'front' : 'back')}
            >
              <Text style={{fontSize: 20}}>🔄</Text>
            </TouchableOpacity>

            {/* Botón Flash/Linterna */}
            <TouchableOpacity 
              style={[SGS.botonCircular, linterna && {backgroundColor: '#FFD700'}]} 
              onPress={() => setLinterna(!linterna)}
            >
              <Text style={{fontSize: 20}}>{linterna ? '💡' : '🌑'}</Text>
            </TouchableOpacity>

          </View>
        </CameraView>

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
