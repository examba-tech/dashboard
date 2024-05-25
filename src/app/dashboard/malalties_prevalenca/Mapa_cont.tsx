"use client";
import React, { useState } from "react";
import { VegaLite } from "react-vega";
import data from "./Filtered_MC.json";

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
}

const Mapa: React.FC<ChartPredProps> = ({ predictions }) => {
  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };
  data.features.forEach((feature) => {
    if (!feature.properties || feature.properties.codimuni === undefined) {
      console.error("Falta codimuni o properties en:", feature);
      // Puedes optar por eliminar estos elementos, asignarles un valor predeterminado o simplemente tomar nota para investigar más.
    }
  });

  console.log(data.features);
  const spec: any = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: 450,
    height: 600,
    data: {
      values: data.features,
    },
    transform: [
      {
        lookup: "properties.codimuni", // Asegúrate de que este campo exista en tu data de geometría
        from: {
          data: {
            values: predictions,
          },
          key: "Codi_municipi",
          fields: ["NO2"], // Asegúrate de que este campo esté incluido en las predicciones
        },
        default: null,
      },
    ],
    projection: { type: "mercator" },
    mark: "geoshape",
    encoding: {
      color: {
        field: "NO2",
        type: "quantitative",
        scale: {
          scheme: "reds",
        },
      },
      tooltip: [
        { field: "properties.nommuni", type: "nominal", title: "municipi:" },
        { field: "NO2", type: "quantitative", title: "valor:", format: ".1f" },
      ],
    },
  };

  console.log(spec.transform[0].as);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <h4 className="text-xl font-semibold text-black dark:text-white pl-5 pt-3">
          Qualitat del NO2 dels últims 10 anys per municipis
          <span
            className="text-sm text-gray-400 cursor-pointer"
            onClick={toggleInfo}
          >
            {" "}
            +info
          </span>
        </h4>
      </div>
      <VegaLite spec={spec} />
      {infoVisible && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-4 w-64 h-54 rounded-lg shadow-lg"
          onClick={toggleInfo}
        >
          <p className="text-sm text-gray-800">
            Mapa de la qualitat dels nivells de NO2 dels darrers 10 anys,
            dividit per municipis. Cada municipi està colorejat utilitzant una
            paleta de colors que indica el valor de NO2, això permet identificar
            fàcilment les àrees més afectades per aquest contaminant, obtenir
            informació sobre la qualitat de l&apos;aire i relacionar-ho amb el
            mapa anterior per a veure la relació entre el nombre de pacients i
            la qualitat de l&apos;aire de cada municipi.
          </p>
        </div>
      )}
    </div>
  );
};

export default Mapa;
