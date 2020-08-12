import {createSlice} from "@reduxjs/toolkit";
import {getDataInRange, getImpulses, getServices, getServicesName,} from "../api";
import {MONTH, WEEK} from "../tools/constant";
import {formattedDate} from "../tools/FomatedDate";

const chartSlice = createSlice({
    name: "chart",
    initialState: {
        dateType: WEEK,
        services: [],
        impulses: [],
        fetchedData: [],
        checkedServices: [],
        checkedImpulses: [],
        impulsesData: [],
        charData: [],
    },
    reducers: {
        checkedImpulsesAC(state, {payload}) {
            state.checkedImpulses = payload;
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
        setImpulses(state, {payload}) {
            const impulses = payload.map((impulses) => impulses.name);
            state.impulses = impulses;
            state.impulsesData = payload;
            state.checkedImpulses = impulses;
        },
        changeFetchedData(state, {payload}) {
            state.fetchedData = payload.fetchedData;
        },
        loadChartData(state, {payload}) {
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

const {actions, reducer} = chartSlice;
export const {
    setImpulses,
    changeFetchedData,
    setServicesName,
    loadChartData,
    setDateType,
    setCheckedServicesAC,
    checkedImpulsesAC,
} = actions;
export default reducer;

export const fetchServiceName = () => async (dispatch) => {
    const services = await getServicesName();
    dispatch(setServicesName(services));
};

export const fetchData = () => async (dispatch, getState) => {
    const {dateType} = getState();
    await dispatch(fetchServiceName());
    let fetchedData = [];
    if (getState().services.length === 0) return;
    if (getState().services.length === 1) {
        fetchedData = await getImpulses(dateType);
    } else fetchedData = await getServices(dateType);
    dispatch(changeFetchedData({fetchedData}));
    dispatch(loadChartData(fetchedData));
};

export const setCheckedServices = (checked) => async (dispatch, getState) => {
    const {dateType, fetchedData} = getState();
    let data;
    if (checked.length === 1) {
        data = await getImpulses(dateType, checked[0]);
        dispatch(setImpulses(data));
    } else data = fetchedData.filter((service) => checked.includes(service.name));
    dispatch(setCheckedServicesAC(checked));
    dispatch(loadChartData(data));
};
export const setCheckedImpulses = (checked) => (dispatch, getState) => {
    const {impulsesData} = getState();
    let data = impulsesData.filter((impulse) => checked.includes(impulse.name));
    dispatch(checkedImpulsesAC(checked));
    dispatch(loadChartData(data));
};
export const loadDataInRange = (from, to) => async (dispatch) => {
    let impulses = await getDataInRange(from, to);
    dispatch(setDateType(MONTH));
    dispatch(changeFetchedData(impulses));
};
