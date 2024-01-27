import { NavbarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-full bg-neutral-800 flex items-center justify-center gap-6">
      {NavbarLinks.map((link) => {
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`p-4 text-xl hover:text-emerald-200 hover:-translate-y-0.5 transition-all duration-150 ${
              pathname === link.route
                ? "underline text-emerald-300 font-bold underline-offset-4 tracking-widest"
                : ""
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default Navbar;
