import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
// Hook de navegación para detectar cuando la pantalla "entra en foco"
import { useFocusEffect } from '@react-navigation/native';
// Importamos la lógica de lectura que ya tienes en tu service
import { obtenerRetosDeDB } from '../services/retosService';
import { globalStyles as SGS, COLORS as C } from '../global/styles/Styles.style';

const Gallery = () => {
  // Definimos el estado 'misRetos' como un array vacío inicialmente
  const [misRetos, setMisRetos] = useState([]);

  // useFocusEffect es vital: se dispara cada vez que pulsas la pestaña "Comunidad"
  useFocusEffect(
    useCallback(() => {
      const datos = obtenerRetosDeDB();
      setMisRetos(datos); // "Seteamos" los datos en el estado
    }, [])
  );

  // RenderItem: La plantilla de cada tarjeta de la galería
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
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
          keyExtractor={(item) => item.id.toString()} // ID único para cada fila
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20, width: '100%' }}
        />
      ) : (
        <Text style={{ color: C.primary }}>Aún no hay retos capturados. 📸</Text>
      )}
    </View>
  );
};

// Estilos locales para la tarjeta
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  info: {
    padding: 15,
    backgroundColor: '#222831',
  },
  retoTitulo: {
    color: '#00ADB5',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default Gallery;