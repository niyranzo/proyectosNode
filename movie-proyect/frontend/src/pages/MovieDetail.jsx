import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PuffLoader } from "react-spinners";
import { useMovie } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';

const MovieDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]); 
  const [commentText, setCommentText] = useState(""); 

  const { loading, error, getMovieId, fetchCommentsMovie, addComment } = useMovie();

  const fetchMovieDetails = async () => {
    try {
      const response = await getMovieId(id);
      setData(response);
    } catch (error) {
      console.error("Error al traer la película", error);
    }
  };

  const fetchMovieComments = async () => {
    try {
      const commentsData = await fetchCommentsMovie(id);
      setComments(commentsData);
    } catch (error) {
      console.error("Error al traer los comentarios", error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieComments();
  }, [id]);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await addComment(id, commentText); // Changed order: movieId, comment
      setCommentText("");
      fetchMovieComments();
    } catch (error) {
      console.error("Error al agregar el comentario", error);
    }
  };

  if (error) {
    return (
      <div className="text-center p-10">
        <h2 className="text-red-600 text-2xl font-bold">Error al traer la película</h2>
        <p className="text-xl font-medium">{error.message}</p>
        <Link to="/" className="text-blue-600">Volver al inicio</Link>
      </div>
    );
  }

  if (!data?.title || !data?.genres || loading) return <PuffLoader />;

  return (
    <article className="max-w-4xl mx-auto">
      <header className="relative h-96 mb-8">
        <img className="w-full object-cover h-full rounded-lg" src={`https://image.tmdb.org/t/p/w500/${data.backdrop}`} alt={data.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
          <div className="absolute bottom-0 text-white p-6">
            <h1 className="text-4xl font-bold">{data?.title}</h1>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 h-full gap-5">
        <img src={`https://image.tmdb.org/t/p/w500/${data.poster}`} alt={data?.title} className="" />
        
        {/* Columna Derecha */}
        <section className="flex flex-col">
          {/* Géneros */}
          <div className="flex flex-wrap">
            {data?.genres.map((genre, index) => (
              <p key={index} className="bg-gray-200 p-1 pl-2 pr-2 m-1 text-sm rounded-2xl">{genre}</p>
            ))}
          </div>

          {/* Sinopsis */}
          <h2 className="font-bold text-2xl mt-4">Sinopsis</h2>
          <p className="text-sm text-gray-600 mt-2">{data?.overview}</p>

          {/* Trailer */}
          <h2 className="font-bold text-2xl mt-4">Trailer</h2>
          <div className="aspect-video">
            {data.trailer ? (
              <iframe className="w-full h-full rounded-lg" src={data.trailer} title="Movie Trailer" allowFullScreen></iframe>
            ) : (
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">No hay trailer disponible</p>
              </div>
            )}
          </div>

          {/* Sección de Comentarios */}
          <section className="mt-4">
            <h2 className="text-xl font-bold text-gray-800">Comentarios</h2>

            {/* Formulario para agregar comentario */}
            <form onSubmit={handleCommentSubmit} className="mt-2 flex flex-col gap-2">
              <textarea
                value={commentText}
                onChange={handleCommentChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Escribe tu comentario..."
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Enviar comentario
              </button>
            </form>
            

            {/* Lista de comentarios */}
            {comments.length > 0 ? (
              <ul className="mt-2 max-h-40 overflow-y-auto">
                {comments.map((comment, index) => (
                  <li key={index} className="border-b py-2">
                    <p className="text-gray-700">{comment.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-2">Aún no hay comentarios.</p>
            )}
          </section>
        </section>
      </div>
    </article>
  );
};

export default MovieDetail;
