import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/homeIn");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
  });

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-900">
      <div className="bg-zinc-800 w-full max-w-md p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Crear Cuenta
        </h1>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mb-2">
              Username is required
            </p>
          )}

          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">Email is required</p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              Password is required
            </p>
          )}

          <input
            type="text"
            {...register("lastname", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Lastname"
          />

          <input
            type="text"
            {...register("firstname", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Firstname"
          />

          <input
            type="text"
            {...register("country", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Country"
          />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition text-white"
          >
            Register
          </button>
          <p>
            Already Have an Account?
            <Link className="text-sky-500" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
