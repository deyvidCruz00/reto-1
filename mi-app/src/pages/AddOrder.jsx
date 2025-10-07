import { useForm } from "react-hook-form";
import { useOrders } from "../context/OrderContext";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react";

function AddOrder() {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const { createOrder, getOrder, updateOrder } = useOrders();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadOrder() {
      if (params.id) {
        const order = await getOrder(params.id);
        console.log(order);
        setValue("customerid", order.customerid);
        setValue("orderID", order.orderID);
        setValue("status", order.status);
      }
    }
    loadOrder();
  }, [params.id, getOrder, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateOrder(params.id, data);
    } else {
      await createOrder(data);
    }
    navigate('/allClients');
    reset();
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800">
      <div className="bg-zinc-900 shadow-2xl shadow-black/30 border border-zinc-700 max-w-md w-full p-8 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Agregar Pedido
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* CustomerId */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              CustomerId
            </label>
            <input
              type="text"
              placeholder="CustomerId"
              {...register("customerid", { required: "CustomerId es obligatorio" })}
              className={`w-full bg-zinc-800 text-white px-4 py-2 rounded-md outline-none border ${errors.customerid
                ? "border-red-500 focus:ring-2 focus:ring-red-500"
                : "border-zinc-700 focus:ring-2 focus:ring-blue-500"
                } transition`}
            />
            {errors.customerid && (
              <p className="text-red-400 text-sm mt-1">
                {errors.customerid.message}
              </p>
            )}
          </div>

          {/* OrderID */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              OrderID
            </label>
            <input
              type="text"
              placeholder="OrderID"
              {...register("orderID", { required: "OrderID es obligatorio" })}
              className={`w-full bg-zinc-800 text-white px-4 py-2 rounded-md outline-none border ${errors.orderID
                ? "border-red-500 focus:ring-2 focus:ring-red-500"
                : "border-zinc-700 focus:ring-2 focus:ring-blue-500"
                } transition`}
            />
            {errors.orderID && (
              <p className="text-red-400 text-sm mt-1">
                {errors.orderID.message}
              </p>
            )}
          </div>

          {/* Status como select */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              Status
            </label>
            <select
              {...register("status", { required: "Status es obligatorio" })}
              className={`w-full bg-zinc-800 text-white px-4 py-2 rounded-md outline-none border ${errors.status
                ? "border-red-500 focus:ring-2 focus:ring-red-500"
                : "border-zinc-700 focus:ring-2 focus:ring-blue-500"
                } transition`}
            >
              <option value="">Selecciona un estado</option>
              <option value="Received">Received</option>
              <option value="In progress">In progress</option>
              <option value="Sended">Sended</option>
            </select>
            {errors.status && (
              <p className="text-red-400 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold rounded-md text-white transition-all duration-200 bg-blue-600 hover:bg-blue-700"
          >
            Guardar pedido
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddOrder;
