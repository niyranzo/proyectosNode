import {pool} from './db.js' //importar la conexion de la bd

// get todos los pokemons
/**
 * 
 * @description: getter de los pokemons
 * @returns {Array} 
 * 
 */
export const getPokemons = async () => {
    const connection = await pool.getConnection();  // Obtienes la conexión de la pool
    try {
        // Ejecutamos la consulta y obtenemos los resultados
        const rows = await connection.query(`SELECT * FROM pokemons`);
        return rows;  // Devolvemos los resultados
    } catch (err) {
        console.error("Error al obtener los pokemons:", err);
        throw err;  // Lanzamos el error para que quien llame a esta función lo maneje
    } finally {
        connection.release();  // Liberamos la conexión para que la pool pueda reutilizarla
    }
};

/**
 * @description: traer un pokemon por su nombre
 * @param {String} name 
 * @returns {Pokemon}
 */
export const getPokemonsByName = async (name) => {
    const connection = await pool.getConnection();
    try {
        // Ejecutamos la consulta y obtenemos los resultados
        const row = await connection.query(`SELECT * FROM pokemons WHERE name = ? `, [name]);
        return row[0];  // Devolvemos los resultados
    } catch (error) {
        console.error("Error al obtener los pokemons:", err);
        throw err;
    }finally{
        connection.release();  // Liberamos la conexión para que la pool pueda reutilizarla
    }
}

/**
 * @description: obtener un pokemon por el id.
 * @param {Integer} id 
 * @returns {Pokemon} 
 * 
 */
export const getPokemonById = async (id) => {
    const connection = await pool.getConnection();  // Obtienes la conexión de la pool
    try {
        const row = await connection.query(`SELECT * FROM pokemons WHERE id = ?`, [id]);  
        return row[0];  // Retorna el primer resultado o null si no hay datos
    } catch (error) {
        console.error("Error al obtener el pokemon:", error);
    } finally {
        connection.release(); 
    }
};

/**
 * @description: agregar pokemon 
 * @param {Integer} id 
 * @param {String} name 
 * @param {JSON} type 
 * @param {Integer} experience 
 * @param {JSON} abilities 
 */
export const addPokemon = async (id, name, type, experience, abilities, image) => {
    const connection = await pool.getConnection();  // Obtienes la conexión de la pool
    try {
        // Ejecutas las consultas para crear las tablas
        await connection.query(`
        INSERT INTO pokemons (id, name, type, experience, abilities, image) VALUES(?, ?, ?, ?, ?, ?) `, [id, name, JSON.stringify(type), experience, JSON.stringify(abilities), image]);
        console.log("Añadido el pokemon");
    } catch (err) {
        console.error("Error al añadir el pokemon:", err);
    } finally {
        connection.release();  // Libera la conexión para que la pool pueda reutilizarla
    }
};

/**
 * 
 * @description: borra toda la data de la tabla pokemons
 * 
 */
export const deleteAllPokemons = async () => {
  const connection = await pool.getConnection();
  try {
      await connection.query(`DELETE FROM pokemons;`);
      console.log("Todos los pokémons han sido eliminados.");
  } catch (err) {
      console.error("Error al borrar todos los pokémons:", err);
  } finally {
      connection.release(); // Liberamos la conexión
  }
};





