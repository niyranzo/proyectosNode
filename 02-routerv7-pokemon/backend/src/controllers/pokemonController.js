import { addPokemon, getPokemons, deleteAllPokemons, getPokemonById, getPokemonsByName } from "../models/pokemon.js";

// Obtener todos los Pokémon
const getPokemonsHandler = async (req, res) => {
    try {
        const pokemons = await getPokemons();  
        res.json(pokemons);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los Pokémon" });
    }
};

//obtener pokemon por id 
const getPokemonsIdandNameHandler = async (req, res) => {
    const { value } = req.params;

    // Validar si el id es un número entero
    const idNumber = Number(value);
    try {
        if (Number.isInteger(idNumber)) {
            const pokemon = await getPokemonById(value);
            if (pokemon.length === 0 ){
                return res.status(404).json({ error: "No se encontro Pokemon" });
            }
            return res.json(pokemon); 
        }
        const pokemons = await getPokemonsByName(value);
        if (pokemons.length === 0 ){
            return res.status(404).json({ error: "No se encontro Pokemon" });
        }
        return res.json(pokemons);
        
    } catch (err) {
        res.status(500).json({ error: "Pokémon no encontrado" });
    }
};

// Agregar un nuevo Pokémon
const addPokemonHandler = async (req, res) => {
    const { id, name, type, experience, abilities, image } = req.body;
    
    if (!id, !name || !type || !experience || !abilities || !image) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        const newPokemon = await addPokemon(id, name, type, experience, abilities, image);  
        res.status(201).json({ message: "Pokémon agregado correctamente", pokemon: newPokemon });
    } catch (err) {
        res.status(500).json({ error: "Error al agregar el Pokémon" });
    }
};

// Eliminar todos los Pokémon
const deleteAllPokemonsHandler = async (req, res) => {
    try {
        await deleteAllPokemons();  
        res.json({ message: "Todos los Pokémon han sido eliminados" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar los Pokémon" });
    }
};

export { getPokemonsHandler, addPokemonHandler, deleteAllPokemonsHandler, getPokemonsIdandNameHandler };
