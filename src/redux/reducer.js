import {createSlice} from "@reduxjs/toolkit";
import {getDataInRange, getEndpoints, getServices, getServicesName,} from "../api";
import {MONTH, WEEK} from "../tools/constant";
import {formattedDate} from "../tools/FomatedDate";

const chartSlice = createSlice({
    name: "chart",
    initialState: {
        dateType: WEEK,
        services: [],
        endpoints: [],
        fetchedData: [],
        checkedServices: [],
        checkedEndpoints: [],
        endpointsData: [],
        charData: [],
    },
    reducers: {
        checkedEndpointsAC(state, {payload}) {
            state.checkedEndpoints = payload;
        },
        setCheckedServicesAC(state, {payload}) {
            state.checkedServices = payload;
        },
        setDateType(state, {payload}) {
            state.dateType = payload;
        },
        setServicesName(state, {payload}) {
            state.services = payload;
            state.checkedServices = payload;
        },
        setEndpoints(state, {payload}) {
            const endpoints = payload.map((endpoints) => endpoints.name);
            state.endpoints = endpoints;
            state.endpointsData = payload;
            state.checkedEndpoints = endpoints;
        },
        changeFetchedData(state, {payload}) {
            state.fetchedData = payload.fetchedData;
        },
        loadChartData(state, {payload}) {
            let charData = [];
            payload.forEach((item) => {
                charData = charData.concat(
                    item.endpoints.map((imp) => ({
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

const {actions, reducer} = chartSlice;
export const {
    setEndpoints,
    changeFetchedData,
    setServicesName,
    loadChartData,
    setDateType,
    setCheckedServicesAC,
    checkedEndpointsAC,
} = actions;
export default reducer;

export const fetchServiceName = () => async (dispatch) => {
    const services = await getServicesName();
    dispatch(setServicesName(services));
};

export const fetchData = () => async (dispatch, getState) => {
    await dispatch(fetchServiceName());
    const {dateType, services} = getState();
    let fetchedData = [];
    if (services.length === 0) return;
    if (services.length === 1) {
        fetchedData = await getEndpoints(dateType, services[0]);
    } else fetchedData = await getServices(dateType);
    dispatch(changeFetchedData({fetchedData}));
    dispatch(loadChartData(fetchedData));
};

export const setCheckedServices = (checked) => async (dispatch, getState) => {
    const {dateType, fetchedData} = getState();
    let data;
    if (checked.length === 1) {
        data = await getEndpoints(dateType, checked[0]);
        dispatch(setEndpoints(data));
    } else data = fetchedData.filter((service) => checked.includes(service.name));
    dispatch(setCheckedServicesAC(checked));
    dispatch(loadChartData(data));
};
export const setCheckedEndpoints = (checked) => (dispatch, getState) => {
    const {endpointsData} = getState();
    let data = endpointsData.filter((endpoint) => checked.includes(endpoint.name));
    dispatch(checkedEndpointsAC(checked));
    dispatch(loadChartData(data));
};
export const loadDataInRange = (from, to) => async (dispatch) => {
    let endpoints = await getDataInRange(from, to);
    dispatch(setDateType(MONTH));
    dispatch(changeFetchedData(endpoints));
};
