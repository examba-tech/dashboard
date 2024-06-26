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
  selectedMunicipi: string;
  onDiagnosticChange: (diagnostic: string) => void;
}

const ChartTwo: React.FC<ChartTwoProps> = ({
  series,
  selectedMunicipi,
  onDiagnosticChange,
}) => {

  const roundedSeries = series.map(serie => ({
    ...serie,
    data: serie.data.map(value => parseFloat(value.toFixed(1))),
  }));

  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

  const handleDataPointSelection = (
    event: any,
    chartContext: any,
    config: any
  ) => {
    const diagnostic = config.w.config.xaxis.categories[config.dataPointIndex];
    onDiagnosticChange(diagnostic);
  };

  const options: ApexOptions = {
    yaxis: {
      min: 0,
      max: 4000,
      labels: {
        style: {
          fontSize: "7px", // Tamaño de la letra del eje y
        },
      },
    },
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
      events: {
        dataPointSelection: handleDataPointSelection,
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
        "ASMA",
        "BRONQUITIS_CRONICA",
        "MPOC_MIXTE",
        "BRONQUIECTASIES",
        "OTHER",
        "NEOPLASIA_PULMONAR",
        "ENFISEMA",
        "FIBROSI_PULMONAR",
        "AGENTS_EXTERNS",
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
            {selectedMunicipi == "Tots"
              ? "Pacients cada 10.000 habitants segons el diagnòstic al 2023"
              : `Pacients cada 10.000 habitants segons el diagnòstic al municipi ${selectedMunicipi} al 2023`}
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
            series={roundedSeries}
            type="bar"
            height={347}
            width={500}
          />
          {infoVisible && (
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-4 w-84 h-74 rounded-lg shadow-lg"
              onClick={toggleInfo}
              style={{ marginTop: "-10px" }}
            >
              <p className="text-base text-gray-1000 px-4 py-2">
              En aquest gràfic cada barra representa una malaltia respiratòria crònica on la llargària de la barra representa el nombre de pacients d&apos;aquella patologia a 2023. L&apos;eix x és el nombre de pacients i l&apos;eix y els diferent tipus de malatia crònica.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
