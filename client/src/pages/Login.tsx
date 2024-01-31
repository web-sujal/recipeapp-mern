import AuthForm from "@/components/forms/AuthForm";
import Navbar from "@/components/shared/Navbar";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "" || password === "") {
      return alert("username or password fields cannot be empty");
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true },
      );

      window.localStorage.setItem("userId", res.data.data._id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="absolute left-0 right-0 top-0">
        <Navbar />
      </div>
      <h2 className="text-4xl font-extrabold tracking-wide">Login</h2>
      <AuthForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        onSubmit={onSubmit}
      />

      <p className="text-sm text-opacity-90">
        Don't have an account?{" "}
        <Link
          to="/sign-up"
          className="cursor-pointer text-blue-500 underline-offset-4 transition-all duration-150 hover:underline"
        >
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
