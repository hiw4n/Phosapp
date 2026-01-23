import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { storage } from '../services/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import MyButton from '../components/MyButtons';

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

  const takeAndUploadPicture = async () => {
    if (!cameraRef.current) return;

    try {
      setUploading(true);
      // 1. Capturar la foto
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      
      // 2. Crear una referencia en Firebase Storage
      const fileName = `challenge_${Date.now()}.jpg`;
      const storageRef = ref(storage, `photos/${fileName}`);

      // 3. Convertir la imagen a formato blob para subirla
      const response = await fetch(photo.uri);
      const blob = await response.blob();

      // 4. Subir a Firebase
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      console.log("Imagen subida con éxito:", downloadURL);
      Alert.alert("¡Éxito!", "Tu foto se ha guardado en la nube.");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo subir la imagen.");
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