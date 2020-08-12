import React, { useEffect, useMemo, useRef } from "react";
import { renderChart } from "../tools/RenderChart";

const Diagram = ({ impulses, title, x, y }) => {
  let chartCount = useRef(null);
  const container = useRef(null);
  const total = useMemo(() => impulses.reduce((acc, imp) => acc + imp[y], 0), [
    impulses,
    y,
  ]);
  useEffect(() => {
    if (impulses.length) {
      if (chartCount.current) chartCount.current.destroy();
      chartCount.current = renderChart(impulses, container.current, x, y);
    }
  }, [impulses, x, y]);

  return (
    <div ref={container} style={{ margin: 10, border: "4px double black" }}>
      <div> {title}</div>
      <b>{` Всего: ${total}`}</b>
    </div>
  );
};

export default Diagram;
