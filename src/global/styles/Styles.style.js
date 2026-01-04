// Single Source of Truth (Única Fuente de Verdad).
import { StyleSheet } from 'react-native';
import { COLORS as C} from './_Colors.style';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.background,
  },
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
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#00ADB5',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCaptura: {
    alignItems: 'center',
    marginTop: 20,
  },
  capture: {
    width: 200, 
    height: 200, 
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
  cameraButtonsContainer: {
    flexDirection: 'row', // Alinea botones en horizontal
    justifyContent: 'space-between', // Uno a cada punta
    paddingHorizontal: 30, // Separación de los bordes laterales
    paddingTop: 20, // Separación del borde superior
    width: '100%',
    position: 'absolute', // Clave: flota sobre la cámara sin ocupar espacio "físico"
    top: 0.5,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25, // Botón circular
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Negro translúcido para que resalte sobre cualquier fondo
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Borde sutil
  },
  //NAVIGATOR:
  tabBarStyle: {
    backgroundColor: C.primary, 
    borderTopWidth: 0.5, 
  },
  headerStyle: { 
    backgroundColor: C.primary 
  },
  controlesSuperiores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  botonCircular: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
});

export { globalStyles, C as COLORS };