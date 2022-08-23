import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="contenedor mx-auto my-5 flex gap-5">
      <Link
        to={"/admin/perfil"}
        className="font-bold uppercase text-gray-500 hover:text-indigo-600"
      >
        Perfil
      </Link>
      <Link
        to={"/admin/cambiar-password"}
        className="font-bold uppercase text-gray-500 hover:text-indigo-600"
      >
        Cambiar password
      </Link>
    </nav>
  );
};

export default AdminNav;
