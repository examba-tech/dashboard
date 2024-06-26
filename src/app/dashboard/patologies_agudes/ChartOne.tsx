"use client";
import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    width: 600,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
          width: 550,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
          width: 610,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "2014-12-25",
      "2014-12-26",
      "2014-12-27",
      "2014-12-28",
      "2014-12-29",
      "2014-12-30",
      "2014-12-31"
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 100,
    labels: {
      formatter: function(value) {
        return value.toFixed(2); 
      }
    }
  },
};


interface ChartOneProps {
  series: {
    name: string;
    data: number[];
  }[];
  selectedMunicipi: string;
}
  
  const ChartOne: React.FC<ChartOneProps> = ({ series, selectedMunicipi }) => {
  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

  return (
    <div className="relative col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white pt-3">
          Predicció al municipi {selectedMunicipi}
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
        <div className="mb-2"></div>
        <div id="chartOne" className="pl-5 flex justify-center">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={313}
            width={550}
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
  );
};

export default ChartOne;