import { useState } from "react";
import { useOrders } from "../context/OrderContext";

function FindOrderByCustomerId() {
    const { getOrder } = useOrders();
    const [customerId, setCustomerId] = useState("");
    const [foundOrders, setFoundOrders] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!customerId.trim()) {
            setError("⚠️ Por favor ingresa un ID de cliente válido.");
            setFoundOrders([]);
            return;
        }

        try {
            setLoading(true);
            setError("");
            const data = await getOrder(customerId);

            if (data && data.length > 0) {
                setFoundOrders(data);
            } else {
                setFoundOrders([]);
                setError("❌ No se encontraron pedidos para ese cliente.");
            }
        } catch (err) {
            console.error(err);
            setError("❌ Error al buscar los pedidos.");
            setFoundOrders([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-white py-10 px-5 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Buscar Pedidos por ID de Cliente
            </h1>

            {/* Barra de búsqueda */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-md">
                <input
                    type="text"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="Ingresa el ID del cliente (Ej: CUST001)..."
                    className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className={`bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold transition ${loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                >
                    {loading ? "Buscando..." : "🔍 Buscar"}
                </button>
            </div>

            {/* Mensajes */}
            {error && <p className="text-red-400 mb-4">{error}</p>}

            {/* Resultado */}
            {foundOrders.length > 0 && (
                <div className="w-full max-w-2xl space-y-4">
                    {foundOrders.map((order, index) => (
                        <div
                            key={index}
                            className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 shadow-lg transition-all duration-300"
                        >
                            <h2 className="text-xl font-semibold text-indigo-300 mb-3">
                                Pedido: {order.orderID ?? "—"}
                            </h2>

                            <p className="text-sm text-zinc-400 mb-1">
                                <span className="font-semibold text-zinc-300">Estado:</span>{" "}
                                {order.status ?? "N/A"}
                            </p>
                            <p className="text-sm text-zinc-400 mb-1">
                                <span className="font-semibold text-zinc-300">Cliente ID:</span>{" "}
                                {order.customerID ?? "N/A"}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FindOrderByCustomerId;