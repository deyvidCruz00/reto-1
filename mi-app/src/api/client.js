import axios from "./axios";

export const getClientsRequest = async () => axios.get("/customer/customers");

export const createClientRequest = async (client) =>
  axios.post("/customer/createcustomer", client);

export const updateClientRequest = async (id, client) =>
  axios.put(`/customer/updateCustomer/${id}`, client);

export const getClientById = async (id) =>
  axios.get(`/customer/findcustomerbyid/${id}`);