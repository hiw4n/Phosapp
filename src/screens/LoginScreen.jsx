import React, { useCallback, useState } from "react";
import { View, Text, TextInput, Alert, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import MyButton from "../components/MyButtons";
// Ruta corregida a tus estilos globales
import { globalStyles as styles } from '../global/styles/Styles.style';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const goToTabs = useCallback(() => {
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  }, [navigation]);

  // 1. LOGIN MANUAL (FIREBASE)
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, rellena todos los campos");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Login Firebase OK");
      goToTabs();
    } catch (error) {
      Alert.alert("Error", "Fallo de conexión o credenciales");
    } finally {
      setLoading(false);
    }
  };

  // 2. BOTÓN TEST: Usuario Coderhouse (Firebase)
  const loginComoDemo = async () => {
    const emailDemo = "terriblehiwan@gmail.com";
    const passDemo = "123456";
    setEmail(emailDemo);
    setPassword(passDemo);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, emailDemo, passDemo);
      console.log("✅ Login Demo Firebase OK");
      goToTabs();
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con la cuenta demo");
    } finally {
      setLoading(false);
    }
  };

  // 3. MODO FANTASMA (Firebase Anónimo)
  const loginAnonimo = async () => {
    setLoading(true);
    try {
      await signInAnonymously(auth);
      console.log("✅ Acceso Anónimo OK");
      goToTabs();
    } catch (error) {
      Alert.alert("Error", "Debes activar 'Anónimo' en la consola de Firebase");
    } finally {
      setLoading(false);
    }
  };

  // 4. ACCESO DIRECTO (Bypass Total - Sin Firebase)
  const accesoDirectoSinFirebase = () => {
    console.log("LOG: Accediendo en modo desarrollo (bypass Firebase)");
    goToTabs();
  };

  return (
    <ScrollView contentContainerStyle={localStyles.scrollContainer} style={{backgroundColor: "#222831"}}>
      <View style={localStyles.innerContainer}>
        <Text style={[styles.logo, { marginBottom: 30 }]}>📸 RetoFoto</Text>

        <TextInput
          style={localStyles.input}
          placeholder="Email"
          placeholderTextColor="#AAA"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={localStyles.input}
          placeholder="Contraseña"
          placeholderTextColor="#AAA"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#00ADB5" />
        ) : (
          <View style={{ width: '100%', marginTop: 10 }}>
            {/* Botón Principal */}
            <MyButton title="ENTRAR" onPress={handleLogin} />
            
            {/* Botón Test Firebase que pedías recuperar */}
            <MyButton
              title="LOGIN TEST (FIREBASE)"
              type="outline"
              onPress={loginComoDemo}
              style={{ marginTop: 10 }}
            />

            {/* Botón de Salto Directo para el Simulador */}
            <MyButton
              title="SALTAR A HOME (OFFLINE)"
              type="outline"
              onPress={accesoDirectoSinFirebase}
              style={{ marginTop: 25, borderColor: '#FF2E63' }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, justifyContent: "center" },
  innerContainer: { padding: 30, alignItems: "center" },
  input: {
    width: '100%',
    backgroundColor: "#393E46",
    color: "#EEE",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default LoginScreen;