import React, { useEffect, useRef } from "react";
import { renderChart } from "../tools/RenderChart";

const Diagram = ({ impulses, title, x, y }) => {
  let chartCount = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    if (impulses.length) {
      if (chartCount.current) chartCount.current.destroy();
      chartCount.current = renderChart(impulses, container.current, x, y);
    }
  }, [impulses,x, y]);

  return (
    <div ref={container} style={{ margin: 10, border: "4px double black" }}>
      {title}
    </div>
  );
};

export default Diagram;
