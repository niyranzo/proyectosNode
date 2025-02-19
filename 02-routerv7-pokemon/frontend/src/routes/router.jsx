// importaciones
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./paths";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import FavoritesPage from "../pages/FavoritesPage";
import AboutPage from "../pages/AboutPage";
import PokemonDetailPage from "../pages/PokemonDetailPage";
const url = import.meta.env.VITE_API_URL;
const pokemonUrl = import.meta.env.VITE_POKEMON;



export const router = createBrowserRouter([
    { //cada uno es una ruta
        element:<RootLayout />,
        errorElement:<ErrorPage />,
        children: [ //estas rutas son hijas de los corchetes azules, se separan para poder renderizar
            {
                path: ROUTES.HOME, // === "/"
                element: <Home />
            },
            {
                path: ROUTES.SEARCH, // === "/search"
                element: <SearchPage />
            },
            {
                path: ROUTES.FAVORITES, // === "/favourites"
                element: <FavoritesPage />
            },
            {
                path: ROUTES.POKEMON_DETAILS, // === "/search"
                element: <PokemonDetailPage />,
                errorElement:<ErrorPage />,
                //loader: permite hacer un fect directamente en la ruta
                loader: async ({ params }) => {
                    // hago el fetch del value para la busqueda del pokemon
                    const response = await fetch(`${url}${pokemonUrl}/${params.name}`);
                    if(!response.ok){
                        throw new Error("Pokemon not found");
                    }
                    return await response.json();
                } 
            },
            {
                path: ROUTES.ABOUT, // === "/search"
                element: <AboutPage />
            },
        ]
    },
]);