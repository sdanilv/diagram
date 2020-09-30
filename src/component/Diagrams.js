import React, { useEffect, useState } from "react";
import { getReducers } from "../redux/reducers";
import { MONTH } from "../tools/constant";
import Diagram from "./Diagram";
import style from "./Diagrams.module.css";
import Selector from "./Selector";
import {  Spin } from "antd";

const Diagrams = () => {
  const [state, setState] = useState({
    dateType: MONTH,
    services: [],
    endpoints: [],
    fetchedData: [],
    checkedServices: [],
    checkedEndpoints: [],
    endpointsData: [],
    charData: [],
    loading: true,
  });
  const reducers = getReducers(state, setState);

  useEffect(() => {
    reducers.fetchData(state.dateType);
  }, []);
  return (
    <>
      <Selector {...state} {...reducers} />
      {state.loading ? (
          <Spin size="large" />
      ) : (
        <div className={style.diagrams}>
          <Diagram
            endpoints={state.charData}
            title={`Прибыль`}
            x="date"
            y="sum"
          />
          <Diagram
            endpoints={state.charData}
            title={`Количество продаж`}
            x="date"
            y="count"
          />
        </div>
      )}
    </>
  );
};

export default Diagrams;
