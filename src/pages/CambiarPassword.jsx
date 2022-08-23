import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    password_actual: "",
    password_nuevo: "",
  });
  const { actualizarPassword } = useAuth();

  const ocultarAlerta = () => {
    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const campos = Object.values(password).every((campo) => campo === "");

    if (campos) {
      setAlerta({ msg: "Ambos campos son obligatorios", error: true });
      ocultarAlerta();
      return;
    }

    if (password.password_nuevo.length < 8) {
      setAlerta({
        msg: "El password debe ser mayor o igual a ocho caracteres",
        error: true,
      });
      ocultarAlerta();
      return;
    }

    const resultado = await actualizarPassword(password);
    setAlerta(resultado);

    setTimeout(() => {
      setAlerta({});
      setPassword({});
    }, 3000);
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />
      <h2 className="text-center text-2xl font-bold my-5">
        Actualiza tu password
      </h2>
      <section className="contenedor mx-auto shadow-lg py-2">
        {msg && <Alerta alerta={alerta} />}
        <form
          action=""
          className="caret-indigo-600 flex flex-col md:items-end gap-5 md:w-96 mx-auto px-2"
          onSubmit={handleSubmit}
        >
          <div className="field flex justify-between gap-2 items-center">
            <label htmlFor="nombre">Contraseña actual: </label>
            <input
              type="password"
              name="password_actual"
              id="password_actual"
              onChange={(e) =>
                setPassword({ ...password, [e.target.name]: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 outline-indigo-600 md:w-80"
            />
          </div>
          <div className="field flex justify-between gap-2 items-center">
            <label htmlFor="nombre">Nueva contraseña: </label>
            <input
              type="password"
              name="password_nuevo"
              id="password_nuevo"
              onChange={(e) =>
                setPassword({ ...password, [e.target.name]: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 outline-indigo-600 md:w-80"
            />
          </div>

          <input
            type="submit"
            className="block bg bg-indigo-500 rounded-lg p-2 self-center text-white uppercase text-sm cursor-pointer hover:bg-indigo-700"
            value="Actualizar contraseña"
          />
        </form>
      </section>
    </>
  );
};

export default CambiarPassword;
