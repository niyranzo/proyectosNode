import mariadb from 'mariadb';

// Pool para crear la base de datos
export const oldPool = mariadb.createPool({
  host: process.env.DB_HOST || 'mariadb',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
});

// Crea la base de datos
async function createDatabase() {
  let conn;
  try {
    conn = await oldPool.getConnection();
    await conn.query('CREATE DATABASE IF NOT EXISTS Pokemons');
    console.log('Base de datos "Pokemons" creada correctamente.');
  } catch (err) {
    console.error('Error al crear la base de datos:', err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

// Pool principal para la base de datos Pokemons
export const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'mariadb',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'Pokemons',
}); 

// Función para inicializar la base de datos
export const initializeDatabase = async () => {
  try {
    await createDatabase();
    await createPokemonTable();
    await createPokemonFavTable();
    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
};

// Función para crear la tabla de pokemons
const createPokemonTable = async () => {
  const connection = await pool.getConnection();  // Obtienes la conexión de la pool
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS pokemons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type JSON NOT NULL,
        experience INT NOT NULL,
        abilities JSON NOT NULL,
        image VARCHAR(500) NOT NULL
      )
    `);
    console.log("Tabla 'pokemons' creada exitosamente.");
  } catch (err) {
    console.error("Error al crear la tabla de pokemons:", err);
  } finally {
    connection.release();  // Libera la conexión para que la pool pueda reutilizarla
  }
};

// Función para crear la tabla de favoritos
export const createPokemonFavTable = async () => {
  const connection = await pool.getConnection();  // Obtienes la conexión de la pool
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS favorite (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_pokemon INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        type JSON NOT NULL,
        experience INT NOT NULL,
        abilities JSON NOT NULL,
        image VARCHAR(500) NOT NULL
      )
    `);
    console.log("Tabla 'favorite' creada exitosamente.");
  } catch (err) {
    console.error("Error al crear la tabla 'favorite':", err);
  } finally {
    connection.release();  // Libera la conexión para que la pool pueda reutilizarla
  }
};
