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


const Mapa = ({predictions}) => {
    "transform": [
      {
        "lookup": "features.properties.codimuni", // Asegúrate de que este campo exista en tu data de geometría
        "from": {
          "data": {
            "values": predictions
          },
          "key": "CODI_MUNICIPAL",
          "fields": ["NUMERO_CASOS"] // Asegúrate de que este campo esté incluido en las predicciones
        }
      }
    ],
    "projection": {"type": "mercator"},
    "mark": "geoshape",
    "encoding": {
      "color": {
        "field": "NUMERO_CASOS",
        "type": "quantitative",
        "scale": {
          "scheme": "reds"
        },
        "title": "Número de Casos"
      }
    }
  };

  return <VegaLite spec={spec} />;
};

export default Mapa;


/*import React from 'react';
import { VegaLite } from 'react-vega';
import data from './Filtered_MC.json'; 

const Mapa = () => {
  const spec: any = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 400,
    "height": 600,
    "data": {
      "values": data
    },
    "projection": {"type": "mercator"},
    "mark": "geoshape",
    "encoding": {
      "color": {
        "field": "properties.nomcomar", 
        "type": "nominal"
      }
    }
  };

  return <VegaLite spec={spec} />;
};

export default Mapa;



import * as Interfaces from "@/src/utils/interfaces";
import React, { useEffect, useState } from 'react';
import { VegaLite } from 'react-vega';
import geoData from './Filtered_MC.json';

// Asumimos que tienes un tipo adecuado para 'predictions'
const Mapa = ({ prediccions }: { prediccions: Interfaces.PredictionType[] }) => {
  const [data, setData] = useState<Interfaces.GeoJSON>({ type: "FeatureCollection", features: [] });

  useEffect(() => {
    if (!prediccions || prediccions.length === 0) return;

    const mergedData: Interfaces.GeoJSON = {
      ...geoData,
      features: geoData.features.map(feature => {
        const prediction = prediccions.find(p => p.CODI_MUNICIPAL.toString() === feature.properties.codimuni);
        return {
          ...feature,
          properties: {
            ...feature.properties,
            visitas: prediction ? prediction.INGRESSOS_AVG : 0
          }
        };
      })
    };

    setData(mergedData);
  }, [prediccions]);

  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 500,
    "height": 300,
    "data": {
      "values": data.features
    },
    "projection": {"type": "mercator"},
    "mark": "geoshape",
    "encoding": {
      "color": {
        "field": "properties.INGRESSOS_AVG",
        "type": "quantitative",
        "scale": {
          "scheme": "blues"
        }
      },
      "tooltip": [
        {"field": "properties.codimuni", "title": "Municipi"},
        {"field": "properties.INGRESSOS_AVG", "title": "Visitas", "type": "quantitative"}
      ]
    }
  };

  return <VegaLite spec={spec} />;
};

export default Mapa;


import * as Interfaces from "@/src/utils/interfaces";
import React, { useEffect, useState } from 'react';
import { VegaLite } from 'react-vega';
import geoData from './Filtered_MC.json';

// Asumimos que tienes un tipo adecuado para 'predictions'
const Mapa = ({ prediccions }: { prediccions: Interfaces.PredictionType[] }) => {
  const [data, setData] = useState<Interfaces.GeoJSON>({ type: "FeatureCollection", features: [] });

  useEffect(() => {
    if (!prediccions || prediccions.length === 0) return;

    const mergedData: Interfaces.GeoJSON = {
      ...geoData,
      features: geoData.features.map(feature => {
        const prediction = prediccions.find(p => p.CODI_MUNICIPAL.toString() === feature.properties.codimuni);
        return {
          ...feature,
          properties: {
            ...feature.properties,
            visitas: prediction ? prediction.INGRESSOS_AVG : 0
          }
        };
      })
    };

    setData(mergedData);
  }, [prediccions]);

  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 500,
    "height": 300,
    "data": {
      "values": data.features
    },
    "projection": {"type": "mercator"},
    "mark": "geoshape",
    "encoding": {
      "color": {
        "field": "properties.INGRESSOS_AVG",
        "type": "quantitative",
        "scale": {
          "scheme": "blues"
        }
      },
      "tooltip": [
        {"field": "properties.codimuni", "title": "Municipi"},
        {"field": "properties.INGRESSOS_AVG", "title": "Visitas", "type": "quantitative"}
      ]
    }
  };

  return <VegaLite spec={spec} />;
};

export default Mapa;

*/