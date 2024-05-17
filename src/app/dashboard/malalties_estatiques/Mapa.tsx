
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

  nst spec: any = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 425,
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
            "fields": ["Numero_Casos"] // Asegúrate de que este campo esté incluido en las predicciones
          },
          "default": null,
        }
      ],
    "projection": {"type": "mercator"},
    "mark": "geoshape",
    "encoding": {
      "color": {
        "field": "Numero_Casos", 
        "type": "quantitative",
        "scale": {
          "scheme": "blues"
        },
      }
    }
  };
  
  console.log(spec.transform[0].as); // Imprime el resultado de la transformación lookup

  return <VegaLite spec={spec} />;
};

export default Mapa;


/*

import React from 'react';
import { VegaLite } from 'react-vega';
import data from './Filtered_MC.json';

interface ChartPredProps {
  predictions: {
    Codi_municipi: string;
    municipi: string;
    Latitud: number;
    Longitud: number;
    valor: number;
    TN: number;
    TX: number;
    TM: number;
    HRM: number;
    PPT: number;
    RS24h: number;
    NO2: number;
    NO: number;
    SO2: number;
    Numero_Casos: number;
  }[];
}

const Mapa: React.FC<ChartPredProps> = ({ predictions }) => {
  const spec: any = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 425,
    "height": 600,
    "data": {
      "values": data.features
    },
    "transform": [
      {
        "lookup": "properties.codimuni",
        "from": {
          "data": {
            "values": predictions
          },
          "key": "Codi_municipi",
          "fields": ["Numero_Casos", "municipi"]
        },
        "default": null,
      }
    ],
    "projection": {"type": "mercator"},
    "mark": {"type": "geoshape"},
    "selection": {
      "municipi": {
        "type": "single",
        "on": "click",
        "fields": ["properties.nommuni"],
        "empty": "none"
      }
    },
    "encoding": {
      "color": {
        "field": "Numero_Casos",
        "type": "quantitative",
        "scale": {"scheme": "blues"}
      },
      "stroke": {
        "condition": {"selection": "municipi", "value": "black"},
        "value": null
      },
      "strokeWidth": {
        "condition": {"selection": "municipi", "value": 3},
        "value": 1
      }
    }
  };

  return <VegaLite spec={spec} />;
};

export default Mapa;
*/