import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
const Perfil = () => {
  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});

  //para evitar que los campos del formulario me den un  error de no controlable
  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const { email, nombre, telefono, web } = perfil;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let campos = [email, nombre];
    let filtrarCampos = campos.every((campo) => campo !== "");
    if (!filtrarCampos) {
      setAlerta({
        msg: "Nombre y Email son obligatorios",
        error: true,
      });

      return;
    }

    const resultado = await actualizarPerfil(perfil);
    setAlerta(resultado);

    setTimeout(() => {
      setAlerta({ msg: "" });
    }, 3000);
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />
      <h1 className="text-center text-2xl font-bold">Actualiza tu perfil</h1>
      <section className="contenedor mx-auto shadow-lg py-2">
        <h2 className="text-center text-xl font-bold my-5">
          Datos del usuario
        </h2>
        {msg && <Alerta alerta={alerta} />}
        <form
          className="caret-indigo-600 flex flex-col md:items-end gap-5 md:w-96 mx-auto px-2"
          onSubmit={handleSubmit}
        >
          <div className="field flex justify-between gap-2 items-center">
            <label htmlFor="nombre">Veterinaria: </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={nombre || ""}
              onChange={(e) =>
                setPerfil({ ...perfil, [e.target.name]: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 outline-indigo-600 md:w-80"
            />
          </div>
          <div className="field flex justify-between gap-2 items-center">
            <label htmlFor="nombre">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email || ""}
              onChange={(e) =>
                setPerfil({ ...perfil, [e.target.name]: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 outline-indigo-600 md:w-80"
            />
          </div>
          <div className="field flex justify-between gap-2 items-center">
            <label htmlFor="nombre">Telefono: </label>
            <input
              type="number"
              name="telefono"
              id="telefono"
              value={telefono || ""}
              onChange={(e) =>
                setPerfil({ ...perfil, [e.target.name]: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 outline-indigo-600 md:w-80"
            />
          </div>
          <div className="field flex justify-between gap-2 items-center">
            <label htmlFor="nombre">Web: </label>
            <input
              type="text"
              name="web"
              id="web"
              value={web || ""}
              onChange={(e) =>
                setPerfil({ ...perfil, [e.target.name]: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 outline-indigo-600 md:w-80"
            />
          </div>
          <input
            type="submit"
            className="block bg bg-indigo-500 rounded-lg p-2 self-center text-white uppercase text-sm cursor-pointer hover:bg-indigo-700"
            value="Actualizar"
          />
        </form>
      </section>
    </>
  );
};

export default Perfil;
