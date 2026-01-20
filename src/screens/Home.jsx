import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { db } from '../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import ChallengeCard from '../components/ChallengeCard';
import MyButton from '../components/MyButtons';
import { globalStyles as styles } from '../global/styles/Styles.style';

const HomeScreen = () => {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

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
      }
    } catch (error) {
      console.error("Error al cargar retos:", error);
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
      
      <ChallengeCard challenge={challenge} />

      <View style={{ marginTop: 20 }}>
        <MyButton 
          title="CAMBIAR RETO" 
          type="outline" 
          onPress={fetchRandomChallenge} 
        />
        <MyButton 
          title="ACEPTAR RETO Y HACER FOTO" 
          onPress={() => console.log("Abrir Cámara...")} 
          style={{ marginTop: 15 }}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;