import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <>
      <div className="contenedor mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
        <button
          type="button"
          className="block font-bold text-xl mb-2 text-center p-2 rounded-lg bg bg-indigo-600 text-white md:hidden"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Ocultar formulario" : "Mostrar Formulario"}
        </button>
        <section className="shadow-lg p-2 rounded-lg flex flex-col">
          <div className={`md:block ${mostrarFormulario ? "block" : "hidden"}`}>
            <Formulario />
          </div>
        </section>
        <section className="shadow-lg p-2 rounded-lg">
          <h2 className="text-center text-xl font-bold">Lista de pacientes</h2>
          <ListadoPacientes />
        </section>
      </div>
    </>
  );
};

export default AdministrarPacientes;
