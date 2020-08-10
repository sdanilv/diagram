import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchImpulses, loadImpulsesInRange } from "../redux/reducer";
import Diagram from "./Diagram";
import Selector from "./Selector";

const Diagrams = ({
  impulses,
  fetchImpulses,
  fetchImpulsesInRange,
  totalCount,
  totalSum,
}) => {
  useEffect(() => {
    fetchImpulses();
  }, [fetchImpulses]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Selector
          fetchImpulses={fetchImpulses}
          fetchImpulsesInRange={fetchImpulsesInRange}
        />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Diagram
          impulses={impulses}
          total={totalSum}
          title={`Прибыль`}
          x="date"
          y="sum"
        />
        <Diagram
          impulses={impulses}
          title={`Количество продаж`}
          total={totalCount}
          x="date"
          y="count"
        />
      </div>
    </>
  );
};

const mstp = (state) => ({
  impulses: state.impulses,
  totalCount: state.totalCount,
  totalSum: state.totalSum,
});
export default connect(mstp, {
  fetchImpulses,
  fetchImpulsesInRange: loadImpulsesInRange,
})(Diagrams);
