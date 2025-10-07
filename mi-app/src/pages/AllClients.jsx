import { useEffect } from "react";
import { useClients } from "../context/ClientContext";
import { Link } from "react-router-dom";

function AllClients() {
  const { clients, getClients, updateClient } = useClients();

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    console.log("Clientes cargados:", clients);
  }, [clients]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-white py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-400">
          Lista de Clientes
        </h1>

        {clients.length === 0 ? (
          <p className="text-center text-zinc-400">No hay clientes registrados.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => {
              const clientId = client._id ?? client.id ?? "N/A";
              const documentValue = client.document ?? client.documento ?? "N/A";

              return (
                <div
                  key={clientId}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg p-5 shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-xl font-semibold text-white">
                        {client.firstname ?? "—"} {client.lastname ?? ""}
                      </h2>
                      <span className="text-xs px-2 py-1 bg-zinc-800 border border-zinc-700 rounded">
                        ID:{" "}
                        <span className="font-mono ml-1 text-zinc-300">
                          {clientId}
                        </span>
                      </span>
                    </div>

                    <p className="text-sm text-zinc-400 mb-1">
                      <span className="font-semibold text-zinc-300">
                        Documento:
                      </span>{" "}
                      <span className="text-white">{documentValue}</span>
                    </p>

                    <p className="text-sm text-zinc-400 mb-1">
                      <span className="font-semibold text-zinc-300">Email:</span>{" "}
                      {client.email ?? "N/A"}
                    </p>

                    <p className="text-sm text-zinc-400 mb-1">
                      <span className="font-semibold text-zinc-300">
                        Teléfono:
                      </span>{" "}
                      {client.phone ?? "N/A"}
                    </p>

                    <p className="text-sm text-zinc-400">
                      <span className="font-semibold text-zinc-300">
                        Dirección:
                      </span>{" "}
                      {client.address ?? "N/A"}
                    </p>
                  </div>

                  {/* Botones visuales */}
                  <div className="mt-4 flex justify-between gap-2">
                    <Link
                      to={`/addClient/${clientId}`}
                      onClick={() => console.log("Probando:", clientId)}
                      className="w-1/2 bg-gray-800 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-center"
                    >
                      ✏️ Editar
                    </Link>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllClients;
