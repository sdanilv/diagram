import React, { useEffect, useState } from "react";
import { getReducers } from "../redux/reducers";
import { WEEK } from "../tools/constant";
import Diagram from "./Diagram";
import style from "./Diagrams.module.css";
import Selector from "./Selector";

const Diagrams = () => {
  const [state, setState] = useState({
    dateType: WEEK,
    services: [],
    endpoints: [],
    fetchedData: [],
    checkedServices: [],
    checkedEndpoints: [],
    endpointsData: [],
    charData: [],
  });
  const reducers = getReducers(state, setState);

  useEffect(() => {
    reducers.fetchServiceName(state.dateType);
    reducers.fetchData(state.dateType);
  }, []);
  return (
    <>
      <Selector {...state} {...reducers} />

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
    </>
  );
};

export default Diagrams;
