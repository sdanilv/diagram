import React, { useEffect, useMemo, useRef } from "react";
import { renderChart } from "../tools/RenderChart";
import style from "./Diagram.module.css";

const Diagram = ({ endpoints, title, x, y }) => {
  let chartCount = useRef(null);
  const container = useRef(null);
  const total = useMemo(() => endpoints.reduce((acc, imp) => acc + imp[y], 0), [
    endpoints,
    y,
  ]);
  useEffect(() => {
    if (endpoints.length) {
      if (chartCount.current) chartCount.current.destroy();
      chartCount.current = renderChart(endpoints, container.current, x, y);
    }
  }, [endpoints, x, y]);

  return (
    <div ref={container} className={style.diagram}>
      <div> {title}</div>
      <b>{` Всего: ${total}`}</b>
    </div>
  );
};

export default Diagram;
