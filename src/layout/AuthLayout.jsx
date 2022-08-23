import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto w-11/12 mt-12 md:mt-32  md:grid md:grid-cols-2 items-center justify-items-center">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
