import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MyButton = ({ title, onPress, type = 'primary', style }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        type === 'danger' && styles.buttonDanger,
        type === 'outline' && styles.buttonOutline,
        style
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.text,
        type === 'outline' && styles.textOutline
      ]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00ADB5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  buttonDanger: { backgroundColor: '#FF5722' },
  buttonOutline: { 
    backgroundColor: 'transparent', 
    borderWidth: 2, 
    borderColor: '#00ADB5' 
  },
  text: { color: '#EEEEEE', fontWeight: 'bold', fontSize: 16 },
  textOutline: { color: '#00ADB5' }
});

export default MyButton;