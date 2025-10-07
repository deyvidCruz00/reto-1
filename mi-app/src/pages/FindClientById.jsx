import { useState } from "react";
import { useClients } from "../context/ClientContext";

function FindClientById() {
  const { getClient } = useClients();
  const [clientId, setClientId] = useState("");
  const [foundClient, setFoundClient] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!clientId.trim()) {
      setError("⚠️ Por favor ingresa un ID válido.");
      setFoundClient(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await getClient(clientId);

      if (data) {
        setFoundClient(data);
      } else {
        setFoundClient(null);
        setError("❌ No se encontró un cliente con ese ID.");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Error al buscar el cliente.");
      setFoundClient(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-white py-10 px-5 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8  text-center">
        Buscar Cliente por ID
      </h1>

      {/* Barra de búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-md">
        <input
          type="text"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          placeholder="Ingresa el ID del cliente..."
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Buscando..." : "🔍 Buscar"}
        </button>
      </div>

      {/* Mensajes */}
      {error && <p className="text-red-400 mb-4">{error}</p>}

      {/* Resultado */}
      {foundClient && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 shadow-lg w-full max-w-md transition-all duration-300">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-3">
            {foundClient.firstname ?? "—"} {foundClient.lastname ?? ""}
          </h2>

          <p className="text-sm text-zinc-400 mb-1">
            <span className="font-semibold text-zinc-300">ID:</span>{" "}
            {foundClient._id ?? foundClient.id ?? "N/A"}
          </p>
          <p className="text-sm text-zinc-400 mb-1">
            <span className="font-semibold text-zinc-300">Documento:</span>{" "}
            {foundClient.document ?? foundClient.documento ?? "N/A"}
          </p>
          <p className="text-sm text-zinc-400 mb-1">
            <span className="font-semibold text-zinc-300">Email:</span>{" "}
            {foundClient.email ?? "N/A"}
          </p>
          <p className="text-sm text-zinc-400 mb-1">
            <span className="font-semibold text-zinc-300">Teléfono:</span>{" "}
            {foundClient.phone ?? "N/A"}
          </p>
          <p className="text-sm text-zinc-400">
            <span className="font-semibold text-zinc-300">Dirección:</span>{" "}
            {foundClient.address ?? "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}

export default FindClientById;
