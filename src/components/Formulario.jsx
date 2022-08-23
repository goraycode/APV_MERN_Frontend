import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [alerta, setAlerta] = useState({});
  const [id, setId] = useState(null);

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    //paara evitar la advertencia de que me quede sin control
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setEmail(paciente.email);
      setPropietario(paciente.propietario);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let campos = [nombre, propietario, email, fecha, sintomas];
    let camposVacios = campos.every((campo) => campo !== "");

    if (!camposVacios) {
      setAlerta({
        msg: "Completa todos los campos",
        error: true,
      });
      return;
    }

    setAlerta({ msg: "Paciente guardado" });

    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });

    setNombre("");
    setEmail("");
    setPropietario("");
    setFecha("");
    setSintomas("");
    setId("");

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const { msg } = alerta;

  return (
    <>
      <form
        action=""
        className="caret-indigo-600 flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-indigo-600 text-xl my-2 font-bold">
          Registra tus pacientes
        </h2>
        {msg && <Alerta alerta={alerta} />}
        <div className="field flex justify-between">
          <label htmlFor="nombre">Nombre de la mascota: </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 outline-indigo-600 md:w-80"
          />
        </div>
        <div className="field flex justify-between">
          <label htmlFor="propietario">Propietario: </label>
          <input
            type="text"
            name="propietario"
            id="propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 outline-indigo-600 md:w-80"
          />
        </div>
        <div className="field flex justify-between">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 outline-indigo-600 md:w-80"
          />
        </div>
        <div className="field flex justify-between">
          <label htmlFor="fecha">Fecha de alta: </label>
          <input
            type="date"
            name="fecha"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 outline-indigo-600 md:w-80"
          />
        </div>
        <div className="field flex flex-col">
          <label htmlFor="sintomas">Sintomas: </label>
          <textarea
            name="sintomas"
            id="sintomas"
            cols="30"
            rows="10"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 outline-indigo-600 resize-none overflow-y-scroll mt-4"
          ></textarea>
        </div>
        <input
          type="submit"
          className="bg bg-indigo-500 rounded-lg py-2 text-white uppercase text-lg cursor-pointer hover:bg-indigo-700"
          value={`${id ? "Actualizar datos" : "Guardar"}`}
        />
      </form>
    </>
  );
};

export default Formulario;
