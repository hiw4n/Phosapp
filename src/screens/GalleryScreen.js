import React, { useMemo } from 'react';
import { View, FlatList, Image, RefreshControl, StyleSheet, Text } from 'react-native';
import { usePhotos } from '../context/PhotoContext';

const GalleryScreen = () => {
  const { photos, isLoading, refreshPhotos } = usePhotos();

  const formattedPhotos = useMemo(() => (
    photos.map((photo) => ({
      ...photo,
      friendlyDate: photo.createdAt ? new Date(photo.createdAt).toLocaleDateString() : ''
    }))
  ), [photos]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Retos Capturados</Text>
      {formattedPhotos.length === 0 && !isLoading ? (
        <Text style={styles.empty}>Aún no has cumplido ningún reto.</Text>
      ) : (
        <FlatList
          data={formattedPhotos}
          numColumns={2}
          keyExtractor={(item) => item.uri}
          refreshControl={(
            <RefreshControl
              colors={["#00ADB5"]}
              refreshing={isLoading}
              onRefresh={refreshPhotos}
            />
          )}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.uri }} style={styles.image} />
              <Text style={styles.challenge}>{item.challengeTitle}</Text>
              {item.friendlyDate ? (
                <Text style={styles.date}>{item.friendlyDate}</Text>
              ) : null}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222831', padding: 10 },
  title: { color: '#00ADB5', fontSize: 24, fontWeight: 'bold', marginVertical: 20, textAlign: 'center' },
  card: { width: '48%', margin: '1%', backgroundColor: '#393E46', borderRadius: 12, overflow: 'hidden' },
  image: { width: '100%', height: 180 },
  challenge: { color: '#EEE', fontSize: 14, fontWeight: '600', paddingHorizontal: 8, paddingTop: 8 },
  date: { color: '#B8B8B8', fontSize: 12, paddingHorizontal: 8, paddingBottom: 10 },
  empty: { color: '#EEE', textAlign: 'center', marginTop: 50 }
});

export default GalleryScreen;