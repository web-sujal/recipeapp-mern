import { NavbarLinks } from "@/constants";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Navbar = () => {
  const { pathname } = useLocation();
  const [cookies, setCookies] = useCookies(["accessToken"]);

  const navigate = useNavigate();

  const logout = () => {
    setCookies("accessToken", "");
    window.localStorage.removeItem("userId");
    navigate("/login");
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

      {cookies.accessToken ? (
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
