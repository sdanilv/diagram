import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setCheckedEndpoints,
  fetchData,
  loadDataInRange,
  setCheckedServices,
  setDateType,
} from "../redux/reducer";
import Diagram from "./Diagram";
import Selector from "./Selector";
import style from "./Diagrams.module.css"

const Diagrams = (props) => {
  const { charData, fetchData } = props;
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Selector {...props} />

      <div className={style.diagrams}>
        <Diagram endpoints={charData} title={`Прибыль`} x="date" y="sum" />
        <Diagram
          endpoints={charData}
          title={`Количество продаж`}
          x="date"
          y="count"
        />
      </div>
    </>
  );
};

const mstp = (state) => ({
  charData: state.charData,
  services: state.services,
  checkedServices: state.checkedServices,
  checkedEndpoints: state.checkedEndpoints,
  dateType: state.dateType,
  endpoints: state.endpoints,
});
export default connect(mstp, {
  setCheckedServices,
  fetchData,
  loadDataInRange,
  setDateType,
  setCheckedEndpoints,
})(Diagrams);
