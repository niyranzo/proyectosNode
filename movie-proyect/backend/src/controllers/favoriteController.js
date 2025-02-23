import Favorite from "../models/Favorite.js";
import User from "../models/User.js";

export const getFavorites = async (req, res) => {
    try {
        const { userId } = req.params; // Obtener el ID del usuario desde los parámetros

        if (!userId) {
            return res.status(400).json({ mensaje: "El ID del usuario es requerido" });
        }

        // Verificar si el usuario con ese ID existe
        const user = await User.findById(userId); // Buscar al usuario en la base de datos

        if (!user) {
            // Si no se encuentra el usuario
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Obtener los favoritos del usuario, ajustado para el campo userId
        const favoritos = await Favorite.find({ userId: userId }).lean(); // Filtrar por userId

        if (favoritos.length === 0) {
            return res.status(200).json({ mensaje: "El usuario no tiene favoritos aún." });
        }

        res.status(200).json(favoritos.map(fav => fav.movieId));
    } catch (error) {
        console.error("Error al obtener los favoritos:", error);
        res.status(500).json({ mensaje: "Error al obtener los favoritos" });
    }
};

export const addFavorite = async (req, res) => {
    try {
        const { movieId, userId } = req.body;  

        // Verificamos si el favorito ya existe
        const existingFavorite = await Favorite.findOne({ movieId, userId });

        if (existingFavorite) {
            return res.status(400).json({ mensaje: "Este favorito ya existe" });
        }

        const newFavorite = new Favorite({ userId, movieId,});

        await newFavorite.save();
        res.status(201).json({ mensaje: "Favorito añadido con éxito", favorito: newFavorite });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al añadir el favorito", error });
    }
};

export const deleteFavorite = async (req, res) => {
    try {
        const { movieId, userId } = req.params;  // Accedemos a los parámetros de la URL

        // Buscamos y eliminamos el favorito
        const deletedFavorite = await Favorite.findOneAndDelete({ movieId, userId });

        if (!deletedFavorite) {
            return res.status(404).json({ mensaje: "No se encontró el favorito" });
        }

        res.status(200).json({ mensaje: "Favorito eliminado con éxito", favorito: deletedFavorite });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el favorito", error });
    }
};
;

