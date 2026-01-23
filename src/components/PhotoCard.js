import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PhotoCard = ({ photoUri, isGrid }) => {
  const fileName = photoUri.split('/').pop();
  
  const imageSize = isGrid ? (width / 2) - 15 : width;

  return (
    <View style={[styles.card, isGrid && styles.cardGrid]}>
      {!isGrid && (
        <View style={styles.header}>
          <View style={styles.avatar}><Text style={styles.avatarText}>P</Text></View>
          <View>
            <Text style={styles.username}>Usuario PhosApp</Text>
            <Text style={styles.location}>Reto Completado</Text>
          </View>
        </View>
      )}

      <Image 
        source={{ uri: photoUri }} 
        style={{ width: imageSize, height: imageSize, backgroundColor: '#333', borderRadius: isGrid ? 8 : 0 }} 
      />

      <View style={styles.footer}>
        <Text style={[styles.description, isGrid && styles.descriptionGrid]}>
          {isGrid ? 'Reto' : <Text style={styles.bold}>Reto:</Text>} {fileName.includes('photo') ? 'Luz' : 'Blur'}
        </Text>
        {!isGrid && <Text style={styles.timestamp}>Publicado ahora</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#1E1E1E', marginBottom: 15 },
  cardGrid: { margin: 5, borderRadius: 8, overflow: 'hidden', marginBottom: 5 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  avatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#00ADB5', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  avatarText: { color: '#FFF', fontSize: 12 },
  username: { color: '#EEE', fontWeight: 'bold', fontSize: 13 },
  location: { color: '#888', fontSize: 11 },
  footer: { padding: 8 },
  description: { color: '#EEE', fontSize: 14 },
  descriptionGrid: { fontSize: 11, textAlign: 'center', color: '#00ADB5', fontWeight: 'bold' },
  bold: { fontWeight: 'bold', color: '#00ADB5' },
  timestamp: { color: '#666', fontSize: 10, marginTop: 5 },
});

export default PhotoCard;