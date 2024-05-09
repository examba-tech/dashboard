import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartTwoProps {
  series: {
    name: string;
    data: number[];
  }[];
  selectedDiagnostic: string;
}

const ChartTwo: React.FC<ChartTwoProps> = ({ series, selectedDiagnostic }) => {
  const getColor = () => {
    const colorOptions: { [key: string]: string } = {
      "#3C50E0": "#3C50E0",
      "#FF5733": "#FF5733",
    };
    return series.some(serie => serie.name === selectedDiagnostic)
      ? colorOptions["#FF5733"]
      : colorOptions["#3C50E0"];
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
              color: getColor(),
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
            Diagnòstic
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="pb-15 flex justify-center">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={250}
            width={700}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;