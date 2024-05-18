"use client"
import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    width: 300,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ["Asma", 
    "Bronquitis Crònica", 
    "MPOC Mixte", 
    "Bronquiectasies", 
    "Other", 
    "Neoplasia Pulmonar", 
    "Enfisema", 
    "Fibrosi Pulmonar", 
    "Agents externs"],
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

interface ChartTwoProps {
  series: {
    name: string;
    data: number[];
  }[];
}


const ChartTwo: React.FC<ChartTwoProps> = ({ series }) => {
  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white pl-5 pt-3">
            Comparativa del nombre de pacients segons la malaltia
            <span
              className="text-sm text-gray-400 cursor-pointer"
              onClick={toggleInfo}
            >
              {" "}
              +info
            </span>
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="pb-15 flex justify-center relative">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
            width={500}
          />
          {infoVisible && (
            <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-4 w-144 h-84 rounded-lg shadow-lg"
              onClick={toggleInfo}
              style={{ marginLeft: "50px", marginTop: "-15px"}}
            >
              <p className="text-base text-gray-1000 px-2 py-2">
                Cada barra representa una malatia respiratòria crònica on la llargària de la barra representa el nombre de pacients d&apos;aquella malaltia. L&apos;eix x és el nombre de pacients i l&apos;eix y els diferent tipus de malalties.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;