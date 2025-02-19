import { Link } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext"
import { ROUTES } from "../routes/paths";



const FavoritesPage = () => {
  const { favorites, removeFromFavorites} = usePokemon();

  if(favorites.length === 0){
    return (
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold mb-4">
          Favoritos
        </h1>
        <p>
          No hay favs
        </p>
        <Link to={ROUTES.HOME}>Volver a la pagina de inicio</Link>
      </div>
    )
  }else{
    return (
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold mb-4">
          Tus Pokemons favoritos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* tarjeta para 1 pokemon */ console.log(favorites)}
          {favorites.map(pokemon => (
            <div key={pokemon.id} className="border rounded-lg p-4 shadow-amber-200 shadow-lg">  
                <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32 mx-auto"/>
                <h2 className="text-xl font-semibold text-enter capitalize mt-2">
                  {pokemon.name}
                </h2>
                <div className="mt-4 space-y-2">
                  <Link to={`${ROUTES.SEARCH}/${pokemon.name}`} className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800">Ver detalles</Link>
                  <button onClick={ () => removeFromFavorites(pokemon.id)} className="w-full text-center bg-red-500 text-white px4 py-2 rounded">Eliminar de Favorito</button>
                </div>
            </div>
          ))}
        </div>
        <Link className="text-blue-800 hover:underline block mt-4" to={ROUTES.HOME}>Volver a la pagina de inicio</Link>
      </div>
    )
  }
}

export default FavoritesPage