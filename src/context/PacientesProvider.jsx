import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

export const PacientesProvider = (props) => {
  const { children } = props;
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const { auth } = useAuth();

  //traemos a los pacientes
  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.get("/pacientes", config);
        //para consumirlo en el componente de listadoPàcientes
        setPacientes(data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerPacientes();
  }, [auth]);

  const guardarPaciente = async (paciente) => {
    //Almacenamos a la mascota en la base de datos
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (paciente.id) {
      const { data } = await clienteAxios.put(
        `/pacientes/${paciente.id}`,
        paciente,
        config
      );

      //para que se sincronizen los cambios que hice con el listado de pacientes
      const pacientesActualizado = pacientes.map((pacienteState) =>
        pacienteState._id === data._id ? data : pacienteState
      );
      setPacientes(pacientesActualizado);
    } else {
      try {
        const { data } = await clienteAxios.post(
          "/pacientes",
          paciente,
          config
        );

        //para no guardar cosas que no necesito
        /*  paciente almacenado va a crear un nuevo objeto con esos valores que no quiero*/
        const { createdAt, updateAt, __v, ...pacienteAlmacenado } = data;

        //Se muestra primero el nuevo paciente
        setPacientes([pacienteAlmacenado.pacienteGuardado, ...pacientes]);
      } catch (error) {
        console.error(error.response.data.msg);
      }
    }
  };

  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };

  const setEliminar = async (paciente) => {
    //eliminamos al paciente

    const confirmar = confirm("¿Estás seguro de eliminar?");

    if (!confirmar) return;

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await clienteAxios.delete(
        `/pacientes/${paciente._id}`,
        config
      );
      console.log(data);
      const pacientesActualizado = pacientes.filter(
        (pacientesState) => pacientesState._id !== paciente._id
      );

      setPacientes(pacientesActualizado);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PacientesContext.Provider
      value={{ pacientes, guardarPaciente, setEdicion, paciente, setEliminar }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
