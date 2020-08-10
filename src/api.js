import axios from "axios";
import {MONTH, WEEK} from './tools/constant';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3004/",
});

export const fetchImpulsesForType = async (type = "month") => {
  const { data } = await axiosInstance.get(`${type===WEEK?MONTH:type}`);

  return data;
};
export const fetchImpulsesInRange = async (from, to) => {
  console.log(`range?from=${from}&to=${to}`);
  const { data } = await axiosInstance.get(`month`);
  // const { data } = await axiosInstance.get(`range?from=${from}&to=${to}`);
  return data;
};
