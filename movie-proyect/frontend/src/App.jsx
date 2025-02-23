import './App.css';
import { MovieProvider } from './contexts/MovieContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from './contexts/AuthContext';

// Importar ToastContainer y los estilos
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Asegúrate de importar los estilos de Toastify

function App() {
  return (
    <>
      <AuthProvider>
        <MovieProvider>
          <RouterProvider router={router} />
        </MovieProvider>
      </AuthProvider>

      {/* Agregar ToastContainer aquí */}
      <ToastContainer />
    </>
  );
}

export default App;
