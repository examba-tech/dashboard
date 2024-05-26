import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, TooltipProps } from 'recharts';

interface BarChartProps {
  data: { 
    VALOR_SO2: Number,
    COUNT_SO2: Number,
    Codi_municipi: String,
    Nom_municipi: String }[];
    zoomed: boolean; 
}

const CustomTooltip: React.FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p className="label">{`valor del SO2: ${payload[0].payload.VALOR_SO2}`}</p>
        <p className="intro">{`casos: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const BarChartComponent: React.FC<BarChartProps> = ({ data, zoomed }) => {
  return (
    <BarChart
      width={560}
      height={100} 
      data={data}
    >
      <XAxis
        type="number"
        dataKey="VALOR_SO2"
        domain={zoomed ? [0, 200] : [0, 900]} // Ajuste del dominio en función del zoom
        ticks={zoomed ? [0, 100, 200] : [100, 200, 350, 500, 750]} // Ajuste de los ticks en función del zoom
      />
      <YAxis 
        dataKey="COUNT_SO2" 
        domain={[0, 1000]} // Fijar escala
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="COUNT_SO2" fill="#163a66" />
      
    </BarChart>
  );
};

export default BarChartComponent;