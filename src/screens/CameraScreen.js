import React, { useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { CameraView } from 'expo-camera';
import { Directory, File, Paths } from 'expo-file-system'; 
import MyButton from '../components/MyButtons';
import { usePhotos } from '../context/PhotoContext';

export default function CameraScreen({ navigation, route }) {
  const cameraRef = useRef(null);
  const { addPhoto } = usePhotos();
  const challengeTitle = route?.params?.challengeTitle ?? 'Reto del día';

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        // 1. Capturar la foto (genera una URI temporal)
        const photo = await cameraRef.current.takePictureAsync();
        
        if (!photo || !photo.uri) {
          throw new Error("No se pudo obtener la URI de la foto");
        }

        // 2. Preparar la carpeta de Documentos y crear el archivo destino
        const documentsDir = new Directory(Paths.document);
        documentsDir.create({ idempotent: true });
        const fileName = `photo_${Date.now()}.jpg`;
        const destinationFile = new File(documentsDir, fileName);
        
        // 4. USAMOS LA RUTA DIRECTA: Creamos el objeto File desde la URI temporal
        const sourceFile = new File(photo.uri);
        
        // 5. Mover el archivo
        await sourceFile.move(destinationFile);

        await addPhoto({
          uri: destinationFile.uri,
          challengeTitle,
          fileName,
          createdAt: new Date().toISOString()
        });
        
        console.log("Foto guardada con éxito en:", destinationFile.uri);
        
        Alert.alert("¡Reto cumplido!", `Foto guardada para "${challengeTitle}".`);
        navigation.goBack(); 

      } catch (error) {
        console.error("Error al guardar la foto:", error);
        Alert.alert("Error", "No se pudo procesar la imagen: " + error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <MyButton title="HACER FOTO" onPress={takePicture} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1, justifyContent: 'flex-end', paddingBottom: 50 },
  buttonContainer: { alignItems: 'center' }
});