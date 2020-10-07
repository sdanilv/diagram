import React, { useEffect, useState } from "react";
import { getReducers } from "../redux/reducers";
import { WEEK} from "../tools/constant";
import Diagram from "./Diagram";
import Selector from "./Selector";
import { Empty, Spin } from "antd";
import style from "./Diagrams.module.css";

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
    loading: false,
  });
  const reducers = getReducers(state, setState);

  useEffect(() => {
    reducers.fetchData(state.dateType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(state.loading)
     return <Spin size="large" />;

  return (
    <>
      <Selector {...state} {...reducers} />
      <div className={style.diagrams}>
        {state.charData.length ? (
          <>
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
          </>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default Diagrams;
