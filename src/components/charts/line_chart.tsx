/*"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";


// Definir una interfaz para la estructura de los datos de visits
interface VisitData {
  name: string;
  data: number[];
}

// Proporcionar un tipo explícito para visits
interface MyLineChartProps {
  visits: VisitData[];
}

const MyLineChart: React.FC<MyLineChartProps> = ({ visits }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white pl-5 pt-3">
            Franja d&apos;Edat
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <select
              name="#"
              id="#"
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value="" className="dark:bg-boxdark">
                This Week
              </option>
              <option value="" className="dark:bg-boxdark">
                Last Week
              </option>
            </select>
            <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                  fill="#637381"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                  fill="#637381"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={visits}
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
              formatter={(value, name) => (
                <span style={{ color: "black" }}>
                  {"count:"}{" "}
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    {value}
                  </span>
                </span>
              )}
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
            <Line
              type="monotone"
              dataKey="last_year"
              stroke="#80CAEE"
              dot={false}
            />
            <Brush />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MyLineChart;
*/

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
  visits: VisitData[];
  secondVisits: VisitData[];
  selectedMunicipi: string;
}

const MyLineChart: React.FC<MyLineChartProps> = ({ visits, secondVisits, selectedMunicipi }) => {
  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

  const mergedVisits = visits.map((visit, index) => {
    return {
      ...visit,
      data2: secondVisits[index].data,
    };
  });

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white pl-5 pt-3">
            Evolució del número de visites a l&apos;any 2023 al municipi {selectedMunicipi}
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
                formatter={(value, name) => (
                  <span style={{ color: "black" }}>
                    {"count:"}{" "}
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      {value}
                    </span>
                  </span>
                )}
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
              {infoVisible && (
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 w-64 h-54 rounded-lg shadow-lg"
                  onClick={toggleInfo}
                  style={{ marginLeft: "25px" }}
                >
                  <p className="text-sm text-gray-800 px-4 py-2 text-center">
                    Aquest gràfic de línies mostra l&apos;evolució del nombre de
                    visites l&apos;any 2023. Està dissenyat per representar
                    dades temporals on l&apos;eix x mostra els noms dels
                    períodes de temps (en aquest cas, les diferents setmanes de
                    l&apos;any), i l&apos;eix y representa la quantitat de
                    visites. A més que estarà filtrat segons el municipi
                    seleccionat (o tots).
                  </p>
                </div>
              )}
              <Line type="monotone" dataKey="data" stroke="#80CAEE" />
              <Line type="monotone" dataKey="data2" stroke="#B22222" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MyLineChart;
