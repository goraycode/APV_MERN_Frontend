import usePacientes from "../hooks/usePacientes";
const Paciente = (props) => {
  const { setEdicion, setEliminar } = usePacientes();

  const { paciente } = props;

  const { nombre, propietario, email, sintomas, fecha } = paciente;

  //formatear fecha

  //UNA FORMA
  const fechaCorta = new Date(fecha).getFullYear();

  //OTRA FORMA
  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat("es-ES", { dateStyle: "short" }).format(
      nuevaFecha
    );
  };

  return (
    <>
      <div className="bg bg-indigo-100 rounded-lg p-2 my-4">
        <p>Mascota: {nombre}</p>
        <p>Propietario: {propietario}</p>
        <p>Email: {email}</p>
        <p>Sintomas: {sintomas}</p>
        <p>Fecha de ingreso: {formatearFecha(fecha)}</p>
        <div className="btns flex justify-between mt-2">
          <button
            className="bg bg-blue-500 rounded-lg flex justify-center p-2 w-40 hover:bg-blue-700"
            onClick={() => setEdicion(paciente)}
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            className="bg bg-red-500 rounded-lg flex justify-center p-2 w-40 hover:bg-red-700"
            onClick={() => setEliminar(paciente)}
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Paciente;
