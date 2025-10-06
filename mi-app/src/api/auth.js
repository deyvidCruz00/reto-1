import axios from "./axios";

export const registerRequest = async (user) =>
  axios.post(`login/auth/register`, user);

export const loginRequest = async (user) => axios.post(`login/auth/login`, user);
