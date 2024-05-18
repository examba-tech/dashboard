import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const Waterfall = ({ data, average, selectedMunicipi }: { data: any; average: number; selectedMunicipi: string }) => {
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

  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-2 border border-gray-200 rounded shadow-lg">
          <p className="label text-gray-800">
            {`${label}: `}
            <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow relative">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white pl-5 pt-3">
          {selectedMunicipi === "Tots"
              ? "Comparativa de visites en els mesos de 2023 a tots els municipis"
              : `Comparativa de visites en els mesos de 2023 al municipi ${selectedMunicipi}`}
            <span
              className="text-sm text-gray-400 cursor-pointer"
              onClick={toggleInfo}
            >
              {" "}
              +info
            </span>
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
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={average} stroke="#000" />
              <Bar dataKey="last_year" fill="fill" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {infoVisible && (
            <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 w-64 h-54 rounded-lg shadow-lg"
            onClick={toggleInfo}
            style={{ marginLeft: "25px" }}
            >
              <p className="text-sm text-gray-800 px-4 py-2 text-center">
              El gràfic compara el nombre de casos registrats els mesos de 2023, representats per barres verticals. Cada barra correspon a un mes específic, amb l&apos;eix horitzontal mostrant els noms dels mesos. L&apos;alçada de cada barra reflecteix la quantitat de casos registrats per a aquest mes en particular. A més, s&apos;hi ha inclòs una línia de referència horitzontal que indica la mitjana de casos durant aquest període.
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Waterfall;