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
  // Nombres de los meses en catalán
  const monthNamesCatalan = [
    "Gener", "Febrer", "Març", "Abril", "Maig", "Juny",
    "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"
  ];

  // Función para ajustar el valor de cada barra en base a la media
  const adjustValue = (value: number) => {
    return value - average;
  };

  // Función para determinar el color de relleno de las barras
  const getFillColor = (entry: any) => {
    return entry.last_year > 0 ? "#3056D3" : "#80CAEE";
  };

  // Aplicamos la función de ajuste a los datos
  const adjustedData = data.map((entry: any) => ({
    ...entry,
    last_year: adjustValue(entry.last_year),
  }));

  // Convertimos los datos a un formato que espera Recharts
  const chartData = adjustedData.map((entry: any, index: number) => ({
    ...entry,
    name: monthNamesCatalan[index], // Usamos el nombre del mes en catalán
    fill: getFillColor(entry), // Asignamos el color de relleno a cada barra
  }));

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={chartData} // Usamos los datos convertidos con los colores de relleno asignados
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="last_year" fill="fill" /> {/* Usamos la propiedad fill */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Waterfall;