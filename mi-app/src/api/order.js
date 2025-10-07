import axios from "./axios";

export const getOrdersRequest = async () => axios.get("/order/orders");

export const createOrderRequest = async (order) =>
  axios.post("/order/createorder", order);

export const updateOrderRequest = async (order) =>
  axios.post(`/order/updateorderstatus`, order);

export const getOrderById = async (id) =>
  axios.post("/order/findorderbycustomerid/", { customerid: id });
