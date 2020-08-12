import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3004/",
});

export const getServicesName = async () => {
  const { data } = await axiosInstance.get(`services`);
  return data;
};

export const getServices = async (type = "month") => {
  const { data } = await axiosInstance.get(`${type}S`);
  return data;
};

export const getEndpoints = async (type = "month", service) => {
  const { data } = await axiosInstance.get(`${type}I`);
  return data;
};

export const getDataInRange = async (from, to) => {
  console.log(`range?from=${from}&to=${to}`);
  const { data } = await axiosInstance.get(`monthS`);
  // const { data } = await axiosInstance.get(`range?from=${from}&to=${to}`);
  return data;
};
