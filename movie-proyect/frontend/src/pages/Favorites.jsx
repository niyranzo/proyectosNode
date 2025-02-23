import React, { useEffect } from "react";
import { useMovie } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { PuffLoader } from "react-spinners";
import { useAuth } from "../contexts/AuthContext";

const Favorites = () => {
  const { user } = useAuth();
  const { favorites, loading, error, fetchFav, setLoading } = useMovie();  // Obtiene favoritos y estado de carga

  useEffect(() => {
    if (user && user._id) {
        fetchFav();
    } else {
        setLoading(false);  // Si no hay usuario, termina el loading
    }
}, [user]);  // Se ejecutará cuando el valor de 'user' cambie.

  // Si está cargando o si hay un error, mostramos el estado de carga o el error
  if (loading) {
    return (
      <div className="flex justify-center">
        <PuffLoader color="#0284c7" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-sky-950 mb-10">Películas Favoritas</h2>
      {/* Aquí ya no es necesario el console.log(user) */}
      {favorites?.length === 0 ? (
        // Si no hay favoritos, muestra un mensaje
        <div className="text-center text-lg text-gray-500">
          <p>No tienes películas favoritas aún.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites?.map((movie) => {
            console.log(movie)
            return <MovieCard key={movie._id} movie={movie} />
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
