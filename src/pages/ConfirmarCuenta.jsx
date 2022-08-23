import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
  const params = useParams();
  const { id } = params;

  /* el array vacio ahi es para que se ejecute una sola vex de una vez 
  que este listo el componente*/

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${id}`;
        const { data } = await axios.get(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <section>
        <h1 className="text-indigo-600 font-black text-5xl text-center">
          Confirma tu {""}
          <span className="text-black">cuenta</span>
        </h1>
      </section>
      <section className="mt-10 bg-gray-100 shadow-md p-5 rounded-xl  md:mt-0">
        {!cargando && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link to="/" className="hover:underline">
            Inicia sesión
          </Link>
        )}
      </section>
    </>
  );
};

export default ConfirmarCuenta;
