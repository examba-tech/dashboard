import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine, Rectangle, RectangleProps } from 'recharts';

interface Segment {
  start: number;
  end: number;
  color: string;
}

interface CustomizedBarProps extends RectangleProps {
  segments: Segment[];
}

interface ChartData {
  name: string;
  data: number[];
}

interface ChartProps {
  data2: ChartData[];
}

const segments: Segment[] = [
  { start: 0, end: 40, color: '#AED6F1' },
  { start: 41, end: 90, color: '#D4EFDF' },
  { start: 91, end: 120, color: '#F9E79F' },
  { start: 121, end: 230, color: '#FADBD8' },
  { start: 231, end: 340, color: '#F1948A' },
  { start: 341, end: 450, color: '#AB8187' },
];

const data = [{ name: 'Aggregated', value: 450 }]; // Valor máximo para abarcar todo el rango

const CustomizedBar: React.FC<CustomizedBarProps> = (props) => {
  const { x, y, width, height, segments } = props;
  
  return (
    <g>
      {segments.map((segment, index) => (
        <Rectangle
          key={`rect-${index}`}
          x={x! + (segment.start / 450) * width!}
          y={y!}
          width={(segment.end - segment.start) / 450 * width!}
          height={height}
          fill={segment.color}
        />
      ))}
    </g>
  );
};

const BulletChart_NO2: React.FC<ChartProps> = ({ data2 }) => {
  const numberToShow = data2.length > 0 && data2[0].data.length > 0 ? Number(data2[0].data[0].toFixed(2)) : undefined; 

  return (
    <BarChart
      width={610}
      height={100}
      data={data}
      layout="vertical"
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis
        type="number"
        domain={[0, 450]}
        ticks={[0, 40, 90, 120, 230, 340, 450]}
      />
      <YAxis type="category" dataKey="name" hide />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" shape={<CustomizedBar segments={segments} />} />
      {numberToShow !== undefined && (
        <ReferenceLine 
        x={numberToShow} 
        stroke="red" 
        strokeWidth={3} 
        label={{ value: numberToShow.toString(), position: 'top', fill: 'red' }} 
      />
      )}
    </BarChart>
  );
};

export default BulletChart_NO2;