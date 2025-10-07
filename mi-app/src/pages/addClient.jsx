import { get, set, useForm } from "react-hook-form";
import { useClients } from "../context/ClientContext";
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from "react";

function AddClient() {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const { createClient, getClient, updateClient } = useClients();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadClient() {
      if (params.id) {
        const client = await getClient(params.id);
        console.log(client);
        setValue("document", client.document);
        setValue("firstname", client.firstname);
        setValue("lastname", client.lastname);
        setValue("address", client.address);
        setValue("phone", client.phone);
        setValue("email", client.email);
      }
    }
    loadClient();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateClient(params.id, data);
    } else {
      await createClient(data);
    }
    navigate('/allClients');
    reset();
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800">
      <div className="bg-zinc-900 shadow-2xl shadow-black/30 border border-zinc-700 max-w-md w-full p-8 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Agregar Cliente
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          {[
            { name: "document", label: "Documento", type: "text" },
            { name: "firstname", label: "Nombre", type: "text" },
            { name: "lastname", label: "Apellido", type: "text" },
            { name: "address", label: "Dirección", type: "text" },
            { name: "phone", label: "Teléfono", type: "text" },
            { name: "email", label: "Correo electrónico", type: "email" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-sm font-semibold text-gray-300 mb-1">
                {label}
              </label>
              <input
                type={type}
                placeholder={label}
                {...register(name, { required: `${label} es obligatorio` })}
                className={`w-full bg-zinc-800 text-white px-4 py-2 rounded-md outline-none border ${errors[name]
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-zinc-700 focus:ring-2 focus:ring-blue-500"
                  } transition`}
              />
              {errors[name] && (
                <p className="text-red-400 text-sm mt-1">
                  {errors[name]?.message}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 font-semibold rounded-md text-white transition-all duration-200 ${loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Guardando..." : "Guardar Cliente"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddClient;
