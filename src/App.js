import Chart from '@antv/g2/esm/chart/chart';
import {Line} from '@antv/g2plot';
import axios from "axios";
import ReactDOM from 'react-dom';
import React, { createContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "./App.css";
import {fetchDiagramDate, getEndpoints, getImpulse} from "./api";
import {getHoursAndMinutes} from "./tools";
import {renderChart} from "./RenderChart";

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const getData = async () => {
     // const endpoints = await getEndpoints();
     //  const impulses = [];
     //  for (const endpoint of endpoints) {
     //   const impulse = await getImpulse(endpoint.id) ;
     //    impulses.push({amount: +impulse.amount, modified:getHoursAndMinutes(impulse.modified)});
     //  }
     //
     //  renderChart(impulses, "container", "modified", "amount");
     //
     //  const dataWithCount = {};
     //  impulses.forEach(
     //      (product) =>{
     //        const date = product.modified;
     //        dataWithCount[date] = dataWithCount[date]
     //            ? dataWithCount[date] + 1
     //            : 1}
     //  );
     //  const dateAndCount = [];
     //  for(const key in dataWithCount){
     //    dateAndCount.push({date:key, count:dataWithCount[key]})
     //  }
        // renderChart(dateAndCount, "container2", "date", "count");c

        const data = await fetchDiagramDate();

        renderChart(data, "container", "date", "sum");
        renderChart(data, "container2", "date", "count");
    };
    getData();
  }, []);

  return (
    <div className="App">
      <div id="container"> </div>
      <div id="container2"> </div>
    </div>
  );
}

export default App;
