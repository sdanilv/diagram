const fetchFromUrl = async (url) => {
  let response = await fetch(`http://localhost:3004/${url}`);
  return await response.json();
};

export const getServicesName = (type, date) => fetchFromUrl(`services`);
//fetchFromUrl(`services\names\?type=${type}&date=${date}`)
//fetchFromUrl(`services\names\?type=range&from=${date.from}&to=${date.to}`)

export const getServices = (type = "month", date) => fetchFromUrl(`${type}S`);
//fetchFromUrl(`services\?type=${type}&date=${date}`)
//fetchFromUrl(`services\?type=range&from=${date.from}&to=${date.to}`)

export const getEndpoints = (type = "month", service, date) => fetchFromUrl(`${type}I`);
//fetchFromUrl(`service\?id=${service}&type=${type}&date=${date}`)
//fetchFromUrl(`service\?id=${service}&type=range&from=${date.from}&to=${date.to}`)

