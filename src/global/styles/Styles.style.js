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

  //Buttons
  button: {
    nav:{
      active: C.accent,
      inactive: C.inactive,
    },
    primary:{


    }
  }







});

export { globalStyles, C as COLORS };