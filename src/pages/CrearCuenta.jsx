import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const CrearCuenta = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirpassword, setRepetirPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [web, setWeb] = useState("");
  const [alerta, setAlerta] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();

    let campos = [nombre, email, password, repetirpassword, telefono];
    const camposVacios = campos.every((campo) => campo !== "");
    if (!camposVacios) {
      //enviar un mensaje de error
      setAlerta({ msg: "Hay campos vacíos", error: true });
      return;
    }

    if (password !== repetirpassword) {
      setAlerta({ msg: "los passwords no son iguales", error: true });
      return;
    }

    if (password.length < 8) {
      setAlerta({ msg: "El password es menor a ocho caracteres", error: true });
      return;
    }

    setAlerta({});

    /* Si pasa toda la validación entonces  registramos la cuenta en la 
    base de datos
    Creamos el usuario en la API*/

    try {
      await clienteAxios.post("/veterinarios", {
        nombre,
        email,
        password,
        telefono,
        web,
      });

      setAlerta({ msg: "Creado correctamente, revisa tu email", error: false });

      //limpiamos los values de cada campo del formulario
      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
      setTelefono("");
      setWeb("");
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <section>
        <h1 className="text-indigo-600 font-black text-5xl text-center">
          Crea tu cuenta y administra tus {""}
          <span className="text-black">pacientes</span>
        </h1>
      </section>
      <section className="mt-10 bg-gray-100 shadow-md p-5 rounded-xl md:mt-0">
        {msg && <Alerta alerta={alerta} />}

        <form
          action=""
          method="post"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="text"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Gerson"
              className="border border-indigo-600 rounded-md p-2 outline-none caret-indigo-600 w-full md:w-80"
            />
          </div>
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
              crea un password
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
          <div>
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              repite tu password
            </label>
            <input
              type="password"
              name="repeatpassword"
              id="repeatpassword"
              value={repetirpassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
              className="border border-indigo-600 rounded-md p-2 outline-none caret-indigo-600 w-full md:w-80"
            />
          </div>
          <div>
            <label
              htmlFor="telefono"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Telefono
            </label>
            <input
              type="tel"
              name="telefono"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="border border-indigo-600 rounded-md p-2 outline-none caret-indigo-600 w-full md:w-80"
            />
          </div>
          <div>
            <label
              htmlFor="telefono"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              web
            </label>
            <input
              type="text"
              name="web"
              id="web"
              value={web}
              onChange={(e) => setWeb(e.target.value)}
              className="border border-indigo-600 rounded-md p-2 outline-none caret-indigo-600 w-full md:w-80"
            />
          </div>
          <input
            type="submit"
            value="Crear cuenta"
            className="bg bg-indigo-600 p-2 text-white text-xl rounded-md cursor-pointer hover:bg-indigo-800"
          />
        </form>
        <nav className="mt-2 hover:underline">
          <Link to="/">¿Ya tienes cuenta? Inicia sesión</Link>
        </nav>
      </section>
    </>
  );
};

export default CrearCuenta;
