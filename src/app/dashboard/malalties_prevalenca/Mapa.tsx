"use client";
import data from "./Filtered_MC.json";
import { VegaLite, Vega } from "react-vega";
import { View } from "vega";
import React, { useState } from "react";

interface ChartPredProps {
  predictions: {
    Codi_municipi: String;
    municipi: String;
    Latitud: Number;
    Longitud: Number;
    valor: Number;
    TN: Number;
    TX: Number;
    TM: Number;
    HRM: Number;
    PPT: Number;
    RS24h: Number;
    NO2: Number;
    NO: Number;
    SO2: Number;
    Numero_Casos: Number;
    ICQA_NO2: Number;
    ICQA_SO2: Number;
    total_poblacio: Number;
  }[];
  onMunicipiSelect: (municipi: string) => void;
}

const Mapa: React.FC<ChartPredProps> = ({ predictions, onMunicipiSelect }) => {
  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };
  data.features.forEach((feature) => {
    if (!feature.properties || feature.properties.codimuni === undefined) {
      console.error("Falta codimuni o properties en:", feature);
    }
  });
  const predictionsWithStringKeys = predictions.map((prediction) => ({
    ...prediction,
    Numero_Casos:
      (prediction.Numero_Casos.valueOf() /
        prediction.total_poblacio.valueOf()) *
      10000,
    Codi_municipi: prediction.Codi_municipi.toString(),
  }));

  const spec: any = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: 425,
    height: 600,
    data: {
      values: data.features,
    },
    transform: [
      {
        lookup: "properties.codimuni",
        from: {
          data: {
            values: predictionsWithStringKeys,
          },
          key: "Codi_municipi",
          fields: ["Numero_Casos", "municipi"],
        },
        default: null,
      },
    ],
    projection: { type: "mercator" },
    mark: { type: "geoshape" },
    selection: {
      municipi: {
        type: "single",
        on: "click",
        fields: ["properties.nommuni"],
        empty: "none",
      },
    },
    encoding: {
      color: {
        field: "Numero_Casos",
        type: "quantitative",
        scale: { scheme: "blues" },
      },
      stroke: {
        condition: { selection: "municipi", value: "black" },
        value: null,
      },
      strokeWidth: {
        condition: { selection: "municipi", value: 3 },
        value: 1,
      },
      tooltip: [
        { field: "properties.nommuni", type: "nominal", title: "municipi:" },
        { field: "Numero_Casos", type: "quantitative", title: "pacients:" },
      ],
    },
  };
  const handleNewView = (view: View) => {
    view.addEventListener("click", (event, item) => {
      if (
        item &&
        item.datum &&
        item.datum.properties &&
        item.datum.properties.nommuni
      ) {
        onMunicipiSelect(item.datum.properties.nommuni);
      } else {
        onMunicipiSelect("Tots");
      }
    });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <h4 className="text-xl font-semibold text-black dark:text-white pl-5 pt-3">
          Distribució del nombre de pacients per municipis
          <span
            className="text-sm text-gray-400 cursor-pointer"
            onClick={toggleInfo}
          >
            {" "}
            +info
          </span>
        </h4>
      </div>
      <VegaLite spec={spec} onNewView={handleNewView} />
      {infoVisible && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-4 w-64 h-54 rounded-lg shadow-lg"
          onClick={toggleInfo}
        >
          <p className="text-sm text-gray-800">
            Mapa dividit segons els municipis, on cada municipi està colorejat
            en funció del nombre de pacients registrats degut a alguna malaltia
            respiratòria crònica al 2023, permetent així identificar fàcilment
            les àrees amb més casos, facilitant l&apos;anàlisi i la presa de
            decisions basada en dades.
          </p>
        </div>
      )}
    </div>
  );
};

export default Mapa;
