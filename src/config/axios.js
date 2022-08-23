import axios from "axios";
/* vamos a crear una URL base */
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
});

export default clienteAxios;