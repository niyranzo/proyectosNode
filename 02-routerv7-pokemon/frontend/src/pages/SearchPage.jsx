import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const url = import.meta.env.VITE_API_URL;
const pokemonUrl = import.meta.env.VITE_POKEMON;

const SearchPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await fetch(`${url}${pokemonUrl}/${search.toLocaleLowerCase()}`);
            if(!response.ok){
                throw new Error("Error al obtener el pokemon");
            }
            navigate(`/search/${search.toLocaleLowerCase()}`)
        } catch (error) {
            toast.error("Pokemon no encontrado");
        }
    }

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Buscar Pokemon</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">    
                <input type="text" 
                placeholder="Pokemon"
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
                className="flex-1 p-2 border rounded-lg"
                />
                <button type="submit" className="bg-rose-200 hover:bg-rose-100 px-4 py-2 rounded-lg">Buscar</button>
            </div>
        </form>
    </div>
  )
}

export default SearchPage