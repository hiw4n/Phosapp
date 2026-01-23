import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import MyButton from '../components/MyButtons';

const CameraScreen = ({ navigation, route }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const { challengeTitle } = route.params; // Recibimos el nombre del reto

  if (!permission) return <View />; // Cargando permisos

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Necesitamos permiso para usar la cámara</Text>
        <MyButton title="Conceder Permiso" onPress={requestPermission} />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Foto capturada:", photo.uri);
        // Aquí es donde luego subiremos la foto a Firebase Storage
        Alert.alert("¡Reto cumplido!", `Has capturado la foto para: ${challengeTitle}`);
        navigation.goBack();
      } catch (e) {
        console.log("Error al hacer la foto:", e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.overlay}>
          <Text style={styles.challengeHint}>Reto: {challengeTitle}</Text>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.innerCircle} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 50 },
  challengeHint: { color: '#fff', fontSize: 18, marginBottom: 20, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 10 },
  captureButton: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  innerCircle: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: '#000' },
  text: { color: '#fff', textAlign: 'center', marginBottom: 20 }
});

export default CameraScreen;