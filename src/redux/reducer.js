import { createSlice } from "@reduxjs/toolkit";
import { fetchImpulsesForType, fetchImpulsesInRange } from "../api";
import { MONTH } from "../tools/constant";
import { formattedDate } from "../tools/FomatedDate";

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    impulses: [],
  },
  reducers: {
    loadImpulses(state, { payload }) {
      state.impulses = payload;
    },
  },
});

const { actions, reducer } = chartSlice;
const { loadImpulses } = actions;
export default reducer;

export const fetchImpulses = (type = MONTH) => async (dispatch) => {
  let impulses = await fetchImpulsesForType(type);
  impulses = impulses.map((imp) => ({
    ...imp,
    sum: +imp.sum,
    count: +imp.count,
    date: formattedDate(type, imp.date),
  }));
  dispatch(loadImpulses(impulses));
};

export const loadImpulsesInRange = (from, to) => async (dispatch) => {
  let impulses = await fetchImpulsesInRange(from, to);
  impulses = impulses.map((imp) => ({
    ...imp,
    sum: +imp.sum,
    count: +imp.count,
    date: formattedDate(MONTH, imp.date),
  }));

  dispatch(loadImpulses(impulses));
};
