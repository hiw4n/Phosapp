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
        imagen TEXT NOT NULL
        );
    `);

    console.log("🗄️ Base de datos inicializada correctamente");
};

export { db };