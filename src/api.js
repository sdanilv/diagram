const impFetchFromUrl = async (url) => {
  let response = await fetch(
    `https://application0.impulse.ottry.com/api/${url}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1YmY1Njk5YmY0NDY2YjViNDgwNDc1YTciLCJpYXQiOjE2MDE1Mzk5NDQsImV4cCI6MTYwNzA2OTU0NH0.PQ1fYzCrtaOXP5Wl0yTvnme0-wXfcses7GjG4qYkWWzITqCpOt6BXQdc3-bLF8VYwb7zqfNNuW3QrvQd6xDzMA",
      },
    }
  );
  return await response.json();
};

export const GetImpulses = async (dateType, date) => {
  let { content } = await impFetchFromUrl(
    "users/5bf5699bf4466b5b480475a7/pageImpulseIdProjections?page=0&size=1000&sort=id%2Cdesc&status=4"
  );

  let requests = content.map((imp) =>
    impFetchFromUrl(`impulses/search/findById?id=${imp.id}`)
  );

  return Promise.all(requests)
  .then((res) => {
    return res.reduce(
      (accumulator, { impulseEndpoints, modified, impulseService }) => {
        for (const i of impulseEndpoints) {
          accumulator.push({
            date: modified,
            name: i.name,
            service: impulseService.name,
            price: i.price,
          });
        }
        return accumulator;
      },
      []
    );
  });
};
//{ impulseEndpoints, modified, impulseService }
// export const getServicesName = (type, date) => fetchFromUrl(`services`);
//fetchFromUrl(`services\names\?type=${type}&date=${date}`)
//fetchFromUrl(`services\names\?type=range&from=${date.from}&to=${date.to}`)

// export const getServices = (type = "month", date) => fetchFromUrl(`${type}S`);
//fetchFromUrl(`services\?type=${type}&date=${date}`)
//fetchFromUrl(`services\?type=range&from=${date.from}&to=${date.to}`)

// export const getEndpoints = (type = "month", service, date) =>
//   fetchFromUrl(`${type}I`);
//fetchFromUrl(`service\?id=${service}&type=${type}&date=${date}`)
//fetchFromUrl(`service\?id=${service}&type=range&from=${date.from}&to=${date.to}`)
