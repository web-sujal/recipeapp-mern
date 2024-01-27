import AuthForm from "@/components/forms/AuthForm";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-between">
      <h2 className="text-4xl font-extrabold tracking-wide">Register</h2>
      <AuthForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Signup"
        onSubmit={onSubmit}
      />

      <p className="text-sm text-opacity-90">
        Already a user?{" "}
        <Link
          to="/login"
          className="text-blue-500 hover:underline underline-offset-4 transition-all duration-150 cursor-pointer"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
