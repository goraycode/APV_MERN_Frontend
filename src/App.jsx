import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import CrearCuenta from "./pages/CrearCuenta";
import Login from "./pages/Login";
import NuevoPassword from "./pages/NuevoPassword";
import OlvidePassword from "./pages/OlvidePassword";
import Perfil from "./pages/Perfil";
import AdministrarPacientes from "./pages/AdministrarPacientes";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";
import CambiarPassword from "./pages/CambiarPassword";

/* 
BrowserRouter todo tiene que estar agrupado en el 
Routes //permite agrupar diferentes rutas
Route //te permite solo una ruta
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/*path="/" cuando el usuario visite la ruta (/)
        carga el componente AuthLayout */}
            {/* rutas públicas */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<CrearCuenta />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
            </Route>

            {/* rutas privadas, el usuario tiene que estar autenticado*/}
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />}></Route>
              <Route path="perfil" element={<Perfil />}></Route>
              <Route
                path="cambiar-password"
                element={<CambiarPassword />}
              ></Route>
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
