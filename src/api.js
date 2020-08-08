import axios from "axios";
import { WEEK } from "./tools/constant";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3004/",
});

export const fetchImpulsesForType = async (type = "month") => {
  let impulses = [];
  if (type === WEEK) {
    const { data } = await axiosInstance.get(
      `month?_sort=id&_order=desc&_limit=14`
    );
    impulses = data.reverse();
  } else {
    const { data } = await axiosInstance.get(`${type}`);
    impulses = data;
  }
  return impulses;
};
export const fetchImpulsesInRange = async (from, to) => {
  console.log(`range?from=${from}&to=${to}`);
  const { data } = await axiosInstance.get(`month?_start=${10}&_end=${20}`);
  // const { data } = await axiosInstance.get(`range?from=${from}&to=${to}`);
  return data;
};
