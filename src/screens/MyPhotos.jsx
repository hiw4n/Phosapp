import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Modal, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { globalStyles as SGS } from '../global/styles/Styles.style';
import PhotoCard from '../components/PhotoCard';
import * as FileSystem from 'expo-file-system';

const MyPhotos = () => {
  const [fotos, setFotos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);
  const navigation = useNavigation();

useFocusEffect(
    useCallback(() => {
      const cargarArchivosReales = async () => {
        try {
          const docUri = FileSystem.documentDirectory;
          const entries = await FileSystem.readDirectoryAsync(docUri);
          
          const jpgPhotos = entries
            .filter((entry) => {
              return entry.toLowerCase().endsWith('.jpg') || entry.toLowerCase().endsWith('.jpeg');
            })
            .map((fileName) => ({
              id: fileName,
              imagen: `${docUri}${fileName}`,
              titulo: 'Reto Completado'
            }));

          console.log("Fotos cargadas:", jpgPhotos.length);
          setFotos(jpgPhotos.reverse());
        } catch (e) {
          console.log('Error leyendo archivos:', e);
        }
      };
      cargarArchivosReales();
    }, [])
  );

  const abrirVisor = useCallback((item) => {
    setFotoSeleccionada(item);
    setModalVisible(true);
  }, []);

  const cerrarVisor = useCallback(() => setModalVisible(false), []);

  const borrarFoto = useCallback(async (foto) => {
    try {
      await FileSystem.deleteAsync(foto.imagen, { idempotent: true });
      setFotos((prev) => prev.filter((item) => item.id !== foto.id));
      setModalVisible(false);
    } catch (error) {
      console.error('No se pudo borrar la captura:', error);
      Alert.alert('Error', 'No pudimos borrar la foto.');
    }
  }, []);

  const confirmarBorrado = useCallback((foto) => {
    Alert.alert(
      "Eliminar Foto",
      "¿Estás seguro de que quieres borrar esta captura?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive", 
          onPress: () => borrarFoto(foto)
        }
      ]
    );
  }, [borrarFoto]);

  const handleOpenCamera = useCallback(() => {
    navigation.navigate('Camera');
  }, [navigation]);

  const renderEmptyComponent = useCallback(() => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>Todavía no tienes capturas guardadas.</Text>
      <TouchableOpacity style={[SGS.button, styles.emptyButton]} onPress={handleOpenCamera}>
        <Text style={SGS.buttonText}>ABRIR CÁMARA</Text>
      </TouchableOpacity>
    </View>
  ), [handleOpenCamera]);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity 
      onPress={() => abrirVisor(item)}
      onLongPress={() => confirmarBorrado(item)}
      style={styles.cardContainer}
    >
      <PhotoCard 
        photoUri={item.imagen} 
        isGrid={true}
      />
    </TouchableOpacity>
  ), [abrirVisor, confirmarBorrado]);

  return (
    <View style={[SGS.containerCenter, { backgroundColor: '#121212' }]}>
      <FlatList
        data={fotos} 
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} 
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={cerrarVisor}
      >
        <View style={styles.modalContent}>
          {fotoSeleccionada && (
            <>
              <Image source={{ uri: fotoSeleccionada.imagen }} style={styles.fullImage} />
              <Text style={styles.modalTitle}>{fotoSeleccionada.titulo}</Text>
              
              <TouchableOpacity 
                style={[SGS.button, { backgroundColor: '#FF2E63', marginBottom: 10 }]} 
                onPress={() => confirmarBorrado(fotoSeleccionada)}
              >
                <Text style={SGS.buttonText}>ELIMINAR CAPTURA</Text>
              </TouchableOpacity>

              <TouchableOpacity style={SGS.button} onPress={cerrarVisor}>
                <Text style={SGS.buttonText}>VOLVER</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  cardContainer: {
    flex: 0.5, // Asegura que cada columna ocupe la mitad exacta
  },
  emptyState: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    gap: 16,
  },
  emptyText: {
    color: '#EEE',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyButton: {
    minWidth: 180,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  fullImage: {
    width: '100%',
    height: '60%',
    borderRadius: 15,
    resizeMode: 'cover'
  },
  modalTitle: {
    color: '#00ADB5',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center'
  }
});

export default MyPhotos;