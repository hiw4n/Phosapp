import { db } from "../db/init";

export const guardarRetoEnDB = (titulo, imagen, ubicacion) => {
  // Verificamos que la base de datos esté lista
  if (!db) {
    console.log("La base de datos no está lista");
    return;
  }

  // Aquí ejecutamos el SQL para INSERTAR
  db.runSync("INSERT INTO retos (titulo, imagen, ubicacion) VALUES (?, ?, ?);", 
    [ titulo, imagen, ubicacion || "Ubicación desconocida",]
  );
  console.log("✅ Reto guardado en SQLite");
};

export const obtenerRetosDeDB = () => {
  if (!db) return []; // Si la pecera no está lista, devuelve una lista vacía.

  // .getAllSync ejecuta la frase SQL y te devuelve un ARRAY de objetos de golpe.
  // "ORDER BY id DESC" hace que la foto más nueva salga la primera.
  const todosLosRetos = db.getAllSync("SELECT * FROM retos ORDER BY id DESC;");
  return todosLosRetos;
};

export const eliminarRetoDeDB = (id) => {
  if (!db) {
    console.log("La base de datos no está lista");
    return;
  }

  // Ejecutamos la frase SQL para BORRAR el reto con el id dado.
  db.runSync("DELETE FROM retos WHERE id = ?;", [id]);

  console.log(`🗑️ Reto con id ${id} eliminado de SQLite`);
}

export const obtenerEstadisticas = () => {
  if (!db) return { total: 0 };
  
  // Ejecutamos el conteo
  const resultado = db.getFirstSync("SELECT COUNT(*) as total FROM retos;");
  return resultado; // Devuelve algo como { total: 5 }
};