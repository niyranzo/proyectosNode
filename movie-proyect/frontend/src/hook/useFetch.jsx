import { useState, useEffect } from "react";

const API_MOVIE = import.meta.env.VITE_API_MOVIE;

export const useFetch = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_MOVIE}${endpoint}`);
            if (!response.ok) {
                throw new Error("No se pudo traer los datos");
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchData();
    }, [endpoint])// Se ejecuta cuando cambia el endpoint

    return { data, loading, error };
};
