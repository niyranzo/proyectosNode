import { addPokemonFavs, deletePokemonFav, getPokemonFavById, getPokemonsFavs } from "../models/favorites.js";
// Controlador para obtener todos los pokemons favs
const getPokemonsFavHandler = async (req, res) => {
    try {
        const pokemons = await getPokemonsFavs();  // Llamamos a la función del modelo
        if(pokemons === null){
            return res.status(404).json({ error: "No  hay pokemons en favs" });
        }
        res.json(pokemons);  // Devolvemos los resultados como JSON
    } catch (err) {
        res.status(500).json('Error al obtener los pokemons favs');  // En caso de error, enviamos una respuesta con error
    }
};

//obtener pokemon por id 
const getPokemonsFavIdHandler = async (req, res) => {
    const { id } = req.params;

    // Validar si el id es un número entero
    const idNumber = Number(id);
    
    if (!Number.isInteger(idNumber)) {
        return res.status(400).json({ error: "El id tiene que ser un numero" });
    }
    try {
        const pokemon = await getPokemonFavById(id);  
        if(pokemon === null){
            return res.status(404).json({ error: "Pokémon fav no encontrado" });
        }
        res.json(pokemon);
    } catch (err) {
        res.status(500).json({ error: "Pokémon fav no encontrado" });
    }
};

// añadir los pokemons favs
const addPokemonFavHandler = async (req,res) => {

    const { pokemon } = req.body;  // Extraer el objeto `pokemon` del body

    // Verificar que se haya enviado el objeto y que tenga todos los campos
    if (!pokemon || !pokemon.id ||  !pokemon.name || !pokemon.type || !pokemon.experience || !pokemon.abilities || !pokemon.image) {
        return res.status(400).json({ error: "Todos los campos del Pokémon son obligatorios" });
    }

    try {
        const newPokemonFav = await addPokemonFavs(pokemon);
        if(newPokemonFav === null){
            return res.status(400).json({ error: "El Pokémon ya está en tus favoritos" });
        }  // Llamamos a la función del modelo
        res.status(201).json({ Pokemon: pokemon.name });  // Respondemos con el Pokémon agregado
    } catch (err) {
        res.status(500).json({ error: "Error al agregar el Pokémon a fav" }); 
    }
}

const deletePokemonFavHandler = async (req,res) => {
    const { id } = req.params; //tomar la data
    console.log(id);
    // compruebo que se haya enviado todo
    if (!id) {
        return res.status(400).json({ error: "No hay id fav de pokemon" });
    }
    try {
        await deletePokemonFav(id);  // Llamamos a la función del modelo
        res.status(201).json({ idFavorite: id });  // Respondemos con el Pokémon agregado
    } catch (err) {
        res.status(500).json({ error: "Error al borrar el Pokémon de fav" }); 
    }
}

export { getPokemonsFavHandler, addPokemonFavHandler, deletePokemonFavHandler, getPokemonsFavIdHandler};