import React from "react";
import { Link } from "react-router-dom";
import { useMovie } from "../contexts/MovieContext"; // Usamos el contexto para gestionar favoritos

const MovieCard = ({ movie }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useMovie();

  // Formatear la fecha
  const formattedDate = new Date(movie.date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Verificar si la película ya está en los favoritos
  const isFavorite = favorites.some((fav) => fav._id === movie._id);

  // Manejar el clic en el ícono del corazón
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Evita que el clic también active el enlace
    if (isFavorite) {
      removeFromFavorites(movie._id, movie.userId); // Eliminar de favoritos
    } else {
      addToFavorites(movie); // Agregar a favoritos
    }
  };

  return (
    <div className="block rounded-lg overflow-hidden shadow-lg bg-sky-900 hover:bg-sky-800 transition duration-300 relative">
      {/* Corazón para añadir/eliminar de favoritos */}
      <div
        className="absolute top-2 right-2 text-3xl cursor-pointer z-10"
        onClick={handleFavoriteClick}
      >
        {isFavorite ? (
          <span className="text-red-500">❤️</span> // Corazón lleno si está en favoritos
        ) : (
          <span className="text-gray-400">🤍</span> // Corazón vacío si no está en favoritos
        )}
      </div>

      {/* El enlace ahora solo rodea el contenido del MovieCard */}
      <Link
        to={`/movie/${movie._id}`}
        className="transform transition-transform duration-300 hover:scale-105"
      >
        <article>
          <div className="relative aspect-[2/3]">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster}`}
              alt={movie.title}
              className="object-cover w-full h-full rounded-t-lg"
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="font-bold text-lg text-white line-clamp-2">{movie.title}</h3>
            <p className="text-sm text-gray-300 mt-1">{formattedDate}</p>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default MovieCard;
