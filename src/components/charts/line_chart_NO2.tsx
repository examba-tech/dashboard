import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import dayjs from "dayjs";
import { NoSsr } from "@mui/material";


interface MyLineChartProps {
  mergedNos: any[];
  selectedMunicipi: string;
  beginDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  selectedSecondMunicipi: string;
}

const MyLineChart: React.FC<MyLineChartProps> = ({ mergedNos, selectedMunicipi, selectedSecondMunicipi, beginDate, endDate }) => {
  
  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

  const formattedBeginDate = beginDate.format('DD-MM-YYYY');
  const formattedEndDate = endDate.format('DD-MM-YYYY');

  return (
    <div className="relative col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-lg font-semibold text-black dark:text-white pt-3">
            {selectedMunicipi === "Tots"
               ? `Evolució del NO2 des del ${formattedBeginDate} al ${formattedEndDate}`
               : `Evolució del des del ${formattedBeginDate} al ${formattedEndDate} NO2 al municipi ${selectedMunicipi}`}
            <span
              className="text-sm text-gray-400 cursor-pointer"
              onClick={toggleInfo}
            >
              {" "}
              +info
            </span>
          </h5>
        </div>
      </div>
        <div className="mb-2">
    <ResponsiveContainer width={575} height={175}>
      <LineChart
        data={mergedNos}
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
              tick={{ fontSize: 10 }}
              tickFormatter={(tick) => dayjs(tick).format('DD/MM/YYYY')}
            />
        <YAxis tick={{ fontSize: 10 }}/>
        <Tooltip
              formatter={(value, name) => {
                let displayName = name;
                if (name === "data") displayName = "municipi 1";
                if (name === "data2") displayName = "municipi 2";
                return [
                  <span key="value" style={{ color: "black" }}>
                    {/* {"valor:"}{" "} */}
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      {value}
                    </span>
                  </span>,
                  displayName,
                ];
              }}
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              }
              contentStyle={{
                backgroundColor: "rgba(400, 400, 400, 1)",
                borderColor: "#ccc",
                padding: "10px",
                borderRadius: "8px",
                background:
                  "linear-gradient(to bottom, rgba(240,240,240,1) 50%, rgba(255,255,255,1) 50%)",
                fontSize: "12px",
                color: "linear-gradient(to bottom, black, black)",
              }}
              labelStyle={{ color: "black" }}
            />
        {/* rojo oscuro */}
        <Line type="monotone" dataKey="data" stroke="#B03A2E" name={selectedMunicipi}/>
        {/* rojo claro */}
        <Line type="monotone" dataKey="data2" stroke="#F5B7B1" name={selectedSecondMunicipi}/>

        <Legend verticalAlign="top" height={36} />

      </LineChart>
    </ResponsiveContainer>
    {infoVisible && (
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 w-80 h-25 rounded-lg shadow-lg"
                  onClick={toggleInfo}
                  style={{ marginLeft: "25px" }}
                >
                  <p className="text-sm text-gray-800 px-4 py-2 text-center">
                  Aquest gràfic de línies mostra l&apos;evolució del valor de NO2 pel rang de temps seleccionat. Està dissenyat per representar
                    dades temporals on l&apos;eix x mostra el període de temps, i l&apos;eix y representa el valor de NO2 pel municipi
                    seleccionat (o bé tots). Quan es selecciona el segon municipi permet la comparació entre ambdós.
                  </p>
                </div>
              )}
    </div>
    </div>
  );
};

export default MyLineChart;
