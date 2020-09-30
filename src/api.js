import moment from "moment";
import {DAY, RANGE, WEEK, YEAR} from "./tools/constant";

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
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1Y2Y3NmZlOTMyZjc0ODBlZjdkY2QwMzMiLCJpYXQiOjE2MDEzNjg2MjYsImV4cCI6MTYwNjg5ODIyNn0.DLjWbVVDhg9WQpOfVTSXeqBUQ50iCUZusO3MkYkYiBIEZWjKhlLmcyyViXqMQlXov-oSQa__p9ecP1aGI6UBkQ",
      },
    }
  );
  return await response.json();
};

export const GetImpulses = async (dateType, date) => {
  let ret = await impFetchFromUrl(
    "users/5cf76fe932f7480ef7dcd033/pageImpulseIdProjections?page=0&size=10&sort=id%2Cdesc&status=4"
  );
  let array = [];
  for (let i = 0; i < 1; i++)
    for (const imp of ret.content) {
      const impulse = await impFetchFromUrl(
        `impulses/search/findById?id=${imp.id}`
      );
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
  let impulses = {};
  for (const imp of array) {
    if (!impulses[imp.name]) impulses[imp.name] = [];
    impulses[imp.name].push(imp);
  }

  let dateFrom = moment();

  let dateTo = moment(dateFrom).subtract(1, "months");
  switch (dateType) {
    case DAY:
      dateFrom = moment(date);
      dateTo = moment(dateFrom).subtract(1, "days");
      break;
    case WEEK:
      dateTo = moment(dateFrom).subtract(1, "weeks");
      break;
    case YEAR:
      dateTo = moment(dateFrom).subtract(1, "years");
      break;
    case RANGE:
      dateTo = moment(date.from).subtract(1, "days");
      dateFrom = moment(date.to);
      break;
  }

console.log(dateFrom)
console.log(dateTo)
  let endpointGroupedForDate = [];
  let i = 0;
  for (const impulsesKey in impulses) {
    let endpoints = [];

    for (
      let date = dateFrom;
      date.valueOf() > dateTo.valueOf();
      date = date.subtract(1, "days")
    ) {
      let sum = 0;
      let count = 0;
      for (const endp of impulses[impulsesKey]) {
        if (date.format("l") === moment(endp.date).format("l")) {
          count++;
          sum = +sum + parseFloat(endp.price);
        }
      }
      if (count !== 0) endpoints.push({ date: date.format("l"), count, sum });
    }

    endpointGroupedForDate.push({ name: impulsesKey, id: i++, endpoints });
  }

  return endpointGroupedForDate;
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
