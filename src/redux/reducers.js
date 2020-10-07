import { GetImpulses } from "../api";
import moment from "moment";
import { DAY, RANGE, WEEK, YEAR } from "../tools/constant";

export const getReducers = (state, setState) => ({
  setLoading: () => {
    setState({ ...state, loading: true });
  },
  selectEndpoints: (endpoints) => {
    const charData = convertToChartData(
      state.endpointGroupedForDate.filter(({ name }) =>
        endpoints.includes(name)
      ),
      state.dateType === YEAR
    );
    setState({
      ...state,
      checkedEndpoints: endpoints,
      charData,
    });
  },
  fetchData: async (dateType, date) => {
    setState({ ...state, loading: true });
    const fetchedData = await new Promise((resolve) => {
      if (state.fetchedData.length)
        setTimeout(() => {
          resolve(state.fetchedData);
        }, 0);
      resolve(GetImpulses(dateType, date));
    }).then((data) => data);

    let impulses = {};
    fetchedData.forEach((impulse) => {
      if (!impulses[impulse.name]) impulses[impulse.name] = [];
      impulses[impulse.name].push(impulse);
    });
    let endpointGroupedForDate = groupEndpointsByDate(impulses, dateType, date);

    const endpoints = endpointGroupedForDate.map(({ name }) => name);
    const charData = convertToChartData(
      endpointGroupedForDate,
      dateType === YEAR
    );
    setState({
      ...state,
      endpoints,
      checkedEndpoints: endpoints,
      fetchedData,
      endpointGroupedForDate,
      dateType,
      loading: false,
      charData,
    });
  },
  setDateType: (dateType) =>
    setState({
      ...state,
      loading: false,
      dateType,
    }),
});

const convertToChartData = (data, isSort) => {
  let charData = [];
  data.forEach((item) => {
    charData = charData.concat(
      item.endpoints.map((imp) => ({
        name: item.name,
        sum: +imp.sum,
        count: +imp.count,
        date: imp.date,
      }))
    );
  });
  if (isSort)
    return charData.sort(
      (a, b) =>
        moment(a.date, "DD.MM.YYYY").valueOf() -
        moment(b.date, "DD.MM.YYYY").valueOf()
    );
  return charData;
};

const groupEndpointsByDate = (impulses, dateType, date) => {
  const { from, to } = getRangeByDateType(dateType, date);
  let endpointGroupedForDate = [];
  let id = 0;
  for (const impulsesKey in impulses) {
    let endpoints = [];
    let endpointIsEmpty = true;
    for (
      let date = from.clone();
      date.valueOf() < to.valueOf();
      date = date.add(1, "days")
    ) {
      let sum = 0;
      let count = 0;
      for (const endpoint of impulses[impulsesKey]) {
        if (date.format("l") === moment(endpoint.date).format("l")) {
          count++;
          sum = +sum + parseFloat(endpoint.price);
        }
      }
      if (dateType !== YEAR || count)
        endpoints.push({ date: date.format("l"), count, sum });
      if (count) endpointIsEmpty = false;
    }
    if (!endpointIsEmpty)
      endpointGroupedForDate.push({ name: impulsesKey, id: id++, endpoints });
  }
  return endpointGroupedForDate;
};

const getRangeByDateType = (dateType, date) => {
  let to = moment();
  let from = moment(to).subtract(1, "months");
  switch (dateType) {
    case DAY:
      to = moment(date);
      from = moment(to).subtract(1, "days");
      break;
    case WEEK:
      from = moment(to).subtract(1, "weeks");
      break;
    case YEAR:
      from = moment(to).subtract(1, "years");
      break;
    case RANGE:
      from = moment(date.from);
      to = moment(date.to);
      break;
    default:
      break;
  }
  return { from, to };
};
