import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage = () => {
    const { register } = useAuth(); // Ya no es necesario traer setError ni error
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await register(formData);
            if (success) {
                navigate("/home"); // Solo navega si no hay error
            }
        } catch (error) {
            console.error("Error en el registro", error);
        }
    };

    return (
        <div className="flex items-center justify-center m-20 bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-900">Regístrate</h2>
                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium">Nombre de usuario</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            id="username"
                            name="username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Contraseña</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            id="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="w-full py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                        type="submit"
                    >
                        Registrarse
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
