"use client";
import React, { useEffect, useState } from "react";
import MyLineChart from "@/src/components/charts/line_chart";

const generateRandomData = () => {
  const data = [];
  const startDate = new Date(2022, 0, 1); // January 1st, 2022
  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    data.push({
      date: currentDate.toLocaleDateString(),
      visits: Math.floor(Math.random() * 100), // Random visits for demonstration
    });
  }
  return data;
};

const Page = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const data = generateRandomData();
    setChartData(data);
  }, []);

  return (
    <>
      <div>
        <MyLineChart data={chartData} />
      </div>
    </>
  );
};

export default Page;
