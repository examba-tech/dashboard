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
import BarChartComponent from "./barChart"; 

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
  so2Data: {
    VALOR_SO2: Number;
    COUNT_SO2: Number;
    Codi_municipi: String;
    Nom_municipi: String;
  }[];
}

const segments: Segment[] = [
  { start: 0, end: 100, color: "#AED6F1" },
  { start: 100, end: 200, color: "#D4EFDF" },
  { start: 200, end: 350, color: "#F9E79F" },
  { start: 350, end: 500, color: "#FADBD8" },
  { start: 500, end: 750, color: "#F1948A" },
  { start: 750, end: 900, color: "#AB8187" },
];

const data = [{ name: "Aggregated", value: 900 }]; 

const CustomizedBar: React.FC<CustomizedBarProps> = (props) => {
  const { x, y, width, height, segments } = props;

  return (
    <g>
      {segments.map((segment, index) => (
        <Rectangle
          key={`rect-${index}`}
          x={x! + (segment.start / 900) * width!}
          y={y!}
          width={((segment.end - segment.start) / 900) * width!}
          height={height}
          fill={segment.color}
        />
      ))}
    </g>
  );
};

const BulletChart_SO2: React.FC<ChartProps> = ({ data2, so2Data }) => {
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
          <BarChartComponent data={so2Data} zoomed={zoomed} /> 
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
          domain={[0, 900]}
          ticks={[0, 100, 200, 350, 500, 750, 900]}
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
          x={900}
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

export default BulletChart_SO2;
