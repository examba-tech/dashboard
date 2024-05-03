import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const Waterfall = ({ data, average }: { data: any; average: number }) => {
  const monthNames = [
    "Gener", "Febrer", "Març", "Abril", "Maig", "Juny",
    "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"
  ];

  const adjustValue = (value: number) => {
    return value - average;
  };

  const getFillColor = (entry: any) => {
    return entry.last_year > 0 ? "#3056D3" : "#80CAEE";
  };

  const adjustedData = data.map((entry: any) => ({
    ...entry,
    last_year: adjustValue(entry.last_year),
  }));

  const chartData = adjustedData.map((entry: any, index: number) => ({
    ...entry,
    name: monthNames[index],
    fill: getFillColor(entry),
  }));

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => value + average} />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="last_year" fill="fill" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Waterfall;