import { useForm } from 'react-hook-form';
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { signin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/homeIn");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
    console.log(data);
  });

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-900">
      <div className="bg-zinc-800 w-full max-w-md p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Username"
          />
          {errors.username && <p className="text-red-500">Username is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500">Password is required</p>}

          <button
            type="submit"
            className="mt-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition"
          >
            Entrar
          </button>

          <p className="flex gap-x-2 justify-between">
            Don't have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
          </p>
        </form>
      </div>
    </div>

  )
}

export default LoginPage