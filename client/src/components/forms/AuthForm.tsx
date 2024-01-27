import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

type AuthFormProps = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  label: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

const AuthForm = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}: AuthFormProps) => {
  return (
    <form
      className="flex flex-col items-start gap-4 text-xl"
      onSubmit={onSubmit}
    >
      {/* username */}
      <label htmlFor="username" className="translate-y-2">
        Username:{" "}
      </label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="text-black outline-none ring-transparent rounded-md py-2 px-3 caret-slate-800"
      />

      {/* password */}
      <label htmlFor="password" className="translate-y-2">
        Password:{" "}
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="text-black outline-none ring-transparent rounded-md py-2 px-3"
      />
      <Button type="submit" className="mx-auto">
        {label}
      </Button>
    </form>
  );
};

export default AuthForm;
