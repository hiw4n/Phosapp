import { db } from "../db/init";

export const guardarRetoEnDB = (titulo, imagen, ubicacion) => {
  if (!db) {
    console.log("La base de datos no está lista");
    return;
  }

  db.runSync("INSERT INTO retos (titulo, imagen, ubicacion) VALUES (?, ?, ?);", 
    [ titulo, imagen, ubicacion || "Ubicación desconocida",]
  );
  console.log("✅ Reto guardado en SQLite");
};

export const obtenerRetosDeDB = () => {
  if (!db) return []; 

  const todosLosRetos = db.getAllSync("SELECT * FROM retos ORDER BY id DESC;");
  return todosLosRetos;
};

export const eliminarRetoDeDB = (id) => {
  if (!db) {
    console.log("La base de datos no está lista");
    return;
  }

  db.runSync("DELETE FROM retos WHERE id = ?;", [id]);

  console.log(`🗑️ Reto con id ${id} eliminado de SQLite`);
}

export const obtenerEstadisticas = () => {
  if (!db) return { total: 0 };
  
  const resultado = db.getFirstSync("SELECT COUNT(*) as total FROM retos;");
  return resultado; 
};