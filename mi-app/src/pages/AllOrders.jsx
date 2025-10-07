import { useEffect } from "react";
import { useOrders } from "../context/OrderContext";
import { Link } from "react-router-dom";

function AllOrders() {
  const { orders, getOrders } = useOrders();

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    console.log("Órdenes cargadas:", orders);
  }, [orders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-white py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-400">
          Lista de Órdenes
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-zinc-400">
            No hay órdenes registradas.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => {
              const orderId = order.orderID ?? "N/A";
              const customerId = order.customerID ?? "N/A";
              const status = order.status ?? "Unknown";

              return (
                <div
                  key={orderId}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg p-5 shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-xl font-semibold text-white">
                        Pedido {orderId}
                      </h2>
                      <span className="text-xs px-2 py-1 bg-zinc-800 border border-zinc-700 rounded">
                        Cliente:{" "}
                        <span className="font-mono ml-1 text-zinc-300">
                          {customerId}
                        </span>
                      </span>
                    </div>

                    <p className="text-sm text-zinc-400">
                      <span className="font-semibold text-zinc-300">
                        Estado:
                      </span>{" "}
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          status === "Received"
                            ? "bg-green-600"
                            : status === "In progress"
                            ? "bg-yellow-600"
                            : status === "Sended"
                            ? "bg-blue-600"
                            : "bg-gray-600"
                        }`}
                      >
                        {status}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between gap-2">
                    <Link
                      to={`/addOrder/${orderId}`}
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

export default AllOrders;
