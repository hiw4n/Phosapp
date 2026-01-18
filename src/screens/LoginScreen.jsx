import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import MyButton from "../components/MyButtons";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const testNetwork = async () => {
    try {
      const r = await fetch("https://www.google.com", { method: "GET" });
      console.log("✅ fetch google status:", r.status);
    } catch (e) {
      console.log("❌ fetch google failed:", e);
      Alert.alert(
        "Red KO",
        "Tu app NO puede hacer fetch a google.com. Esto es red/entorno (VPN, WiFi, proxy, iOS, Expo Go)."
      );
      return;
    }

    try {
      const r2 = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=FAKE_KEY",
        { method: "POST" }
      );
      console.log("✅ fetch identitytoolkit status:", r2.status);
      const txt = await r2.text();
      console.log("identitytoolkit response:", txt.slice(0, 200));
      Alert.alert(
        "Red OK",
        "Tu app puede llegar a Google APIs. Si el login falla, entonces es configuración SDK/Auth."
      );
    } catch (e) {
      console.log("❌ fetch identitytoolkit failed:", e);
      Alert.alert(
        "Red rara",
        "Puedes llegar a google.com pero NO a identitytoolkit.googleapis.com. Algo bloquea Google APIs."
      );
    }

    try {
      const r3 = await fetch("https://www.googleapis.com/discovery/v1/apis", { method: "GET" });
      console.log("✅ fetch googleapis discovery status:", r3.status);
    } catch (e) {
      console.log("❌ fetch googleapis discovery failed:", e);
    }
  };
 
  const testMore = async () => {
  const urls = [
    "https://identitytoolkit.googleapis.com/",                 // solo host
    "https://securetoken.googleapis.com/",                     // tokens Firebase
    "https://firebaseinstallations.googleapis.com/",           // instalaciones
  ];

  for (const u of urls) {
    try {
      const r = await fetch(u, { method: "GET" });
      console.log("✅", u, "status:", r.status);
    } catch (e) {
      console.log("❌", u, "failed:", e);
    }
  }
};

  const doLogin = async (mail, pass) => {
    if (!mail || !pass) {
      Alert.alert("Error", "Por favor, rellena todos los campos");
      return;
    }

    setLoading(true);
    try {
      const mailClean = mail.trim().toLowerCase();

      console.log("Auth instance:", !!auth);
      console.log("Intentando login con:", mailClean);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        mailClean,
        pass
      );

      console.log("✅ ¡Logueado!", userCredential.user.uid);

      // Aún no navegamos para no mezclar con el error del NavigationContainer
      Alert.alert("Login OK", userCredential.user.email);
    } catch (error) {
      console.log("❌ Error completo:", error);
      console.log("❌ code:", error?.code);
      console.log("❌ message:", error?.message);

      // Mensajes más honestos por tipo de error:
      if (error?.code === "auth/network-request-failed") {
        Alert.alert(
          "Error de red",
          "La app no está logrando contactar con Firebase Auth.\n\nPulsa 'TEST RED' para confirmar si tu app llega a Google."
        );
      } else if (error?.code === "auth/invalid-credential") {
        Alert.alert("Credenciales", "Email o contraseña incorrectos.");
      } else if (error?.code === "auth/user-not-found") {
        Alert.alert("Usuario", "Ese usuario no existe en Firebase Auth.");
      } else if (error?.code === "auth/wrong-password") {
        Alert.alert("Contraseña", "Contraseña incorrecta.");
      } else {
        Alert.alert(
          "Error",
          `${error?.code || "sin-código"}\n${error?.message || ""}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => doLogin(email, password);

  const loginComoDemo = () => {
    const emailDemo = "terriblehiwan@gmail.com";
    const passDemo = "123456";
    setEmail(emailDemo);
    setPassword(passDemo);
    return doLogin(emailDemo, passDemo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>📸 RetoFoto</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#AAA"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#AAA"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#00ADB5" />
      ) : (
        <>
          <MyButton title="ENTRAR" onPress={handleLogin} />
          <MyButton
            title="ENTRAR COMO INVITADO (DEMO)"
            type="outline"
            onPress={loginComoDemo}
          />
          <MyButton
            title="TEST RED"
            type="outline"
            onPress={testNetwork}
          />
          <MyButton title="TEST AUTH HOSTS" type="outline" onPress={testMore} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
    justifyContent: "center",
    padding: 30,
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#00ADB5",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#393E46",
    color: "#EEE",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default LoginScreen;