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
//ant data

const data2 = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];

function App() {
//ant data
  const ref = React.useRef(null);




  const [data, setData] = useState([]);
  let linePlot = null ;
  useEffect(() => {
    //ant start
    if (!linePlot) {
      const chart = new Chart({
        container: 'container',
        autoFit: true,
        height: 500,
      });

      chart.data(data2);
      chart.scale('sales', {
        nice: true,
      });

      chart.tooltip({
        showMarkers: false
      });
      chart.interaction('active-region');

      chart.interval().position('year*sales');

      chart.render();
    }
    //ant end
    const uri =
      "https://application0.impulse.ottry.com/api/users/5f2bca5f2a6c6330227519fc/pageImpulseIdProjections?page=0&size=8&sort=id%2Cdesc&status=4";
    const uri2 = (id) =>
      `https://application0.impulse.ottry.com/api/impulses/search/findById?id=${id}`;

    const getData = async () => {
      const response = await axios.get(uri, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1ZjJiY2E1ZjJhNmM2MzMwMjI3NTE5ZmMiLCJpYXQiOjE1OTY3MTc4OTcsImV4cCI6MTYwMjI0NzQ5N30.G6amFIw2pBWGyn3DXd-sX8voSgg93ogjdfVVEwltvKJfliDn5GsL77z3A5o85jMRsD55RqFtVrjMhHrnZ11MKA",
        },
      });

      const data = [];
      for (const content of response.data.content) {
        const product = await axios.get(uri2(content.id), {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1ZjJiY2E1ZjJhNmM2MzMwMjI3NTE5ZmMiLCJpYXQiOjE1OTY3MTc4OTcsImV4cCI6MTYwMjI0NzQ5N30.G6amFIw2pBWGyn3DXd-sX8voSgg93ogjdfVVEwltvKJfliDn5GsL77z3A5o85jMRsD55RqFtVrjMhHrnZ11MKA",
          },
        });
        data.push(product.data);
      }
      setData(data.map(prod => ({...prod,amount:+prod.amount+0.1,  modified:`${new Date(prod.modified).getHours()} : ${new Date(prod.modified).getMinutes()}`})));
    };
    getData();
  }, []);

  const dataWithCount = {};
  data.forEach(
    (product) =>{
      // const date = `${new Date(product.modified).getHours()} : ${new Date(product.modified).getMinutes()}`
      const date = product.modified
      dataWithCount[date] = dataWithCount[date]
        ? dataWithCount[date] + 1
        : 1}
  );
  const dateAndCount = []
  for(const key in dataWithCount){
    dateAndCount.push({date:key, count:dataWithCount[key]})
  }


  return (
    <div className="App">

      <div id="container"></div>

        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="modified" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      <BarChart
          width={500}
          height={300}
          data={dateAndCount}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default App;
