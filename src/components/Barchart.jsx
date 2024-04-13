import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const Barchart = () => {
  const [DataDb, setDataDb] = useState();
  const [year,setYear] = useState('start_Year');
  const chartRef = useRef();

  const handleYearChange = (e)=>{
    setYear(e.target.value)
    console.log(e.target.value)
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/${year}`);
      setDataDb(response.data);
      createBarChart(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createBarChart = (data) => {
    console.log(data);
    let _years = data.map((entry) => entry._id);
    let intensities = data.map((entry) => entry.avgItensity);
    let likelihood = data.map((entry) => entry.avgLikelyhood);
    let relevances = data.map((entry) => entry.avgRelevence);
  
    if (chartRef.current && chartRef.current.data) {
      chartRef.current.data.labels = _years;
      chartRef.current.data.datasets[0].data = intensities;
      chartRef.current.data.datasets[1].data = relevances;
      chartRef.current.data.datasets[2].data = likelihood;
      chartRef.current.update();
    } else {
      let ctx = chartRef.current.getContext("2d");
      let myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: _years,
          datasets: [
            {
              label: "Intencities",
              data: intensities,
              backgroundColor:'orange'
            },
            {
              label: "Relevence",
              data: relevances,
              backgroundColor:'red'
            },
            {
              label: "Likelihood",
              data: likelihood,
              backgroundColor:'blue'
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
  }, [year]);

  return (
    <div className="">
     <p className="text-gray-700 font-base font-serif text-[15px] text-center font-mediun text-lg">{year} vs Intencities, Relevence, Likelihood</p>
       
      <select className="flex mb-8 border border-gray-600 p-1 rounded-b-md  w-full px-4 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={year} onChange={handleYearChange}>
        <option value="start_Year">start Year</option>
        <option value="end_Year">End Year</option>
      </select>
      <div className="w-[325px] sm:w-[600px] ">
       <canvas ref={chartRef} className="" />
      </div>
    </div>
  );
};

export default Barchart;
