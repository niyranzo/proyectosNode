import Comment from '../models/Comment.js';
import Movie from '../models/Movie.js';

export const getCommentsMovie = async (req, res) => {
    const { idMovie } = req.params;
    try {
        // Verificar si la película con ese ID existe
        const movie = await Movie.findById(idMovie).lean();
        if (!movie) {
            return res.status(404).json({ mensaje: "Película no encontrada" });
        }

        // Obtener los comentarios de la película
        const comments = await Comment.find({ movieId: idMovie }).lean();

        res.status(200).json(comments);
    } catch (error) {
        console.error("Error al obtener los comentarios:", error);
        res.status(500).json({ mensaje: "Error al obtener los comentarios" });
    }
};

export const createComment = async (req, res) => {
    const { movieId, userId, comment } = req.body;
    try {
        const newComment = new Comment({ movieId, userId, comment });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error al crear el comentario:", error);
        res.status(500).json({ mensaje: "Error al crear el comentario" });
    }
};

export const getCommentsByUser = async (req, res) => {
    const { idUser } = req.params;
    try {
        // Buscar comentarios que coincidan con el userId
        const comments = await Comment.find({ userId: idUser }).lean();
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error al obtener los comentarios por usuario:", error);
        res.status(500).json({ mensaje: "Error al obtener los comentarios por usuario" });
    }
};




