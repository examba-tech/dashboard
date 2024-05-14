import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartTwoProps {
  series: {
    name: string;
    data: number[];
  }[];
  onDiagnosticChange: (municipi: string) => void;
}

const ChartTwo: React.FC<ChartTwoProps> = ({ series, onDiagnosticChange }) => {
  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

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
        colors: {
          ranges: [
            {
              from: -1000,
              to: 1000,
              color: "#3C50E0",
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Infeccions Agudes TRS",
        "Bronquitis Aguda",
        "Grip",
        "Bronquiolitis Aguda",
        "Pneumònia Bacteriana",
        "Pneumònia Vírica",
      ],
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

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white pl-5 pt-3">
            Comparativa del nombre de visites segons la seva patologia aguda
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
            height={250}
            width={700}
          />
          {infoVisible && (
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 w-84 h-74 rounded-lg shadow-lg"
              onClick={toggleInfo}
              style={{ marginTop: "-10px"}}
            >
              <p className="text-sm text-gray-800">
              Cada barra representa una patologia aguda on la llargària de la barra representa el nombre de pacients d&apos;aquella patologia en un moment concret del temps. L&apos;eix x és el nombre de pacients i l&apos;eix y els diferent tipus de patologies agudes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;