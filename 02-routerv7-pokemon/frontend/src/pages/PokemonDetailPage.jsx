import { useLoaderData, useNavigate } from "react-router-dom"
import { usePokemon } from "../context/PokemonContext";

const PokemonDetailPage = () => {
  const pokemon = useLoaderData();
  const { addToFavorites} = usePokemon();
  // use navigate hook para la agregacion programatica
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-blue rounded-lg shadow-lg p-6">
        <button className="mb-4 text-blue-800 hover:underline"
        onClick={() => navigate(-1)}
        > 
          Volver
        </button>
        <img src={pokemon.image} alt={pokemon.name} className="w-48 h-48 mx-auto" />
        <h1 className="text-3xl font-bold text-center capitalize mb-4">
          {pokemon.name}
        </h1>
        <div className="grid grid-row-2 gap-6 justify-center">
          <div>
            <h2 className="text-xl text-amber-600 font-semobold mb-2">Estadisticas</h2>
            <div className="flex gap-10">
              <div className="flex flex-col">
                <h3 className="text-2xl">
                  Tipo
                </h3>
                {pokemon.type.map((type) => (
                  <div key={type}>
                  <span className="font-semibold capitalize">{type}</span>
              </div>
            ))}
            </div>
              <div className="flex flex-col">
                  <h3 className="text-2xl">
                Habilidades
              </h3>
              {pokemon.abilities.map((abilities) => (
                <div key={abilities}>
                <span className="font-semibold capitalize">{abilities}</span>
                </div>
              ))}
              </div>
              <div>
                <h3 className="text-2xl">
                  Experiencia: <span className="font-bold">{pokemon.experience}</span>
                </h3>
              </div>
            </div>
          <button className="mt-4 textcenter bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded" onClick={() => addToFavorites(pokemon)}>Añadir a Favoritos</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetailPage;