import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { globalStyles as SGS } from '../../global/styles/Styles.style';

const DesignSystem = () => {
  return (
    <ScrollView style={styles.container}>







        
      <Text style={styles.mainTitle}>UI Design System</Text>
      
      {/* SECCIÓN DE COLORES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colores Principales</Text>
        <View style={styles.row}>
          <View style={[styles.colorBox, { backgroundColor: '#222831' }]}><Text style={styles.colorText}>#222831</Text></View>
          <View style={[styles.colorBox, { backgroundColor: '#393E46' }]}><Text style={styles.colorText}>#393E46</Text></View>
          <View style={[styles.colorBox, { backgroundColor: '#00ADB5' }]}><Text style={styles.colorText}>#00ADB5</Text></View>
          <View style={[styles.colorBox, { backgroundColor: '#EEEEEE' }]}><Text style={[styles.colorText, {color: '#000'}]}>#EEEEEE</Text></View>
        </View>
      </View>

      {/* SECCIÓN DE TIPOGRAFÍA */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipografía</Text>
        <Text style={SGS.title}>Título Principal (SGS.title)</Text>
        <Text style={SGS.retoText}>Texto de Reto (SGS.retoText)</Text>
        <Text style={styles.bodyText}>Este es un texto de cuerpo estándar para descripciones largas.</Text>
      </View>

      {/* SECCIÓN DE BOTONES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Botones e Interacción</Text>
        
        <TouchableOpacity style={SGS.button}>
          <Text style={SGS.buttonText}>BOTÓN PRIMARIO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[SGS.button, { backgroundColor: '#FF5722', marginTop: 10 }]}>
          <Text style={SGS.buttonText}>BOTÓN PELIGRO / BORRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonOutline}>
          <Text style={styles.botonOutlineText}>BOTÓN OUTLINE</Text>
        </TouchableOpacity>
      </View>

      {/* SECCIÓN DE TARJETAS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contenedores (Cards)</Text>
        <View style={SGS.card}>
          <Text style={SGS.retoText}>Contenedor tipo Card</Text>
          <Text style={{color: '#AAA'}}>Utilizado para resaltar información importante sobre el fondo.</Text>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222831', padding: 20 },
  mainTitle: { fontSize: 32, fontWeight: 'bold', color: '#00ADB5', marginBottom: 25, textAlign: 'center' },
  section: { marginBottom: 40, borderBottomWidth: 1, borderBottomColor: '#393E46', pb: 20 },
  sectionTitle: { fontSize: 18, color: '#00ADB5', marginBottom: 15, fontWeight: '600', textTransform: 'uppercase' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  colorBox: { width: 70, height: 70, borderRadius: 10, justifyContent: 'center', alignItems: 'center', padding: 5 },
  colorText: { fontSize: 10, color: '#fff', fontWeight: 'bold' },
  bodyText: { color: '#EEEEEE', fontSize: 16, lineHeight: 22 },
  botonOutline: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#00ADB5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  botonOutlineText: { color: '#00ADB5', fontWeight: 'bold' }
});

export default DesignSystem;