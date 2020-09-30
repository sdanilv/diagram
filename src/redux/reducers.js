import {getEndpoints, GetImpulses, getServices, getServicesName} from "../api";
import { formattedDate } from "../tools/FomatedDate";

export const getReducers = (state, setState) => ({
  fetchServiceName: async () => {
    const services = await getServicesName();
    setState({ ...state, services, checkedServices: services });
  },
  fetchData: async (dateType, date) => {
    // const services = await getServicesName(dateType, date);
    setState({...state,  loading:true })
    const services = ["Ticket"];
    let fetchedData = [];
    if (services.length === 0) return;
    if (services.length === 1) {
      // fetchedData = await getEndpoints(dateType, services[0]);
      fetchedData = await GetImpulses(dateType, date)

    } else fetchedData = await getServices(dateType);
    setState({
      ...state,
      fetchedData,
      dateType,
      services,
      checkedServices: services,
      loading:false,
      charData: convertToChartData(fetchedData, dateType),
    });
  },
  setCheckedServices: async (checkedServices) => {
    const { dateType, fetchedData } = state;
    let data;
    if (checkedServices.length === 1) {
      data = await getEndpoints(dateType, checkedServices[0]);
      const endpoints = data.map((endpoints) => endpoints.name);
      setState({
        ...state,
        checkedServices,
        endpoints: endpoints,
        endpointsData: data,
        checkedEndpoints: endpoints,
        charData: convertToChartData(data, state.dateType),
      });
    } else {
      data = fetchedData.filter((service) =>
        checkedServices.includes(service.name)
      );
      setState({
        ...state,
        checkedServices,

        charData: convertToChartData(data, state.dateType),
      });
    }
  },
  setCheckedEndpoints: async (checkedEndpoints) => {
    const { endpointsData } = state;
    let data = endpointsData.filter((endpoint) =>
      checkedEndpoints.includes(endpoint.name)
    );
    setState({
      ...state,
      checkedEndpoints,
      charData: convertToChartData(data, state.dateType),
    });
  },
  setDateType: (dateType) => {
    setState({
      ...state,
      dateType,
    });
  },
});

const convertToChartData = (data, dateType) => {
  let charData = [];
  data.forEach((item) => {
    charData = charData.concat(
      item.endpoints.map((imp) => ({
        name: item.name,
        sum: +imp.sum,
        count: +imp.count,
        date:  imp.date,
      }))
    );
  });
  return charData;
};
