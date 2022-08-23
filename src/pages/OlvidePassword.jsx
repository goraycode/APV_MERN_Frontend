import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setAlerta({ msg: "El email es obligatorio", error: true });
      return;
    }

    setAlerta({});

    /*recibimos la evaluación del backend
    si el email ingresado existe en nuestra base de datos o no*/
    try {
      const { data } = await clienteAxios.post(
        "/veterinarios/olvide-password",
        {
          email,
        }
      );

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setEmail("");
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <section>
        <h1 className="text-indigo-600 font-black text-5xl text-center">
          Recupera tu {""}
          <span className="text-black">password</span>
        </h1>
        <p className="mt-2">
          Enviaremos un código de recuperación al email con el que te
          registraste
        </p>
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
              className="border border-indigo-600 rounded-md p-2 outline-none caret-indigo-600 w-full block md:w-"
            />
          </div>
          <input
            type="submit"
            value="recuperar"
            className="bg bg-indigo-600 p-2 text-white text-xl rounded-md cursor-pointer hover:bg-indigo-800"
          />
        </form>
        <nav className="mt-2 flex justify-between items-center gap-5">
          <Link className="block  hover:underline" to="/registrar">
            ¿No tienes cuenta? Registrate
          </Link>
          <Link className="block  hover:underline" to="/">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </nav>
      </section>
    </>
  );
};

export default OlvidePassword;
