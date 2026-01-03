import { db } from "../db/init";

export const guardarRetoEnDB = (titulo, imagen) => {
  // Verificamos que la base de datos esté lista
  if (!db) {
    console.log("La base de datos no está lista");
    return;
  }

  // 2. Aquí ejecutamos el SQL para INSERTAR
  // ¿Cómo completarías la frase SQL dentro de los paréntesis?
  db.runSync("INSERT INTO retos (titulo, imagen) VALUES (?, ?);", [
    titulo,
    imagen,
  ]);

  console.log("✅ Reto guardado en SQLite");
};

export const obtenerRetosDeDB = () => {
  if (!db) return []; // Si la pecera no está lista, devuelve una lista vacía.

  // .getAllSync ejecuta la frase SQL y te devuelve un ARRAY de objetos de golpe.
  // "ORDER BY id DESC" hace que la foto más nueva salga la primera.
  const todosLosRetos = db.getAllSync("SELECT * FROM retos ORDER BY id DESC;");
  return todosLosRetos;
};
