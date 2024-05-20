import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface BarChartProps {
  data: { 
    VALOR_SO2: Number,
    COUNT_SO2: Number,
    Codi_municipi: String,
    Nom_municipi: String }[];
}

const BarChartComponent: React.FC<BarChartProps> = ({ data }) => {
  return (
    <BarChart
      width={500}
      height={100}  // Ajusta la altura para el gráfico de barras
      data={data}
    >
      <XAxis
        type="number"
        dataKey="VALOR_SO2"
        domain={[0, 450]}
        ticks={[40, 90, 120, 230, 340]}
      />
      <YAxis dataKey="COUNT_SO2" />
      <Tooltip />
      <Bar dataKey="COUNT_SO2" fill="#163a66" />
      
    </BarChart>
  );
};

export default BarChartComponent;