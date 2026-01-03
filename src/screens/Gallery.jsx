import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerRetosDeDB } from '../services/retosService';
import { globalStyles as SGS, COLORS as C } from '../global/styles/Styles.style';

const Gallery = () => {
  const [misRetos, setMisRetos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const datos = obtenerRetosDeDB();
      setMisRetos(datos);
    }, [])
  );

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
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20, width: '100%' }}
        />
      ) : (
        <Text style={{ color: C.primary }}>Captura tu primer reto para verlo aquí 📸</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
  },
  image: { width: '100%', height: 250 },
  info: { padding: 15, backgroundColor: '#222831' },
  retoTitulo: { color: '#00ADB5', fontWeight: 'bold', textAlign: 'center' },
});

export default Gallery;