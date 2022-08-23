import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
  //para que solamente el que esta autenticado pueda ingresar
  //el auth lo traermos de AuthProvider que nos devuelve un objeto
  const { auth, cargando } = useAuth();


  if (cargando) return "cargando...";
  return (
    <>
      <Header />
      {/* si no estoy autenticado me dirige a la pagina principal */}
      {auth?._id ? (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  );
};

export default RutaProtegida;
