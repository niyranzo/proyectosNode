import { addPokemon, deleteAllPokemons } from "../models/pokemon.js";
import fetch from 'node-fetch'; // Importa fetch desde node-fetch

export const urlApi = process.env.URL; 


/**
 * @description: funcion que añade los pokemons a la base de datos 
 */
export const addPokemonApiBD = async () => {
    try {
        
        //borro todos los pokemons de la bd primero si hay para agg los nuevos pokemons 
        deleteAllPokemons();
       
        // me traigo todos los pokemons
        const response = await fetch(urlApi);
        if(!response.ok){
            throw new Error("Error en la url");
        }

        const data = await response.json();

        // me traigo cada uno de los pokemons
        const pokemonArr = await Promise.all(
            data.results.map(async (pokemon) => {
                const respo = await fetch(pokemon.url);
                if(!respo.ok){
                    throw new Error("Error en pokemonDetail");
                }
                return respo.json();
            })
        )
        // añado los pokemons a la base de datos
        pokemonArr.map((pokemon, i) => {
            const types = pokemon.types.map((typee) => typee.type.name);
            const abilities = pokemon.abilities.map((abilitiee) => abilitiee.ability.name);
            addPokemon(i + 1, pokemon.name, types, pokemon.base_experience, abilities, pokemon.sprites.other.dream_world.front_default);
        });

    } catch (error) {
        console.error("Error al obtener la data", error)
    }
   
}