import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Directory, Paths, File } from 'expo-file-system';
import PhotoCard from '../components/PhotoCard'; 

export default function GalleryScreen() {
  const [photos, setPhotos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadPhotos = async () => {
        try {
          const documentsDir = new Directory(Paths.document);
          documentsDir.create({ idempotent: true });
          const files = await documentsDir.list();
          const jpgPhotos = files
            .filter(entry => entry instanceof File)
            .filter(file => file.name?.toLowerCase().endsWith('.jpg'))
            .map(file => file.uri);
          
          setPhotos(jpgPhotos.reverse());
        } catch (error) {
          console.error("Error cargando galería:", error);
        }
      };
      loadPhotos();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerNav}>
        <Text style={styles.headerTitle}>PhosApp Feed</Text>
      </View>

      {photos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay capturas recientes.</Text>
        </View>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item}
          numColumns={1}
          renderItem={({ item }) => <PhotoCard photoUri={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  headerNav: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
    backgroundColor: '#121212',
  },
  headerTitle: { color: '#00ADB5', fontSize: 20, fontWeight: 'bold', letterSpacing: 1 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#888', fontSize: 16 }
});