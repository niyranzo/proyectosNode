import React, { useState } from 'react';
import { PuffLoader } from 'react-spinners'; // Importa el loader
import { useMovie } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [searchTitle, setSearchTitle] = useState(""); // Estado para el título que el usuario escribe
  const [movies, setMovies] = useState([]); // Estado para las películas encontradas
  const { fetchMoviesByTitle, loading } = useMovie(); // Destructuramos la función del contexto

  // Función para manejar la búsqueda
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (!searchTitle.trim()) {
      return;
    }

    try {
      const movieResults = await fetchMoviesByTitle(searchTitle);
      setMovies(movieResults);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Buscar Películas</h2>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
            placeholder="Escribe el título de la película"
          />
          <button
            type="submit"
            className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700"
          >
            Buscar
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center">
          <PuffLoader color="#0284c7" />
        </div>
      )}

      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No se encontraron películas</p>
      )}
    </div>
  );
};

export default Search;
