import React from "react";

interface ChartData {
  name: string;
  data: number[];
}

interface ChartProps {
  data: ChartData[];
}

const SimpleChart: React.FC<ChartProps> = ({ data }) => {
  const numberToShow =
    data.length > 0 && data[0] && data[0].data.length > 0
      ? data[0].data[0].toFixed(1)
      : null;
  return (
    <div>
      {numberToShow !== null && (
        <p
          style={{ fontSize: "65px", fontWeight: "900", fontFamily: "Impact" }}
        >
          {numberToShow}
        </p>
      )}
    </div>
  );
};

export default SimpleChart;
