import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
// useFocusEffect: Hook fundamental para apps con pestañas (Tabs)
import { useFocusEffect } from '@react-navigation/native';
// Importamos tu lógica de lectura de SQLite
import { obtenerRetosDeDB } from '../services/retosService';
import { globalStyles as SGS, COLORS as C } from '../global/styles/Styles.style';

const Gallery = () => {
  // Estado local para almacenar la lista de retos
  const [misRetos, setMisRetos] = useState([]);

  // Se dispara cada vez que el usuario pulsa la pestaña "Comunidad"
  useFocusEffect(
    useCallback(() => {
      const datos = obtenerRetosDeDB();
      setMisRetos(datos); // Actualizamos el estado con la info de la DB
    }, [])
  );

  // Definimos cómo se ve cada tarjeta de la galería
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Importante: source={{ uri: ... }} para rutas de archivos locales */}
      <Image source={{ uri: item.imagen }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.retoTitulo}>{item.titulo}</Text>
      </View>
    </View>
  );

  return (
    <View style={SGS.containerCenter}>
      {misRetos.length > 0 ? (
        <FlatList
          data={misRetos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20, width: '100%' }}
        />
      ) : (
        <Text style={{ color: C.primary, textAlign: 'center' }}>
          No hay retos guardados. ¡Ve a Inicio y captura uno! 📸
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden', // Crucial para que la imagen no tape los bordes redondeados
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover', // Mantiene la proporción llenando el espacio
  },
  info: {
    padding: 15,
    backgroundColor: '#222831',
  },
  retoTitulo: {
    color: '#00ADB5',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
});

export default Gallery;