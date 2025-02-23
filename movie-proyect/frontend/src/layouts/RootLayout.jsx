import { NavLink, Outlet, useNavigate } from "react-router-dom";  // Importa useNavigate
import { useAuth } from "../contexts/AuthContext";

const RootLayout = () => {
  const { logout } = useAuth(); // Obtén la función de logout desde el contexto
  const navigate = useNavigate();  // Usamos useNavigate para redirigir después de logout

  const handleLogout = () => {
    logout();  // Llama a logout para limpiar los datos de usuario y token
    navigate("/login");  // Redirige a la página de login después de cerrar sesión
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-sky-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <NavLink to="/home" className="text-lg font-bold">
                VideoClub
              </NavLink>
              <div className="flex space-x-4 ml-10">
                <NavLink to="/search" className="hover:text-amber-600">
                  Buscar
                </NavLink>
                <NavLink to="/reviews" className="hover:text-amber-600">
                  Reseñas
                </NavLink>
                <NavLink to="/favorites" className="hover:text-amber-600">
                  Favoritos
                </NavLink>
                {/* Botón de logout */}
                <button
                  onClick={handleLogout}
                  className="hover:text-amber-600 text-sm"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="bg-sky-950 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center">Videoclub © 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
