import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext";
import Spinner from "../components/Spinner";
const url = import.meta.env.VITE_API_URL;
const pokemonUrl = import.meta.env.VITE_POKEMON;
const fullUrl = `${url}${pokemonUrl}`

const Home = () => {
    const { addToFavorites} = usePokemon();
    const [ pokemons, setPokemons ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        fetchPokemons();
    }, []) //solo se ejecuta cuando se monta el componente

    const fetchPokemons = async () =>{
        try {
            const response = await fetch(fullUrl);
            if(!response.ok){
                throw new Error("Error al obtener los pokemons");
            }
            const data = await response.json();
            //seteo en el estado los pokemonDetails
            setPokemons(data);

        } catch (error) {
            console.log("Error fetching pokemons", error);
        } finally {
            setIsLoading(false);
        }
    }

    if(isLoading){
        return <div><Spinner/></div>
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Pokemons disponibles</h1>
            {/**Grid de las tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/**Tarjeta individual de cada Pokemon */}

            {
                pokemons.map(pokemon => ( //lo primero que va dentro del map tiene q tener un key
                    <div key={pokemon.id} className="bg-white shadow-md rounded-md p-4">
                        <div className="relative group">
                            <img src={pokemon.image} alt={pokemon.name} 
                                className="w-32 h-32 mx-auto transform group-hover:scale-110 transition-transform duration-500"/>
                        </div>
                        <h2 className="text-xl font-semibold text-center capitalize mt-2">{pokemon.name}</h2>
                        {/**aqui van los botones */}
                        <div className="flex justify-center space-x-2 mt-4">
                            <button className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600" onClick={() => addToFavorites(pokemon)}>
                            Añadir a favoritos</button>
                      
                            <Link 
                                to={`/search/${pokemon.id}`} 
                                className="bg-cyan-400 text-white px-4 py-2 rounded hover:bg-cyan-600"
                            >Ver detalles</Link>
                           
                        </div>
                        {console.log(`${url}${pokemonUrl}/${pokemon.id}`)}
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Home