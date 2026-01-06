import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

let db = null;

if (Platform.OS !== 'web') {
  db = SQLite.openDatabaseSync('phosapp.db');
}

export const initDB = () => {
    
    if (Platform.OS === 'web') return;
    if (!db) {
      console.log("⚠️ Base de datos no disponible aún");
      return;
    }
    db.execSync(`
        CREATE TABLE IF NOT EXISTS retos (
        id INTEGER PRIMARY KEY NOT NULL,
        titulo TEXT NOT NULL,
        imagen TEXT NOT NULL,
        ubicacion TEXT
        );
    `);
  // 2. TRUCO PRO: Intentamos añadir la columna por si la tabla ya existía de antes
  // Esto evita que la app falle si ya tenías la tabla vieja sin 'ubicacion'
  try {
    db.execSync("ALTER TABLE retos ADD COLUMN ubicacion TEXT;");
    console.log("✅ Columna 'ubicacion' añadida con éxito");
  } catch (e) {
    // Si ya existe, dará error, pero lo ignoramos tranquilamente
    console.log("ℹ️ La columna 'ubicacion' ya existe, saltando...");
  }
    console.log("🗄️ Base de datos inicializada correctamente");
};

export { db };