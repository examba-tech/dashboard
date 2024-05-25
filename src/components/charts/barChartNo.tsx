import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, TooltipProps } from 'recharts';

interface BarChartProps {
  data: { 
    VALOR_NO2: Number,
    COUNT_NO2: Number,
    Codi_municipi: String,
    Nom_municipi: String }[];
    zoomed: boolean; 
}

const CustomTooltip: React.FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p className="label">{`valor del NO2: ${payload[0].payload.VALOR_NO2}`}</p>
        <p className="intro">{`casos: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const BarChartComponentNo: React.FC<BarChartProps> = ({ data, zoomed }) => {
  return (
    <BarChart
      width={560}
      height={100}
      data={data}
    >
      <XAxis
        type="number"
        dataKey="VALOR_NO2"
        domain={zoomed ? [0, 200] : [0, 450]} // Ajuste del dominio en función del zoom
        ticks={zoomed ? [0, 40, 90, 120, 230] : [40, 90, 120, 230, 340]} // Ajuste de los ticks en función del zoom
      />
      <YAxis dataKey="COUNT_NO2" />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="COUNT_NO2" fill="#163a66" />
      
    </BarChart>
  );
};

export default BarChartComponentNo;