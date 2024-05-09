import React from "react";
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
}

const MyLineChart: React.FC<MyLineChartProps> = ({ visits }) => {
  return (
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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="data[0]" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MyLineChart;