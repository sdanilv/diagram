import { GetImpulses } from "../api";
import moment from "moment";
import { DAY, RANGE, WEEK, YEAR } from "../tools/constant";

export const getReducers = (state, setState) => ({
  setLoading: () => {
    setState({ ...state, loading: true });
  },
  fetchData: async (dateType, date) => {
    console.log(new Date());
    setState({ ...state, loading: true });

    const fetchedData = state.fetchedData.length
      ? state.fetchedData
      : await GetImpulses(dateType, date);

    let impulses = {};
    for (const impulse of fetchedData) {
      if (!impulses[impulse.name]) impulses[impulse.name] = [];
      impulses[impulse.name].push(impulse);
    }

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
        to = moment(date.to).add(1, "days");
        break;
      default:break;
    }

    let endpointGroupedForDate = [];
    let i = 0;
    for (const impulsesKey in impulses) {
      let endpoints = [];

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
        if (count) endpoints.push({ date: date.format("l"), count, sum });
      }
      endpointGroupedForDate.push({ name: impulsesKey, id: i++, endpoints });
    }

    setState({
      ...state,
      fetchedData,
      dateType,
      loading: false,
      charData: convertToChartData(endpointGroupedForDate, dateType),
    });
    console.log(new Date());
  },
  setDateType: (dateType) =>
    setState({
      ...state,
      loading: false,
      dateType,
    }),
});

const convertToChartData = (data, dateType) => {
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
  return charData.sort(
    (a, b) =>
      moment(a.date, "DD.MM.YYYY").valueOf() -
      moment(b.date, "DD.MM.YYYY").valueOf()
  );
};
