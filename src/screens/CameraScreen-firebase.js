import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { storage } from '../services/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import MyButton from '../components/MyButtons';
import * as FileSystem from 'expo-file-system';

const CameraScreen = ({ navigation, route }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [uploading, setUploading] = useState(false);
  const cameraRef = useRef(null);
  const { challengeTitle } = route.params || { challengeTitle: "Reto Genérico" };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Necesitamos permiso para la cámara</Text>
        <MyButton title="Conceder Permiso" onPress={requestPermission} />
      </View>
    );
  }

const takeAndSavePicture = async () => {
  if (!cameraRef.current) return;

  try {
    setUploading(true); // Usamos el mismo estado para el indicador de carga
    
    // 1. Capturar la foto
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
    
    // 2. Definir la ruta permanente en el móvil
    const fileName = `challenge_${Date.now()}.jpg`;
    const permanentUri = `${FileSystem.documentDirectory}${fileName}`;

    // 3. Mover la foto de la carpeta temporal a la permanente
    await FileSystem.moveAsync({
      from: photo.uri,
      to: permanentUri,
    });

    console.log("Foto guardada localmente en:", permanentUri);
    
    // 4. (Opcional) Aquí guardaríamos esta URI en AsyncStorage para recordarla al reiniciar
    Alert.alert("¡Reto Local Guardado!", "La foto se ha guardado en la memoria de tu dispositivo.");
    navigation.navigate('Gallery', { newPhoto: permanentUri }); // Vamos a la galería
    
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "No se pudo guardar la foto localmente.");
  } finally {
    setUploading(false);
  }
};

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Reto: {challengeTitle}</Text>
          
          {uploading ? (
            <ActivityIndicator size="large" color="#00ADB5" />
          ) : (
            <MyButton title="DISPARAR Y SUBIR" onPress={takeAndUploadPicture} />
          )}
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'space-between', padding: 40, backgroundColor: 'rgba(0,0,0,0.3)' },
  title: { color: 'white', fontSize: 20, textAlign: 'center', fontWeight: 'bold' },
  text: { color: 'white', textAlign: 'center', marginBottom: 20 }
});

export default CameraScreen;