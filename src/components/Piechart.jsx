import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const Piechart = () => {
  const [DataDb, setDataDb] = useState();
  const [gvalue, setGvalue] = useState("region");
  const chartRef = useRef();

  const handleValueChange = (e) => {
    setGvalue(e.target.value);
    console.log(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/`, {
        val: gvalue,
      });
      setDataDb(response.data);
      createBarChart(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createBarChart = (data) => {
    console.log(data);
    let _values = data.map((entry) => entry._id);
    let counts = data.map((entry) => entry.count);

    if (chartRef.current && chartRef.current.data) {
      chartRef.current.data.labels = _values;
      chartRef.current.data.datasets[0].data = counts;
      chartRef.current.update();
    } else {
      let ctx = chartRef.current.getContext("2d");
      let myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: _values,
          datasets: [
            {
              // label: "",
              data: counts,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      chartRef.current = myChart;
    }
  };

  useEffect(() => {
    fetchData();
  }, [gvalue]);

  return (
    <div>
      <p className="text-gray-700 font-base font-serif text-[15px] text-center font-mediun text-lg capitalize">
        Count of {gvalue}
      </p>
      <select
        className="flex mb-6 border border-gray-600 p-1 rounded-b-md  w-full px-4 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        value={gvalue}
        onChange={handleValueChange}
      >
        <option value="region">Region</option>
        <option value="topic">Topic</option>
        <option value="country">Country</option>
        <option value="source">Source</option>
        <option value="pestle">Pestle</option>
        <option value="sector">Sector</option>
      </select>
      <div className="w-[325px] sm:w-[600px]">
        <canvas ref={chartRef} className="" />
      </div>
    </div>
  );
};

export default Piechart;
