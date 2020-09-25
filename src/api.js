import moment from "moment";

const fetchFromUrl = async (url) => {
  let response = await fetch(`http://localhost:3004/${url}`);
  return await response.json();
};
const impFetchFromUrl = async (url) => {
  let response = await fetch(
    `https://application0.impulse.ottry.com/api/${url}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1YmFiYTEyNjMxNTE0MDc4ZmU2NmM2NzAiLCJpYXQiOjE2MDEwMTE4MzUsImV4cCI6MTYwNjU0MTQzNX0.9IFhM3LYNGjOqhqStuUwGOMn_yb7EO9VydQmh4lHUi61vLVvvrHrBElhCEvBJpK32zp1PG-PNBgmzABlcBFo-g",
      },
    }
  );
  return await response.json();
};

export const GetImpulses = async () => {
  console.log(new Date());
  let ret = await impFetchFromUrl(
    "users/5baba12631514078fe66c670/pageImpulseIdProjections?page=0&size=20&sort=id%2Cdesc&status=4"
  );
  let array = [];
  for (let i = 0; i < 1; i++)
    for (const imp of ret.content) {
      const impulse = await impFetchFromUrl(`impulses/search/findById?id=${imp.id}`);
      for (const i of impulse.impulseEndpoints) {
        const cutImpulse = {
          date: impulse.modified,
          name: i.name,
          service: impulse.impulseService.name,
          price: i.price,
        };
        array.push(cutImpulse);
      }
    }
  console.log(ret.content);
  let impulses = {};
  for(const imp of array){
    if(!impulses[imp.name])impulses[imp.name]= [];
    impulses[imp.name].push(imp)
  }


  let endpointGroupedForDate = [];
  for(const impulsesKey in impulses) {
    let endpoints = [];
    for (let date = moment(); date.valueOf() > moment().subtract(30, 'days').valueOf(); date = date.subtract(1, 'days')) {
      let sum = 0;
      let count = 0;

      for (const endp of impulses[impulsesKey]) {
        if (date.format('l') === moment(endp.date).format('l')) {
          count++;
          sum += endp.price;
        }
        endpoints.push({date: moment(endp.date).format('l'), count, sum})
      }
      console.log(endpoints);
      endpointGroupedForDate.push({name:impulsesKey, endpoints })
    }
  }
  console.log(endpointGroupedForDate);
  console.log(new Date());
};

export const getServicesName = (type, date) => fetchFromUrl(`services`);
//fetchFromUrl(`services\names\?type=${type}&date=${date}`)
//fetchFromUrl(`services\names\?type=range&from=${date.from}&to=${date.to}`)

export const getServices = (type = "month", date) => fetchFromUrl(`${type}S`);
//fetchFromUrl(`services\?type=${type}&date=${date}`)
//fetchFromUrl(`services\?type=range&from=${date.from}&to=${date.to}`)

export const getEndpoints = (type = "month", service, date) =>
  fetchFromUrl(`${type}I`);
//fetchFromUrl(`service\?id=${service}&type=${type}&date=${date}`)
//fetchFromUrl(`service\?id=${service}&type=range&from=${date.from}&to=${date.to}`)
