import { NavbarLinks } from "@/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";

const Navbar = () => {
  const { pathname } = useLocation();
  const userId = window.localStorage.getItem("userId");

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post("http://localhost:8000/auth/logout", userId, {
        withCredentials: true,
      });
      window.localStorage.removeItem("userId");

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sticky top-0 w-full px-4 bg-neutral-800 flex items-center justify-center gap-1 md:gap-6">
      {NavbarLinks.map((link) => {
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`p-4 leading-tight md:text-xl hover:text-emerald-200 hover:-translate-y-0.5 transition-all duration-150 ${
              pathname === link.route
                ? "underline text-emerald-300 font-bold underline-offset-4 md:tracking-widest"
                : ""
            }`}
          >
            {link.label}
          </Link>
        );
      })}

      {userId ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Link
          to="/login"
          className="p-4 md:text-xl hover:text-emerald-200 hover:-translate-y-0.5 transition-all duration-150 truncate"
        >
          Login/Register
        </Link>
      )}
    </div>
  );
};

export default Navbar;
