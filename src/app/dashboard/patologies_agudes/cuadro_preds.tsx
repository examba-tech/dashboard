import React from "react";
// import { Roboto} from 'next/font/google';

// const roboto = Roboto({
//     weight: '900',
//     subsets: ['latin'],
// });

interface ChartData {
  name: string;
  data: number[];
}

interface ChartProps {
  data: ChartData[];
}

const SimpleChart: React.FC<ChartProps> = ({ data }) => {
  const numberToShow = data.length > 0 && data[0].data.length > 0 ? data[0].data[0].toFixed(2) : null;
  return (
    // <div className={`text-3xl font-bold my-12 ${roboto.className}`}>
    //   {numberToShow !== null && <p style={{ fontSize: '70px' }}>{numberToShow}</p>}
    <div>
        {numberToShow !== null && <p style={{ fontSize: '65px', fontWeight: '900', fontFamily: 'Impact' }}>{numberToShow}</p>}
    </div>
  );
};

export default SimpleChart;
