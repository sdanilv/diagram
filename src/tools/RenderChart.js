import {} from "@antv/g2plot"; //dont delete
import Chart from "@antv/g2/esm/chart/chart";

export const renderChart = (data, container, x, y) => {
  const chart = new Chart({
    autoFit: true,
    container: container,
    renderer:"svg"
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
    .color("name", "#1c3cff-#81ebff");

  chart.interaction("active-region");
  chart.forceFit ();
  chart.render();
  return chart;
};
