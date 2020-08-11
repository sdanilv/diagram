import {} from "@antv/g2plot"; //dont delete
import Chart from "@antv/g2/esm/chart/chart";

export const renderChart = (data, container, x, y) => {
  const chart = new Chart({
    container: container,
    height: 300,
    width: 500,
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
  // chart.legend(false)
  chart
    .interval()
    .position(`${x}*${y}`)
    .adjust("stack")
    .color("name", ["#315cff", "#1890ff"])
  // .label(y)

  // chart.interaction("brush");
  // chart.interaction('legend-visible-filter');
  chart.interaction("active-region");
  chart.render();
  return chart;
};
