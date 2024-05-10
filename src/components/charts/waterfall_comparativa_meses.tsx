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
    "Gen",
    "Feb",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Oct",
    "Nov",
    "Des",
  ];

  const adjustValue = (value: number) => {
    return value;
  };

  const getFillColor = (entry: any) => {
    return entry.last_year > average ? "#3056D3" : "#80CAEE";
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
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white pl-5 pt-3">
            Comparativa de casos en els mesos de 2023
          </h4>
        </div>
      </div>

      <div>
        <div>
          <ResponsiveContainer width={500} height={590}>
            <BarChart
              width={500}
              height={500}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 13 }} angle={-90} textAnchor="end" dx={-5}/>
              <YAxis tickFormatter={(value) => value} />
              <Tooltip />
              
              <ReferenceLine y={average} stroke="#000" />
              <Bar dataKey="last_year" fill="fill" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Waterfall;
