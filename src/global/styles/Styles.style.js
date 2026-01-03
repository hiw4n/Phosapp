// Single Source of Truth (Única Fuente de Verdad).
import { StyleSheet } from 'react-native';
import { COLORS as C} from './_Colors.style';

const globalStyles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: C.background,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: C.text,
  },
  card: {
    backgroundColor: C.primary,
    padding: 30,
    borderRadius: 15,
    marginVertical: 20,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.accent
  },
  retoText: { 
    color: C.background, 
    fontSize: 18, 
    textAlign: 'center', 
    fontWeight: 'bold' 
  },
  title: { 
    color: C.accent, 
    fontSize: 14, 
    letterSpacing: 2 
  },

  //Buttons
  button: {
    backgroundColor: C.accent, 
    padding: 15, 
    borderRadius: 10,
  },
  buttonText: { 
    color: 'white', 
    fontWeight: 'bold',
    textAlign: 'center',
  },


  cameraContainer: {
    width: '90%',
    minHeight: 300,
    height: 300, // Altura fija para empezar
    borderRadius: 20,
    overflow: 'hidden', // Para que la cámara respete las esquinas redondeadas
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#00ADB5',
  },
  camera: {
    flex: 1, // Que ocupe todo el espacio de su contenedor
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capture: {
    width: 200, 
    height: 200, 
    borderRadius: 10,
  },


  //NAVIGATOR:
  tabBarStyle: {
    backgroundColor: C.primary, 
    borderTopWidth: 0.5, 
  },
  headerStyle: { backgroundColor: C.primary },

});

export { globalStyles, C as COLORS };