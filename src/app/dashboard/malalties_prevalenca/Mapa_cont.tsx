"use client"
import React from 'react';
import { VegaLite } from 'react-vega';
import data from './Filtered_MC.json';

interface ChartPredProps {
    predictions: {
      Codi_municipi: String,
      municipi: String,
      Latitud: Number,
      Longitud: Number,
      valor: Number,
      TN: Number,
      TX: Number,
      TM: Number,
      HRM: Number,
      PPT: Number,
      RS24h: Number,
      NO2: Number,
      NO: Number,
      SO2: Number,
      Numero_Casos: Number,
    }[];
  }

const Mapa: React.FC<ChartPredProps> = ({predictions}) => {    
    data.features.forEach(feature => {
        if (!feature.properties || feature.properties.codimuni === undefined) {
          console.error('Falta codimuni o properties en:', feature);
          // Puedes optar por eliminar estos elementos, asignarles un valor predeterminado o simplemente tomar nota para investigar más.
        }
    });

    console.log(data.features)
  const spec: any = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 450,
    "height": 600,
    "data": {
      "values": data.features
    },
    "transform": [
        {
          "lookup": "properties.codimuni", // Asegúrate de que este campo exista en tu data de geometría
          "from": {
            "data": {
              "values": predictions
            },
            "key": "Codi_municipi",
            "fields": ["NO2"] // Asegúrate de que este campo esté incluido en las predicciones
          },
          "default": null,
        }
      ],
    "projection": {"type": "mercator"},
    "mark": "geoshape",
    "encoding": {
      "color": {
        "field": "NO2", 
        "type": "quantitative",
        "scale": {
          "scheme": "reds"
        },
      }
    }
  };
  
  console.log(spec.transform[0].as); // Imprime el resultado de la transformación lookup

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-4 justify-between gap-4 sm:flex">
      <h4 className="text-xl font-semibold text-black dark:text-white pl-5 pt-3">
        Qualitat del NO2 dels últims 10 anys per municipis
      </h4>
      </div>
  <VegaLite spec={spec} />
  </div>)
};

export default Mapa;