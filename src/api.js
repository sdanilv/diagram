const fetchToUrl = async (url) => {
  let response = await fetch(`http://localhost:3004/${url}`);
  return await response.json();
};

export const getServicesName = () => fetchToUrl(`services`);

export const getServices = (type = "month") => fetchToUrl(`${type}S`);
//fetchToUrl(`services\?type=${type}`)

export const getEndpoints = (type = "month", service) => fetchToUrl(`${type}I`);
//fetchToUrl(`service\?id=${service}&type=${type}`)

export const getDataInRange = (from, to) => fetchToUrl(`monthS`);
// fetchToUrl(`range?from=${from}&to=${to}`);
