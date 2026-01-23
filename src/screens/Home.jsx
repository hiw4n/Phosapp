import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { db } from '../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import ChallengeCard from '../components/ChallengeCard';
import MyButton from '../components/MyButtons';
import { globalStyles as styles } from '../global/styles/Styles.style';
import localChallenges from '../db/retos.json';

const pickRandomChallenge = (list) => {
  if (!list?.length) return null;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};

const HomeScreen = () => {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const navigation = useNavigation(); // Inicializa la navegación aquí

  const fetchRandomChallenge = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "challenges"));
      const challengesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (challengesList.length > 0) {
        const random = challengesList[Math.floor(Math.random() * challengesList.length)];
        setChallenge(random);
        setStatusMessage('');
        return;
      }
      throw new Error('Sin datos remotos');
    } catch (error) {
      console.warn("Error al cargar retos desde Firestore, usando modo offline:", error?.message ?? error);
      const backup = pickRandomChallenge(localChallenges);
      if (backup) {
        setChallenge(backup);
        setStatusMessage('Modo offline: reto cargado desde la base local.');
      } else {
        setStatusMessage('No se pudieron cargar retos locales.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomChallenge();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#00ADB5" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={[styles.title, { marginBottom: 20, textAlign: 'left' }]}>Reto del día</Text>
      {statusMessage ? (
        <Text style={{ color: '#F9ED69', marginBottom: 10 }}>{statusMessage}</Text>
      ) : null}
      
      <ChallengeCard challenge={challenge} />

      <View style={{ marginTop: 20 }}>
        <MyButton 
          title="CAMBIAR RETO" 
          type="outline" 
          onPress={fetchRandomChallenge} 
        />
        <MyButton 
          title="ACEPTAR RETO Y HACER FOTO"
          onPress={() => navigation.navigate('Camera', { challengeTitle: challenge?.title ?? 'Reto del día' })} 
          style={{ marginTop: 15 }}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;  