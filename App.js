import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Navegacion de la App
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  return <MainNavigator />;
}

const styles = StyleSheet.create({
});
