import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerEstadisticas } from '../services/retosService';
import { globalStyles as SGS } from '../global/styles/Styles.style';

const Profile = () => {
  const [stats, setStats] = useState({ total: 0 });

  useFocusEffect(
    useCallback(() => {
      const data = obtenerEstadisticas();
      setStats(data);
    }, [])
  );

  return (
    <View style={SGS.containerCenter}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>📸</Text>
        </View>
        <Text style={SGS.title}>Mi Perfil Fotográfico</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Retos Completados</Text>
        </View>
        
        {/* Aquí podrías añadir más medallas según el número de fotos */}
        <Text style={styles.rankText}>
          Rango: {stats.total > 10 ? 'Maestro Fotógrafo 🏆' : 'Aprendiz 📷'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#393E46',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#00ADB5',
  },
  avatarText: { fontSize: 50 },
  statsContainer: {
    width: '80%',
    alignItems: 'center',
  },
  statCard: {
    backgroundColor: '#393E46',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
    elevation: 5,
  },
  statNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00ADB5',
  },
  statLabel: {
    color: '#EEEEEE',
    fontSize: 18,
  },
  rankText: {
    marginTop: 30,
    color: '#00ADB5',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default Profile;