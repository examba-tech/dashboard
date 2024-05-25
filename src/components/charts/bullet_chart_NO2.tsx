import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  Rectangle,
  RectangleProps,
} from "recharts";
import BarChartComponentNo from "./barChartNo"; 

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
  no2Data: {
    VALOR_NO2: Number;
    COUNT_NO2: Number;
    Codi_municipi: String;
    Nom_municipi: String;
  }[]; // Añade la data de SO2
}

const segments: Segment[] = [
  { start: 0, end: 40, color: "#AED6F1" },
  { start: 40, end: 90, color: "#D4EFDF" },
  { start: 90, end: 120, color: "#F9E79F" },
  { start: 120, end: 230, color: "#FADBD8" },
  { start: 230, end: 340, color: "#F1948A" },
  { start: 340, end: 450, color: "#AB8187" },
];

const data = [{ name: "Aggregated", value: 450 }]; // Valor máximo para abarcar todo el rango

const CustomizedBar: React.FC<CustomizedBarProps> = (props) => {
  const { x, y, width, height, segments } = props;

  return (
    <g>
      {segments.map((segment, index) => (
        <Rectangle
          key={`rect-${index}`}
          x={x! + (segment.start / 450) * width!}
          y={y!}
          width={((segment.end - segment.start) / 450) * width!}
          height={height}
          fill={segment.color}
        />
      ))}
    </g>
  );
};

const BulletChart_NO2: React.FC<ChartProps> = ({ data2, no2Data }) => {
  const [zoomed, setZoomed] = useState(false);

  const numberToShow =
    data2.length > 0 && data2[0].data.length > 0
      ? Number(data2[0].data[0].toFixed(2))
      : undefined;

  return (
    <div>
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setZoomed(!zoomed)}
          style={{
            position: "absolute",
            right: 0,
            zIndex: 1,
            background: "white",
            border: "1px solid black",
            padding: "5px",
            cursor: "pointer",
          }}
        >
          {zoomed ? "Normal" : "Zoom"}
        </button>
        <div style={{
          position: "relative",
          background: zoomed ? "white" : "transparent",
          padding: zoomed ? "20px" : "0",
          transform: zoomed ? "scale(1.5)" : "scale(1)",
          transformOrigin: "top left",
          zIndex: zoomed ? 1 : 0,
          right: zoomed ? "500px" : "0", 
          transition: "right 0.3s ease-in-out, transform 0.3s ease-in-out",
        }}>
          <BarChartComponentNo data={no2Data} zoomed={zoomed} /> 
        </div>
      </div>
      <BarChart
        width={500}
        height={70}
        data={data}
        layout="vertical"
        style={{ marginLeft: "60px", marginTop: "-45px" }}
      >
        <XAxis
          type="number"
          domain={[0, 450]}
          ticks={[0, 40, 90, 120, 230, 340, 450]}
        />
        <YAxis type="category" dataKey="name" hide />
        <Bar
          dataKey="value"
          fill="#8884d8"
          shape={<CustomizedBar segments={segments} />}
        />
        <ReferenceLine
          x={0}
          stroke="black"
          strokeWidth={1}
          label={{
            value: "BO",
            position: "insideBottomRight", 
            dx: 22, 
            dy: 40, 
            fill: "black",
            style: { fontSize: "14px", fontWeight: "bold" },
          }}
        />
        <ReferenceLine
          x={450}
          stroke="black"
          strokeWidth={1}
          label={{
            value: "DOLENT",
            position: "insideBottomRight", 
            dx: 10, 
            dy: 40, 
            fill: "black",
            style: { fontSize: "14px", fontWeight: "bold" },
          }}
        />
        {numberToShow !== undefined && (
          <ReferenceLine
            x={numberToShow}
            stroke="red"
            strokeWidth={3}
            label={{
              value: numberToShow.toString(),
              position: "top",
              fill: "red",
            }}
          />
        )}
      </BarChart>
    </div>
  );
};

export default BulletChart_NO2;
