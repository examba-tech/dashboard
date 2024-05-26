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
import dayjs from "dayjs";

const Waterfall = ({
  data,
  average,
  selectedMunicipi,
  selectedDiagnostic,
  beginDate,
  endDate
}: {
  data: any;
  average: number;
  selectedMunicipi: string;
  selectedDiagnostic: string;
  beginDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}) => {
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
    return parseFloat(value.toFixed(1));
  };

  const getFillColor = (entry: any) => {
    return entry.visites > average ? "#3056D3" : "#80CAEE";
  };

  const adjustedData = data.map((entry: any) => ({
    ...entry,
    visites: adjustValue(entry.visites),
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

  const formattedBeginDate = beginDate.format('DD-MM-YYYY');
  const formattedEndDate = endDate.format('DD-MM-YYYY');

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow relative">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-sm font-semibold text-black dark:text-white pl-5 pr-5 pt-3">
            {selectedDiagnostic === "Tots" && selectedMunicipi === "Tots"
              ? `Evolució del nombre de visites cada 10.000 habitants de tots els diagnòstics des del ${formattedBeginDate} al ${formattedEndDate}`
              : selectedDiagnostic === "Tots"
              ? `Evolució del nombre de visites cada 10.000 habitants de tots els diagnòstics des del ${formattedBeginDate} al ${formattedEndDate} al municipi ${selectedMunicipi}`
              : selectedMunicipi === "Tots"
              ? `Evolució del nombre de visites cada 10.000 habitants del diagnòstic ${selectedDiagnostic} des del ${formattedBeginDate} al ${formattedEndDate}`
              : `Evolució del nombre de visites cada 10.000 habitants del diagnòstic ${selectedDiagnostic} des del ${formattedBeginDate} al ${formattedEndDate} al municipi ${selectedMunicipi}`}
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
              <XAxis
                dataKey="name"
                tick={{ fontSize: 13 }}
                angle={-90}
                textAnchor="end"
                dx={-5}
              />
              <YAxis tickFormatter={(value) => value} domain={[0, 700]}/>
              <Tooltip/>
              <ReferenceLine y={average} stroke="#000" />
              <Bar dataKey="visites" fill="fill" />
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
              El gràfic mostra el nombre de visites cada 10.000 habitants durant el rang de temps seleccionat. Cada barra correspon a un mes
              específic, amb l&apos;eix horitzontal mostrant els noms dels
              mesos. L&apos;alçada de cada barra reflecteix el nombre de visites per a aquest mes en particular. A més, s&apos;inclou una línea horitzontal que representa la mitjana; si la barra està pintada de blau fosc, indica que les visites estan per sobre de la mitjana, i en blau clar si estan per sota.

            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Waterfall;