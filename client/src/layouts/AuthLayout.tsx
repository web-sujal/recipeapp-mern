import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <section className="flex h-full flex-1 flex-col items-center justify-center">
        <Outlet />
      </section>

      <img
        src="/assets/images/demon-slayer.jpg"
        alt="auth-image"
        className="hidden h-screen w-1/2 bg-no-repeat object-cover xl:block"
      />
    </div>
  );
};

export default AuthLayout;
