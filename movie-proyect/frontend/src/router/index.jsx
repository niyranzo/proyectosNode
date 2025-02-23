import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
// import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
// import MovieDetail from "../pages/MovieDetail";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MovieDetail from "../pages/MovieDetail";
import ProtectedRoute from "../components/ProtectedRoute";
import Favorites from "../pages/Favorites";
import Reviews from "../pages/Reviews";
import Search from "../pages/Search";
// import Reviews from "../pages/Reviews";
// import Search from "../pages/Search";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index:true,
        element:<Navigate to="login" replace />, //que no puedas volver hacia atras
      },
      {
          path:"login",
          element: <LoginPage />
      },
      {
          path:"register",
          element: <RegisterPage />
      },
      {
        path: "home",
        element:
        <ProtectedRoute >
          <Home />,
        </ProtectedRoute>
      },
      {
        path: "movie/:id",
        element: 
        <ProtectedRoute >
          <MovieDetail />,
        </ProtectedRoute>
      },
      {
        path: "search",
        element: 
        <ProtectedRoute >
          <Search />,
        </ProtectedRoute>
      },
      {
        path: "reviews",
        element: 
        <ProtectedRoute >
          <Reviews />,
        </ProtectedRoute>
      },
      {
        path: "favorites",
        element: 
        <ProtectedRoute >
          <Favorites />,
        </ProtectedRoute>
      },
    ],
  },
]);
