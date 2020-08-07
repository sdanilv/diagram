import Chart from "@antv/g2/esm/chart/chart";
export const renderChart = (data, container, x, y)=> {
    const chart = new Chart({
        container: container,
        height: 300,
        width: 500
    });
    chart.data(data);
    chart.scale(y, {
        nice: true,
    });
    chart.interaction('active-region');
    chart.interval().position(`${x}*${y}`);
    chart.render();
};