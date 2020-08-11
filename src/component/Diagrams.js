import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchData, loadImpulsesInRange, setChecked } from "../redux/reducer";
import Diagram from "./Diagram";
import Selector from "./Selector";

const Diagrams = ({
  charData,
  services,
  fetchData,
  fetchImpulsesInRange,
  setChecked,
  checked,
}) => {
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Selector
          checked={checked}
          setChecked={setChecked}
          services={services}
          fetchData={fetchData}
          fetchImpulsesInRange={fetchImpulsesInRange}
        />
      </div>
      {charData && charData !== 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Diagram impulses={charData} title={`Прибыль`} x="date" y="sum" />
          <Diagram
            impulses={charData}
            title={`Количество продаж`}
            x="date"
            y="count"
          />
        </div>
      )}
    </>
  );
};

const mstp = (state) => ({
  charData: state.charData,
  services: state.services,
  checked: state.checked,
});
export default connect(mstp, { setChecked, fetchData, loadImpulsesInRange })(
  Diagrams
);
