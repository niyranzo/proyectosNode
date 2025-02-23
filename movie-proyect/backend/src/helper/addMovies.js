import dotenv from "dotenv";
import fetch from "node-fetch";
import Movie from "../models/Movie.js"; // Importa el modelo de película

dotenv.config();

// Función para obtener el tráiler en formato `embed`
const getTrailer = async (movieId) => {
    try {
        const API_URL = `${process.env.MOVIE_URL}${movieId}/videos${process.env.KEY_MOVIE}${process.env.LANGUAJE_MOVIE}`;

        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error al obtener tráiler para la película ${movieId}`);
        }

        const data = await response.json();
        const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");

        return trailer ? `https://www.youtube.com/embed/${trailer.key}` : ""; // Devuelve el link en formato `embed`
    } catch (error) {
        console.error("Error al obtener el tráiler:", error);
    }
};

// Función para obtener los géneros de una película
const getMovieGenres = async (movieId) => {
    try {
        const API_URL = `${process.env.MOVIE_URL}${movieId}${process.env.KEY_MOVIE}${process.env.LANGUAJE_MOVIE}`;
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error al obtener los géneros de la película ${movieId}`);
        }
        const data = await response.json();

        const genres = data.genres.map(genre => genre.name);
        return genres;
    } catch (error) {
        console.error("Error al obtener los géneros:", error);
    }
};

// Función para obtener películas populares de varias páginas y guardarlas en la base de datos
const addMovies = async () => {
    try {

        let moviesAdded = 0;
        // recorro las primeras 4 paginas solo
        for (let page = 1; page <= 4; page++) {
            // construccion de la url
            const API_URL = `${process.env.MOVIE_URL}popular${process.env.KEY_MOVIE}${process.env.LANGUAJE_MOVIE}&page=${page}`;
            
            // fetch a la api
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`No se pudo obtener la página ${page} de películas`);
            }

            const data = await response.json();

            // recorro todas las peliculas y las agrego a la bd
            for (const movie of data.results) {
                const { id, title, poster_path, original_language, backdrop_path, release_date, overview } = movie;

                // verifico si esta la pelicula ya 
                const existingMovie = await Movie.findOne({ id });
                if (existingMovie) {
                    continue; // Pasa a la siguiente película
                }

                const trailer = await getTrailer(id);
                const genres = await getMovieGenres(id);

                // Asegurarse de que los campos no estén vacíos
                const validOverview = overview || "Sin descripción disponible"; // Valor por defecto si no hay descripción
                const validTrailer = trailer || "https://www.youtube.com/embed/default_trailer_key"; // Valor por defecto si no hay tráiler
                const validBackdrop = backdrop_path || "Sin imagen disponible"; // Valor por defecto si no hay imagen 
                
                const newMovie = new Movie({title, poster: poster_path, 
                    backdrop:validBackdrop, language: original_language, date: release_date, 
                    overview:validOverview , trailer:validTrailer, genres: genres
                });

                await newMovie.save();
                moviesAdded++;
            }
        }
        console.log("Se agregaron todas las peliculas")
    } catch (error) {
        console.error("Error al agregar las películas:", error);
    }
};

export default addMovies;
