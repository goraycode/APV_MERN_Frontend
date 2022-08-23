import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
/* usseefect es con la finalidad
de qu8e valide el token cuando cargue y será solo una vez
 */

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const url = `/veterinarios/olvide-password/${token}`;

        //enviamos la URL al backend para que compare
        await clienteAxios.get(url);

        setAlerta({
          msg: "Coloca tu nuevo password",
          error: false,
        });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: "Enlace no válido",
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "") {
      setAlerta({ msg: "El password es obligatorio", error: true });
      return;
    }
    if (password.length < 8) {
      setAlerta({ msg: "El password es menor a 8 caracteres", error: true });
      return;
    }

    //guardamos el nuevo password en la base de datos
    try {
      const url = `/veterinarios/olvide-password/${token}`;

      const { data } = await clienteAxios.post(url, { password });

      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordModificado(true);

      //limpiamos formulario
      setPassword("");
    } catch (error) {
      setAlerta({
        msg: "Algo salió mal",
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <section>
        <h1 className="text-indigo-600 font-black text-5xl text-center">
          Crea un nuevo password y administra tus{" "}
          <span className="text-black">pacientes</span>
        </h1>
      </section>
      <section className="mt-10 bg-gray-100 shadow-md p-5 rounded-xl  md:mt-0">
        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <>
            <form
              method="post"
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="uppercase text-gray-600 block text-xl font-bold"
                >
                  nuevo password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-indigo-600 rounded-md p-2 outline-none caret-indigo-600 w-full block md:w-96"
                />
              </div>
              <input
                type="submit"
                value="guardar password"
                className="bg bg-indigo-600 p-2 text-white text-xl rounded-md uppercase cursor-pointer hover:bg-indigo-800"
              />
            </form>
            {passwordModificado && (
              <nav className="mt-2 flex justify-between items-center gap-5">
                <Link className="block  hover:underline" to="/">
                  Inicia sesión
                </Link>
              </nav>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default NuevoPassword;
