import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";  // Importar el toast
const API_URL = import.meta.env.VITE_API_MOVIE;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth se debe usar dentro de un contexto");
    }
    return context;
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
            const savedUser = localStorage.getItem("user");
            return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [error, setError] = useState(null);

    const register = async ({ username, password }) => {
        try {
            const response = await fetch(`${API_URL}auth/register`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) {
                if (response.status === 400) {
                    setError("Ya hay un usuario registrado con ese usuario");
                    toast.error("Ya hay un usuario registrado con ese usuario", {
                        style: { background: 'red', color: 'white' }
                    });
                } else {
                    setError("Hubo un problema al intentar registrarse.");
                    toast.error("Hubo un problema al intentar registrarse.", {
                        style: { background: 'red', color: 'white' }
                    });
                }
                return;
            }
            const data = await response.json();
            setUser(data.user);
            setToken(data.token);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("¡Registro exitoso!.", {
                style: { background: 'green', color: 'white' }
            });
            return data.success;
        } catch (error) {
            console.error(error.message);
            setError(error);
            toast.error("Error en el registro, intente de nuevo.", {
                style: { background: 'red', color: 'white' }
            });
        }
    };

    const login = async (formData) => {
        const { username, password } = formData;
        try {
            const response = await fetch(`${API_URL}auth/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setError("Credenciales incorrectas. Intenta de nuevo.");
                    toast.error("Credenciales incorrectas. Intenta de nuevo.", {
                        style: { background: 'red', color: 'white' }
                    });
                } else {
                    setError("Hubo un problema al intentar iniciar sesión.");
                    toast.error("Hubo un problema al intentar iniciar sesión.", {
                        style: { background: 'red', color: 'white' }
                    });
                }
                return;
            }
            const data = await response.json();
            setUser(data.user);
            setToken(data.token);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("¡Bienvenido de nuevo!", {
                style: { background: 'green', color: 'white' }
            });
            return data.success;
        } catch (error) {
            console.error("Error en la petición", error);
            toast.error("Error al intentar iniciar sesión, por favor intenta de nuevo.", {
                style: { background: 'red', color: 'white' }
            });
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.info("Has cerrado sesión correctamente.", {
            style: { background: 'blue', color: 'white' }
        });
    };

    return (
        <AuthContext.Provider value={{ user, token, error, login, logout, register, setError }}>
            {children}
        </AuthContext.Provider>
    );
};
