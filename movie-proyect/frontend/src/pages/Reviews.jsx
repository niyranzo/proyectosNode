import React, { useEffect, useState } from 'react';
import { PuffLoader } from "react-spinners"; // Loader si se están cargando los comentarios
import { useMovie } from '../contexts/MovieContext'; // Usamos el contexto de MovieContext
import { useAuth } from '../contexts/AuthContext';

const Reviews = () => {
  const { user } = useAuth(); // Obtener el usuario actual desde el contexto
  const { fetchCommentsUser, getMovieId, error } = useMovie(); // Desestructuramos la función de fetch y los estados
  const [comments, setComments] = useState([]); // Para almacenar los comentarios

  // Función para obtener los comentarios del usuario
  const fetchUserComments = async () => {
    try {
      const data = await fetchCommentsUser(); // Llamar la función desde el contexto
      console.log("Comentarios obtenidos:", data); // Verifica que los comentarios están llegando

      // Para cada comentario, obtener el nombre de la película
      const commentsWithMovieTitles = await Promise.all(data.map(async (comment) => {
        const movie = await getMovieId(comment.movieId); // Obtener la película por ID usando getMovieId
        return {
          ...comment,
          movieTitle: movie?.title || "Película no encontrada", // Asignar el título de la película
        };
      }));

      setComments(commentsWithMovieTitles); // Guardamos los comentarios con los títulos
    } catch (error) {
      console.error("Error al traer los comentarios:", error);
    }
  };

  // Llamar a la función para obtener los comentarios cuando el componente se monta
  useEffect(() => {
    if (user?._id) {
      fetchUserComments();
    }
  }, [user]); // Ejecutar cuando el usuario cambie

  // Si ocurre un error
  if (error) {
    return (
      <div className="text-center p-10">
        <h2 className="text-red-600 text-2xl font-bold">Error</h2>
        <p className="text-xl font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Mis Comentarios</h2>
      {comments.length === 0 ? (
        <p className="text-xl text-gray-500">Aún no tienes comentarios.</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="border-b py-4">
              <p className="text-lg text-gray-800">{comment.comment}</p>
              <p className="text-sm text-gray-600">Película: {comment.movieTitle}</p> {/* Título de la película */}
              <p className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</p> {/* Mostrar la fecha */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
