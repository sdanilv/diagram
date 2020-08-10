import { createSlice } from "@reduxjs/toolkit";
import { fetchImpulsesForType, fetchImpulsesInRange } from "../api";
import { MONTH, WEEK } from "../tools/constant";
import { formattedDate } from "../tools/FomatedDate";

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    services: [],
    checked: [],
    totalCount: 0,
    totalSum: 0,
    charData:[]
  },
  reducers: {
    loadImpulses(state, { payload }) {
      state.services = payload;
    },
    chartDate(state, { payload }){
      state.totalCount = payload.totalCount;
      state.totalSum = payload.totalSum;
      state.charData = payload.data
    }
  },
});

const { actions, reducer } = chartSlice;
const { loadImpulses } = actions;
export default reducer;

export const fetchImpulses = (type = WEEK) => async (dispatch) => {
  let impulses = await fetchImpulsesForType(type);
  impulses = impulses.map((imp) => ({
    ...imp,
    sum: +imp.sum,
    count: +imp.count,
    date: formattedDate(type, imp.date),
  }));

  const [totalCount, totalSum] = impulses.reduce(
    (accum, imp) => [accum[0] + imp.count, accum[1] + imp.sum],
    [0, 0]
  );
  console.log(totalCount);
  dispatch(loadImpulses({ impulses, totalCount, totalSum }));
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
