import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// 1. Importamos el hook useNavigation
import { useNavigation } from '@react-navigation/native'; 
import MyButton from '../components/MyButtons';

const WelcomeScreen = () => { // Quitamos { navigation } de aquí
  
  // 2. Inicializamos la navegación dentro del componente
  const navigation = useNavigation();
  const goToTabs = useCallback(() => {
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>📸 PhosApp</Text>
      <Text style={styles.subtitle}>Elige cómo quieres entrar:</Text>

      <View style={styles.buttonContainer}>
        <MyButton 
          title="ACCEDER CON FIREBASE" 
          onPress={() => navigation.navigate('Login')} 
        />

        <View style={{ height: 20 }} />

        <MyButton 
          title="ACCESO DIRECTO (MODO LOCAL)" 
          type="outline"
          onPress={goToTabs}
        />
      </View>
      
      <Text style={styles.footer}>Proyecto Coderhouse - PhosApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f1624',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#E6E6E6',
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 12,
  },
  footer: {
    marginTop: 40,
    fontSize: 12,
    color: '#8F9BB3',
  },
});

export default WelcomeScreen;