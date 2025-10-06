import axios from "./axios";

export const getClientsRequest = async () => axios.get("/clients");

export const createClientRequest = async (client) =>
  axios.post("/customer/createcustomer", client);

export const updateClientRequest = async (id, newFields) =>
  axios.put(`/customer/updateCustomer/${id}`, newFields);