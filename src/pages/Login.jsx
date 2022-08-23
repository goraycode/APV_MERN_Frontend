import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validamos las entradas

    if (email === "" || password === "") {
      setAlerta({
        msg: "Ambos campos son obligatorios",
        error: true,
      });

      return;
    }

    //limpiamos la alerta
    setAlerta({});

    //si ambos campos estan completos lo mandamos al backend para que se almacene

    try {
      const { data } = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      /* para que al ingresar me rediriga automaticamente al admin y no 
      se quede en el login*/
      setAuth(data);
      //redirigimos al usuario a uina pagina con la url admin que esta en APP
      navigate("/admin");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const { msg } = alerta;
  return (
    <>
      <section>
        <h1 className="text-indigo-600 font-black text-5xl text-center">
          Iniciar Sesión y administra tus {""}
          <span className="text-black">pacientes</span>
        </h1>
      </section>
      <section className="mt-10 bg-gray-100 shadow-md p-5 rounded-xl  md:mt-0">
        {msg && <Alerta alerta={alerta} />}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              className="border border-indigo-600 rounded-md p-2 outline-none caret-indigo-600 w-full md:w-80"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-indigo-600 rounded-md p-2 outline-none caret-indigo-600 w-full md:w-80"
            />
          </div>
          <Link
            to="/olvide-password"
            className="text-indigo-600 hover:underline flex items-center"
          >
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
                d="M9 5l7 7-7 7"
              />
            </svg>
            Olvide mi contraseña
          </Link>
          <input
            type="submit"
            value="Iniciar sesión"
            className="bg bg-indigo-600 p-2 text-white text-xl rounded-md cursor-pointer hover:bg-indigo-800"
          />
        </form>

        <nav className="mt-2 hover:underline">
          <Link to="/registrar">¿No tienes cuenta? Registrate</Link>
        </nav>
      </section>
    </>
  );
};

export default Login;
