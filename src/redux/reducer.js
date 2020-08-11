import { createSlice } from "@reduxjs/toolkit";
import {
  fetchImpulsesInRange,
  getImpulses,
  getServices,
  getServicesName,
} from "../api";
import { MONTH, WEEK, YEAR } from "../tools/constant";
import { formattedDate } from "../tools/FomatedDate";

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    dateType: YEAR,
    services: [],
    fetchedData: [],
    checked: [],
    charData: [],
  },

  reducers: {
    setCheckedAC(state, { payload }) {
      state.checked = payload;
    },
    setDateType(state, { payload }) {
      state.dateType = payload;
    },
    setServicesName(state, { payload }) {
      state.services = payload;
      state.checked = payload;
    },
    changeFetchedData(state, { payload }) {
      state.fetchedData = payload.fetchedData;
    },
    loadChartDate(state, { payload }) {
      let charData = [];
      payload.forEach((item) => {
        charData = charData.concat(
          item.impulses.map((imp) => ({
            name: item.name,
            sum: +imp.sum,
            count: +imp.count,
            date: formattedDate(state.dateType, imp.date),
          }))
        );
      });
      state.charData = charData;
    },
  },
});

const { actions, reducer } = chartSlice;
export const {
  changeFetchedData,
  setServicesName,
  loadChartDate,
  setDateType,
  setCheckedAC,
} = actions;
export default reducer;

export const fetchServiceName = () => async (dispatch) => {
  const services = await getServicesName();
  dispatch(setServicesName(services));
};

export const fetchData = () => async (dispatch, getState) => {
  const { dateType } = getState();
  await dispatch(fetchServiceName());
  let fetchedData = [];
  if (getState().services === 0) return;
  if (getState().services === 1) fetchedData = await getImpulses(dateType);
  else fetchedData = await getServices(dateType);
  dispatch(changeFetchedData({ fetchedData }));
  dispatch(loadChartDate(fetchedData));
};

export const setChecked = (checked) => async (dispatch, getState) => {
  dispatch(setCheckedAC(checked));
  const { fetchedData } = getState();
  const filterData = fetchedData.filter((data) => checked.includes(data.name));
  dispatch(loadChartDate(filterData));
};

export const loadImpulsesInRange = (from, to) => async (dispatch) => {
  let impulses = await fetchImpulsesInRange(from, to);
  impulses = impulses.map((imp) => ({
    ...imp,
    sum: +imp.sum,
    count: +imp.count,
    date: formattedDate(MONTH, imp.date),
  }));

  dispatch(changeFetchedData(impulses));
};
