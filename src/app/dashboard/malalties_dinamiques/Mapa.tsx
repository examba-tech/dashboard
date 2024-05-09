import React from 'react';
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


/*
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