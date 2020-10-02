import {} from "@antv/g2plot"; //dont delete
import Chart from "@antv/g2/esm/chart/chart";

export const renderChart = (data, container, x, y) => {
  const chart = new Chart({
    autoFit: true,
    container: container,
  });
  chart.data(data);
  chart.scale(y, {
    nice: true,
  });
  chart.tooltip({
    inPlot: true,
    shared: true,
    showMarkers: false,
  });

  chart
    .interval()
    .position(`${x}*${y}`)
    .adjust("stack")
    .color("name", ["#315cff", "#1890ff"]);

  chart.interaction("active-region");
  chart.interaction("brush");
  chart.render();
  return chart;
};
