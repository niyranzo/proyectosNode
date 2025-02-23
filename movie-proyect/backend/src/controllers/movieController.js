import Movie from "../models/Movie.js";

export const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find().lean();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las peliculas" });
    }
};


export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id).lean();
        
        if (!movie) {
            return res.status(404).json({ mensaje: "Película no encontrada" });
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la película" });
    }
};

export const addMovie = async (req, res) => {
    try {
        const { title, poster, languaje, date, overview, trailer, genres } = req.body;
                
        if ( !title || !poster || !languaje || !date || !overview || !trailer || !genres) {
            return res.status(400).json({ mensaje: "Faltan datos requeridos" });
        }
        
        const newMovie = new Movie({title,poster,languaje,date,overview,trailer,genres});

        await newMovie.save();

        res.status(201).json({ mensaje: "Película añadida correctamente", movie: newMovie });
    } catch (error) {
        // Manejo de errores
        console.error("Error al añadir la película:", error);
        res.status(500).json({ mensaje: "Error al añadir la película" });
    }
};

export const getMoviesByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        
        if (!title) {
            return res.status(400).json({ mensaje: "Se requiere el título de la película" });
        }

        const movies = await Movie.find({ title: new RegExp(title, 'i') }).lean();
        
        if (movies.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron películas" });
        }

        res.status(200).json(movies);

    } catch (error) {
        console.error("Error al obtener películas por título:", error);
        res.status(500).json({ mensaje: "Error al obtener las películas" });
    }
};

// funcion para tener 10 pelis x pagina 
export const getMoviesByPage = async (req, res) => {
    try {
        const page = parseInt(req.params.page) || 1; //si no recibe nada se le asigna 1
        const limit = 10; 
        const skip = (page - 1) * limit; // Calcula cuántos documentos saltar

        // Consulta en la base de datos con paginación
        const movies = await Movie.find().skip(skip).limit(limit);

        // Obtiene el total de películas para calcular el número de páginas
        const totalMovies = await Movie.countDocuments();
        const totalPages = Math.ceil(totalMovies / limit);

        res.json({page, totalPages, totalMovies, movies});
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las películas", error});
    }
};
