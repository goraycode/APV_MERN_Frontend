import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { cerrarSesion, auth } = useAuth();
  const { nombre } = auth;
  return (
    <header className="py-10 bg-indigo-600">
      <div className="contenedor mx-auto flex flex-col justify-between items-center md:flex-row">
        <h1 className="text-gray-300 text-2xl font-medium text-center p-0 mb-5">
          Administrador de pacientes de{" "}
          <span className="text-white font-black">veterinaria</span>
        </h1>
        <nav className="flex flex-col gap-4 items-center md:flex-row">
          <Link to="/admin" className="text-white text-sm uppercase font-bold">
            Pacientes
          </Link>
          <Link to="perfil" className="text-white text-sm uppercase font-bold">
            Perfil
          </Link>
          <button
            type="button"
            className="flex gap-2 hover:text-gray-300"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </nav>
      </div>
      <div className="contenedor mx-auto text-white text-lg">Hola {nombre}</div>
    </header>
  );
};

export default Header;
