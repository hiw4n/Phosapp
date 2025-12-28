import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../global/styles/styles.style'; // Ajusta la ruta a tu archivo

const MyGallery = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyGallery</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#393E46' // Luego usaremos tu archivo de colores
  },
  title: {
    color: '#EEEEEE',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default MyGallery;