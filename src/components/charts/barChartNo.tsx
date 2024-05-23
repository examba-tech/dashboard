import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface BarChartProps {
  data: { 
    VALOR_NO2: Number,
    COUNT_NO2: Number,
    Codi_municipi: String,
    Nom_municipi: String }[];
}

const BarChartComponentNo: React.FC<BarChartProps> = ({ data }) => {
  return (
    <BarChart
      width={500}
      height={100}
      data={data}
    >
      <XAxis
        type="number"
        dataKey="VALOR_NO2"
        domain={[0, 450]}
        ticks={[40, 90, 120, 230, 340]}
      />
      <YAxis dataKey="COUNT_NO2" />
      <Tooltip />
      <Bar dataKey="COUNT_NO2" fill="#163a66" />
      
    </BarChart>
  );
};

export default BarChartComponentNo;