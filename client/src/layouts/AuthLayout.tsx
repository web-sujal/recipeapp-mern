import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex h-screen justify-center items-center gap-2">
      <section className="flex flex-1 items-center justify-center flex-col py-10">
        <Outlet />
      </section>

      <img
        src="/assets/images/demon-slayer.jpg"
        alt="auth-image"
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
      />
    </div>
  );
};

export default AuthLayout;
