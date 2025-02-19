
import { pool } from './db.js'

// get todos los pokemons favoritos
/**
 * @description: getter de favoritos
 * @returns {Array} 
 */
export const getPokemonsFavs = async () => {
    const connection = await pool.getConnection();  // Obtienes la conexión de la pool
    try {
        // Ejecutas las consultas para crear las tablas
        const rows = await connection.query(`SELECT * FROM favorite`);
        return rows;
    } catch (err) {
        console.error("Error al obtener los pokemons:", err);
        throw err;
    } finally {
        connection.release();  // Libera la conexión para que la pool pueda reutilizarla
    }
};


/**
 * @description: obtener un pokemon fav por el id.
 * @param {Integer} id 
 * @returns {Pokemon} 
 * 
 */
export const getPokemonFavById = async (id) => {
    const connection = await pool.getConnection();  // Obtienes la conexión de la pool
    try {
        const row = await connection.query(`SELECT * FROM favorite WHERE id = ?`, [id]);  
        return row; 
    } catch (error) {
        console.error("Error al obtener el pokemon:", error);
    } finally {
        connection.release(); 
    }
};

/**
 * @description:borra de la bd el favorito mediante el id  
 * @param {Integer} idPokemon 
 */
export const deletePokemonFav = async (idFavorite) => {
    const connection = await pool.getConnection();  // Obtienes la conexión de la pool
    try {
        // Ejecutas las consultas para crear las tablas
        await connection.query(`
        DELETE FROM favorite WHERE id = ?`, [idFavorite]);
        console.log("Pokemon borrado");
    } catch (err) {
        console.error("Error al borrar el pokemon:", err);
    } finally {
        connection.release();  // Libera la conexión para que la pool pueda reutilizarla
    }
};

/**
 * @description: agrega el pokemon a fav
 * @param {Integer} idPokemon 
 */
// agregar pokemon a fav 
export const addPokemonFavs = async (pokemon) => {
    const { id, name, type, experience, abilities, image } = pokemon;
    const connection = await pool.getConnection();  // Obtienes la conexión de la pool
    try {
        // primero compruebo si el pokemon no esta ya en la base de datos
        const row = await connection.query(`SELECT * FROM favorite WHERE id_pokemon = ? AND name = ?`, [id, name]);
        if(row.length !== 0) {
            return null;
        }
        // Ejecutas las consultas para crear las tablas
        await connection.query(`
        INSERT INTO favorite (id_pokemon, name, type, experience, abilities, image) VALUES(?, ?, ?, ?, ?, ?) `, [id, name, JSON.stringify(type), experience, JSON.stringify(abilities), image]);
        console.log("pokemon añadido a fav.");
    } catch (err) {
        console.error("Error al al añadir el pokemon a fav", err);
    } finally {
        connection.release();  // Libera la conexión para que la pool pueda reutilizarla
    }
};

/**
 * 
 * @description: borra toda la data de la tabla favs
 * 
 */
export const deleteAllPokemonsFav = async () => {
    const connection = await pool.getConnection();
    try {
        await connection.query(`DELETE FROM favorite;`);
        console.log("Todos los pokémons favoritos han sido eliminados.");
    } catch (err) {
        console.error("Error al borrar todos los pokémons:", err);
    } finally {
        connection.release(); // Liberamos la conexión
    }
  };
  