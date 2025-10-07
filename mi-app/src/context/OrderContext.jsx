import { createContext, useContext, useState } from "react";
import {
    createOrderRequest,
    getOrdersRequest,
    updateOrderRequest,
    getOrderById
} from "../api/order";

const OrderContext = createContext();

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error("useOrders must be used within a OrderProvider");
    return context;
};

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const res = await getOrdersRequest();
            setOrders(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createOrder = async (order) => {
        try {
            const res = await createOrderRequest(order);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateOrder = async (order) => {
        try {
            await updateOrderRequest(order);
        } catch (error) {
            console.error(error);
        }
    };

    const getOrderByClient = async (id) => {
        try {
            const res = await getOrderById(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <OrderContext.Provider
            value={{
                orders,
                getOrders,
                createOrder,
                updateOrder,
                getOrderByClient
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}
