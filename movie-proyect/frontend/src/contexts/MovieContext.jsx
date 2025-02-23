import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from 'react-toastify';
const API_MOVIE = import.meta.env.VITE_API_MOVIE

const MovieContext = createContext();

export const useMovie = () => {
    const context = useContext(MovieContext);
    if (context === undefined) {
        throw new Error("useMovie debe ser usado dentro del contexto");
    }
    return context;
};

export const MovieProvider = ({children}) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);

    // Cargar favoritos cuando el componente se monta
    

    async function fetchMoviePage(page){
        try { 
            const response = await fetch(`${API_MOVIE}movie/page/${page}`);
            if(!response.ok){
                throw new Error("No se pudo traer las pelis");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("No se pudo realizar el fetch", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    async function getMovieId(id){
        try {
            const response = await fetch(`${API_MOVIE}movie/${id}`);
            if(!response.ok){
                throw new Error("No se pudo traer las pelis");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("No se pudo realizar el fetch", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchFav() {
        try {
            const response = await fetch(`${API_MOVIE}favorite/${user._id}`);
            if (!response.ok) {
                throw new Error("Error en el fetch");
            }
    
            // Obtenemos solo los movieId (desestructuramos los datos)
            const movieIds = await response.json();
    
            // Usamos Promise.all para hacer todas las solicitudes a la vez
            const movies = await Promise.all(
                movieIds.map(async (movieId) => {
                    return await getMovieId(movieId);
                })
            );
    
            // Guardamos las películas en el estado
            setFavorites(movies);
    
        } catch (error) {
            console.error("Error al traer los favoritos", error);
            setFavorites([]); // En caso de error, dejamos los favoritos vacíos
        }
    }

    const addToFavorites = async (movie) => {
        if (favorites.some(m => m._id === movie._id)) {
            toast.error(`La película ${movie.title} ya está en favoritos`, {
                style: {
                    background: 'red',
                    color: 'white',
                    border: '1px solid black',
                },
                icon: '⭐',
            });
            return;
        }

        try {
            const response = await fetch(`${API_MOVIE}favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movieId: movie._id, userId: user._id }),
            });

            if (!response.ok) {
                if (response.status === 400) {
                    toast.error("Ya esta la pelicula en favoritos");
                    throw new Error("Ya esta la pelicula en favoritos");
                }
                throw new Error("No se pudo guardar la película favorita");
            }

            // Actualizamos el estado después de confirmar que se guardó en la BD
            setFavorites(prevFav => [...prevFav, movie]);

            toast.success(`La película ${movie.title} se añadió a favoritos`, {
                style: {
                    background: 'green',
                    color: 'white',
                    border: '1px solid black',
                },
                icon: '⭐',
            });
        } catch (error) {
            console.error("Error al añadir favorito:", error);
            toast.error("Error al añadir a favoritos");
        }
    }

    const removeFromFavorites = async (movieId) => {
        try {
            const response = await fetch(`${API_MOVIE}favorite/${user._id}/${movieId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error("No se pudo borrar la película de favoritos");
            }
    
            setFavorites(prevFav => prevFav.filter(movie => movie._id !== movieId));
    
            toast.info("Película eliminada de favoritos", {
                style: {
                    background: "blue",
                    color: "white",
                    border: "1px solid black"
                },
                icon: "🗑️"
            });
    
        } catch (error) {
            console.error("Error al eliminar favorito:", error);
            toast.error("Error al eliminar de favoritos");
        }
    };

    const fetchCommentsUser = async () => {
        try {
            const response = await fetch(`${API_MOVIE}comment/user/${user._id}`);
            if(!response.ok){
                throw new Error("No se pudo traer los comentarios");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al traer los comentarios")
            setError("Error al traer los comentarios")
        }
    }

    const fetchCommentsMovie = async (movieId) => {
        try {
            const response = await fetch(`${API_MOVIE}comment/movie/${movieId}`);
            if(!response.ok){
                throw new Error("No se pudo traer los comentarios");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al traer los comentarios")
            setError("Error al traer los comentarios")
        }
    }

    const addComment = async (movieId, comment) => {
        try {
            const response = await fetch(`${API_MOVIE}comment/`,{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movieId, userId: user._id, comment })
            });

        } catch (error) {
            console.error("Error a traer los comentarios", error);
            setError("Error a traer los comentarios", error);
        }
    }

        // Función para buscar películas por título
    const fetchMoviesByTitle = async (title) => {
        setLoading(true);
        try {
            console.log(`Fetching: ${API_MOVIE}movie/search/${title}`); // Debug log
            const response = await fetch(`${API_MOVIE}movie/search/${title}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.mensaje || "No se pudieron obtener las películas");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al buscar películas:", error);
            setError(error.message);
            return []; // Return empty array on error
        } finally {
            setLoading(false);
        }
    };


    return (
        <MovieContext.Provider value={{ 
            loading, 
            error, 
            favorites, 
            fetchMoviePage, 
            getMovieId, 
            addToFavorites, 
            removeFromFavorites,
            fetchFav,
            addComment, 
            fetchCommentsMovie,
            fetchCommentsUser,
            fetchMoviesByTitle
        }}>
            {children}
        </MovieContext.Provider>
    );
}