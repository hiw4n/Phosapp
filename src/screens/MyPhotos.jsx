import React, { useState, useCallback } from 'react';
import { View, FlatList, Image, TouchableOpacity, Dimensions, StyleSheet, Modal, Text, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';
import { obtenerRetosDeDB, eliminarRetoDeDB } from '../services/retosService';
import { globalStyles as SGS } from '../global/styles/Styles.style';

// Obtenemos el ancho de la pantalla para calcular el tamaño de las fotos
const { width } = Dimensions.get('window');
const columnSize = width / 3; // Dividimos el ancho entre 3 columnas

const MyPhotos = () => {
  const [fotos, setFotos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const datos = obtenerRetosDeDB();
      setFotos(datos);
    }, [])
  );

const abrirVisor = (item) => {
    setFotoSeleccionada(item); // Guardamos la foto pulsada
    setModalVisible(true);     // Abrimos la ventana
  };

const renderItem = ({ item }) => {
    const confirmarBorrado = () => {
      Alert.alert(
        "Eliminar Foto",
        "¿Estás seguro de que quieres borrar esta captura?",
        [
          { text: "Cancelar", style: "cancel" },
          { 
            text: "Eliminar", 
            style: "destructive", 
            onPress: () => {
              eliminarRetoDeDB(item.id);
              setFotos(obtenerRetosDeDB());
            } 
          }
        ]
      );
    };

    return (
      <TouchableOpacity 
        style={styles.gridItem} 
        onPress={() => abrirVisor(item)}      // <--- AHORA SÍ CONECTADO (Pulsación corta)
        onLongPress={confirmarBorrado}      // <--- CONECTADO (Pulsación larga)
      >
        <Image source={{ uri: item.imagen }} style={styles.imageGrid} />
      </TouchableOpacity>
    );
  };

return (
    <View style={SGS.containerCenter}>
      <FlatList
        data={fotos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
      />

      {/* MODAL: Esta es la pieza que faltaba en tu return */}
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          {fotoSeleccionada && (
            <>
              <Image source={{ uri: fotoSeleccionada.imagen }} style={styles.fullImage} />
              <Text style={styles.modalTitle}>{fotoSeleccionada.titulo}</Text>
              <TouchableOpacity style={SGS.button} onPress={() => setModalVisible(false)}>
                <Text style={SGS.buttonText}>CERRAR</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 2,
  },
  gridItem: {
    width: columnSize,
    height: columnSize, // Hacemos que sea un cuadrado perfecto
    padding: 1, // Pequeña separación entre fotos
  },
  imageGrid: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#222831',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  fullImage: {
    width: '100%',
    height: '70%',
    borderRadius: 15,
    resizeMode: 'contain' // Para ver la foto completa sin recortes
  },
  modalTitle: {
    color: '#00ADB5',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center'
  },
});

export default MyPhotos;