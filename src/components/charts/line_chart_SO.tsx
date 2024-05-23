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
  mergedSos: any[];
  selectedMunicipi: string;
}

const MyLineChart: React.FC<MyLineChartProps> = ({ mergedSos, selectedMunicipi }) => {
  console.log(mergedSos)
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
               ? "Evolució del SO2 a tots els municipis"
               : `Evolució del SO2 al municipi ${selectedMunicipi}`}
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
        data={mergedSos}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 10 }}/>
        <YAxis tick={{ fontSize: 10 }}/>
        <Tooltip
              formatter={(value, name) => {
                let displayName = name;
                if (name === "data") displayName = "municipi 1";
                if (name === "data2") displayName = "municipi 2";
                return [
                  <span key="value" style={{ color: "black" }}>
                    {"valor:"}{" "}
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
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 w-80 h-25 rounded-lg shadow-lg"
                  onClick={toggleInfo}
                  style={{ marginLeft: "25px" }}
                >
                  <p className="text-sm text-gray-800 px-4 py-2 text-center">
                  Aquest gràfic mostra l&apos;evolució de SO2 al llarg d&apos;un temps concret. Sabem que aquest és un gas incolor i d&apos;olor forta i sufocant. En una atmósfera humida es transforma en àcid sulfúric i causa la deposició àcida. A partir de concentracions majors a 0.1 ppm es produeix una important reducció de la visibilitat. Pot provocar irritació i inflamació del sistema respiratori, afeccions i insuficiències pulmonars, alteració del metabolisme de les proteïnes i mal de cap.
                  </p>
                </div>
              )}
    </div>
    </div>
  );
};

export default MyLineChart;