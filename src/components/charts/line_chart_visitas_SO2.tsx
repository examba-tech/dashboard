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

// Define el tipo de datos para las visitas y NO2
interface DataPoint {
  name: string;
  data: number;
}

interface CombinedDataPoint {
  name: string;
  data: number;
  sos: number;
}

// Define el tipo de props para el componente MyLineChart
interface MyLineChartProps {
  mergedVisits: DataPoint[];
  mergedSos: DataPoint[];
  selectedMunicipi: string;
}

// Función para combinar los datos de mergedVisits y mergedNos en un solo array
const combineData = (visits: DataPoint[], sos: DataPoint[]): CombinedDataPoint[] => {
  return visits.map((visit, index) => ({
    name: visit.name,
    data: visit.data,
    sos: sos[index]?.data ?? 0,
  }));
};

const MyLineChart_vis_SO2: React.FC<MyLineChartProps> = ({ mergedVisits, mergedSos, selectedMunicipi }) => {
  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

  // Combina los datos
  const combinedData = combineData(mergedVisits, mergedSos);

  return (
    <div className="relative col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white pt-3">
            {selectedMunicipi === "Tots"
               ? "Evolució del número de visites i SO2 a l'any 2023 a tots els municipis"
               : `Evolució del número de visites i SO2 a l'any 2023 al municipi ${selectedMunicipi}`}
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
            data={combinedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }} 
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            {/* <YAxis tick={{ fontSize: 10 }} /> */}
            <YAxis yAxisId="left" tick={{ fontSize: 10 }} stroke="#2471A3"/>
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} stroke="#B03A2E"/>
            <Tooltip
              formatter={(value, name) => {
                let displayName = name;
                if (name === "data") displayName = "Visites";
                if (name === "sos") displayName = "SO2";
                return [
                  <span key="value" style={{ color: "black" }}>
                    {displayName}:{" "}
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      {value}
                    </span>
                  </span>,
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
                backgroundColor: "rgba(240, 240, 240, 1)",
                borderColor: "#ccc",
                padding: "10px",
                borderRadius: "8px",
                background: "linear-gradient(to bottom, rgba(240,240,240,1) 50%, rgba(255,255,255,1) 50%)",
                fontSize: "12px",
                color: "black",
              }}
              labelStyle={{ color: "black" }}
            />
            {/* <Line type="monotone" dataKey="data" stroke="#80CAEE" />
            <Line type="monotone" dataKey="nos" stroke="#B22222" /> */}
            <Line yAxisId="left" type="monotone" dataKey="data" stroke="#2471A3" name={selectedMunicipi}/>
            <Line yAxisId="right" type="monotone" dataKey="sos" stroke="#B03A2E" name="SO2"/>

            <Legend verticalAlign="top" height={36} />
          </LineChart>
        </ResponsiveContainer>
        {infoVisible && (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-4 w-64 h-54 rounded-lg shadow-lg"
            onClick={toggleInfo}
          >
            <p className="text-sm text-gray-800">
              Aquest gràfic de línies mostra l&apos;evolució del nombre de
              visites i el nivell de SO2 l&apos;any 2023. Està dissenyat per representar
              dades temporals on l&apos;eix x mostra els noms dels
              períodes de temps (en aquest cas, les diferents setmanes de
              l&apos;any), i l&apos;eix y representa la quantitat de
              visites i el nivell de SO2. A més, està filtrat segons el municipi
              seleccionat (o tots). L&apos;eix esquerra és respecte al nombre de visites
              i l&apos;eix dret respecte al nivell de SO2, per tal de poder observar i comparar més 
              clarament l&apos;evolució d&apos;ambdues línies.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLineChart_vis_SO2;
