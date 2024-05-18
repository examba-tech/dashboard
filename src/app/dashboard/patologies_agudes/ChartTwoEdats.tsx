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
    width: 500,
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
    categories: ["<15", "15-44", "45-64", "65-74", ">75"],
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
  selectedMunicipi: string;
  selectedDiagnostic: string;

}

const ChartTwo: React.FC<ChartTwoProps> = ({ series, selectedMunicipi, selectedDiagnostic}) => {
  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white pl-5 pt-3">
          {selectedDiagnostic === "Tots" && selectedMunicipi === "Tots"
          ? `Comparativa del nombre de visites segons les diferents franges d'edat de tots els diagnòstics a tots els municipis`
          : selectedDiagnostic === "Tots"
          ? `Comparativa del nombre de visites segons les diferents franges d'edat de tots els diagnòstics al municipi ${selectedMunicipi}`
          : selectedMunicipi === "Tots"
          ? `Comparativa del nombre de visites segons les diferents franges d'edat del diagnòstic ${selectedDiagnostic} a tots els municipis`
          : `Comparativa del nombre de visites segons les diferents franges d'edat del diagnòstic ${selectedDiagnostic} al municipi ${selectedMunicipi}`
          }
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
            height={225}
            width={350}
          />
          {infoVisible && (
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-64 h-54 rounded-lg shadow-lg"
              onClick={toggleInfo}
              style={{ marginTop: "-10px" , marginLeft: "10px" }}
            >
              <p className="text-sm text-gray-800 px-4 py-2">
              Cada barra representa una franja d’edat on la llargària de la barra representa el nombre de visites degut a aquella patologia en un moment concret del temps. L&apos;eix x és el nombre de pacients i l&apos;eix y els diferent tipus de franges d&apos;edat.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;