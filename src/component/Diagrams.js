import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setCheckedImpulses,
  fetchData,
  loadDataInRange,
  setCheckedServices,
  setDateType,
} from "../redux/reducer";
import Diagram from "./Diagram";
import Selector from "./Selector";

const Diagrams = (props) => {
  const { charData, fetchData } = props;
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Selector {...props} />

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Diagram impulses={charData} title={`Прибыль`} x="date" y="sum" />
        <Diagram
          impulses={charData}
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
  checkedImpulses: state.checkedImpulses,
  dateType: state.dateType,
  impulses: state.impulses,
});
export default connect(mstp, {
  setCheckedServices,
  fetchData,
  loadDataInRange,
  setDateType,
  setCheckedImpulses,
})(Diagrams);
