import React, { useEffect, useState } from "react";
import Piechart from "./components/Piechart";
import Barchart from "./components/Barchart";
import LineChart from "./components/LineChart";
import ListOfData from "./components/ListOfData";
import axios from "axios";

function DashBoard() {
  const [content,setContent] = useState({
    topic:'loading...',
    country:'loading...',
    region:'loading...',
    sector:'loading...'
  });

  const fetchData = async()=>{
    try{
      const response1 = await axios.get(`http://localhost:5000/counter1`);
      const response2 = await axios.get(`http://localhost:5000/counter2`);
      const response3 = await axios.get(`http://localhost:5000/counter3`);
      const response4 = await axios.get(`http://localhost:5000/counter4`);
      setContent({
        topic:response1.data.total,
        country:response2.data.total,
        region:response3.data.total,
        sector:response4.data.total
      })
    }
    catch(err)
    {
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div>
      <section className="flex justify-center text-center flex-col gap-2 bg-slate-900 text-white p-4">
        <p className="text-2xl">DashBoard</p>
        <p className="text-xl">Data Visulization</p>
      </section>
      <section className="lg:mt-8">
        <div className="sm:flex gap-2 mt-4 grid mx-4 md:justify-around md:gap">
          <section className="flex flex-col text-center rounded-md bg-indigo-400 font-medium text-xl p-4 w-full md:w-[38%] cursor-pointer hover:bg-indigo-500">
            <p>{content.topic}</p>
            <p>Total Topics</p>
          </section>
          <section className="flex flex-col text-center rounded-md bg-cyan-600 text-white font-medium text-xl p-4 w-full md:w-[38%] cursor-pointer hover:bg-cyan-700">
            <p>{content.country}</p>
            <p>Total Country</p>
          </section>
        </div>
        <div className="sm:flex gap-2 mt-4 grid mx-4 md:justify-around">
          <section className="flex flex-col text-center text-white rounded-md bg-slate-700 font-medium text-xl p-4 w-full md:w-[38%] cursor-pointer hover:bg-slate-800">
            <p>{content.region}</p>
            <p>Total Region</p>
          </section>
          <section className="flex flex-col text-center rounded-md bg-red-500 text-white font-medium text-xl p-4 w-full md:w-[38%] cursor-pointer hover:bg-red-600 ">
            <p>{content.sector}</p>
            <p>Total Sector</p>
          </section>
        </div>
      </section>
      <section className="lg:flex lg:mx-[100px] lg:gap-16 mt-16">
        <div className="mt-8 mx-4">
          <Piechart />
        </div>
        <div className="mt-8 mx-4">
          <ListOfData />
        </div>
      </section>
      <section className="lg:flex lg:mx-[100px] lg:gap-16 mt-16 lg:mt-28">
        <div className="mt-8 mx-4">
          <LineChart />
        </div>
        <div className="mt-8 mx-4">
          <Barchart />
        </div>
      </section>
      <section className="mt-16">
          <footer className="bg-gray-800 text-white px-4 text-center py-8">
            <p>Data Visualization Footer</p>
            <p>©2024 Dashboard</p>
          </footer>
      </section>
    </div>
  );
}

export default DashBoard;
