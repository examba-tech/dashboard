import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define el tipo de datos para las visitas
interface VisitData {
  name: string;
  data: number[];
}

// Define el tipo de props para el componente MyLineChart
interface MyLineChartProps {
  mergedVisits: any[];
  selectedMunicipi: string;
}

const MyLineChart: React.FC<MyLineChartProps> = ({ mergedVisits, selectedMunicipi }) => {
  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

  return (
    <div className="relative col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white pt-3">
            {selectedMunicipi === "Tots"
               ? "Evolució del número de visites a l'any 2023 a tots els municipis"
               : `Evolució del número de visites a l'any 2023 al municipi ${selectedMunicipi}`}
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
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={mergedVisits}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                formatter={(value, name) => {
                  let displayName = name;
                  if (name === "data") displayName = "municipi 1";
                  if (name === "data2") displayName = "municipi 2";
                  return [
                    <span key="value" style={{ color: "black" }}>
                      {"visites:"}{" "}
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
              <Line type="monotone" dataKey="data" stroke="#80CAEE" />
              <Line type="monotone" dataKey="data2" stroke="#B22222" />
            </LineChart>
          </ResponsiveContainer>
          {infoVisible && (
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-4 w-64 h-54 rounded-lg shadow-lg"
              onClick={toggleInfo}
            >
              <p className="text-sm text-gray-800">
              Aquest gràfic de línies mostra l&apos;evolució del nombre de
                    visites l&apos;any 2023. Està dissenyat per representar
                    dades temporals on l&apos;eix x mostra els noms dels
                    períodes de temps (en aquest cas, les diferents setmanes de
                    l&apos;any), i l&apos;eix y representa la quantitat de
                    visites. A més que estarà filtrat segons el municipi
                    seleccionat (o tots).              </p>
            </div>
          )}
          </div>
        </div>
  );
};

export default MyLineChart;
