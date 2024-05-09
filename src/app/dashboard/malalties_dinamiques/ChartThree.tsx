import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    height: 400,
    width: 200,
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#3C50E0", "#0FADCF"],
  labels: ["Dona", "Home"],
  legend: {
    show: false,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 300,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 100,
        },
      },
    },
  ],
};

interface ChartThreeProps {
  series: {
    female: number;
    male: number;
  };
}

const ChartThree: React.FC<ChartThreeProps> = ({ series }) => {
  const seriesArray = [series.female, series.male];
  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white pt-3">
            Gènere
            <span
              className="text-sm text-gray-400 cursor-pointer"
              onClick={toggleInfo}
            >
              {" "}
              +info
            </span>
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center relative">
          <ReactApexChart
            options={options}
            series={seriesArray}
            type="donut"
            height={200}
            width={50}
          />
          {infoVisible && (
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-12 py-4 rounded-lg shadow-lg"
              onClick={toggleInfo}
            >
              <p className="text-sm text-gray-800">
                Aquest gràfic mostra la distribució del número de visites segons el gènere ... Aquest gràfic mostra la distribució del número de visites segons el gènere ...
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-y-3">
      <div className="w-full px-8 sm:w-1/2">
        <div className="flex w-full items-center">
          <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary bg-[#0FADCF]"></span>
          <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
            <span> Dona </span>
            <span> {seriesArray[0]} </span>
          </p>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-y-3">
      <div className="w-full px-8 sm:w-1/2">
        <div className="flex w-full items-center">
          <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#3C50E0]"></span>
          <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
            <span> Home </span>
            <span> {seriesArray[1]} </span>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChartThree;