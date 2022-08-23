/* Aqui nace todo el estado global de los datos */
import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
const AuthContext = createContext();

const AuthProvider = (props) => {
  const { children } = props;
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  //utilizamos useEffect para que revise si el usuario esta autenticado o no
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      /* creamos una configuración para 
      acceder al perfil del veterinario con el token */
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios.get("/veterinarios/perfil", config);
        //para que la data este en el hook del state
        setAuth(data);
      } catch (error) {
        console.error(error.response.data.msg);
        //por si no est autenticado el usuario
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  const actualizarPerfil = async (perfil) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    /* creamos una configuración para 
    acceder al perfil del veterinario con el token */
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/veterinarios/perfil/${perfil._id}`;
      const { data } = await clienteAxios.put(url, perfil, config);
      return {
        msg: data.msg,
      };
    } catch (error) {
      return {
        msg: "Email ya esta en uso",
        error: true,
      };
    }
  };

  const actualizarPassword = async (datos) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    /* creamos una configuración para 
    acceder al perfil del veterinario con el token */
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/veterinarios/actualizar-password`;
      const { data } = await clienteAxios.put(url, datos, config);
      console.log(data);
      return {
        msg: data.msg,
      };
    } catch (error) {
      return {
        msg: "Password actual incorrecto",
        error: true,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        actualizarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
