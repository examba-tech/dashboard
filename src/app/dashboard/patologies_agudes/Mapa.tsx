"use client"
import data from './Filtered_MC.json';
import { VegaLite, Vega } from 'react-vega';
import { View } from 'vega';

interface ChartPredProps {
    predictions: {
        CODI_MUNICIPAL: Number,
        ANY: Number,
        MES: Number,
        DIA: Number,
        DIA_SETMANA: Number,
        NO_AVG: Number,
        NO2_AVG: Number,
        SO2_AVG: Number,
        POBLACIO: Number,
        INGRESSOS_AVG: Number,
        INGRESSOS: Number,
        INGRESSOS_DEUMIL: Number,
        NOM_MUNICIPI: String,
    }[];
    onMunicipiSelect: (municipi: string) => void;
  }


const Mapa: React.FC<ChartPredProps> = ({predictions, onMunicipiSelect}) => {    
    data.features.forEach(feature => {
        if (!feature.properties || feature.properties.codimuni === undefined) {
          console.error('Falta codimuni o properties en:', feature);
        }
    });
    const predictionsWithStringKeys = predictions.map(prediction => ({
     ...prediction,
    CODI_MUNICIPAL: "0" + prediction.CODI_MUNICIPAL.toString()
    }));

    const spec:any = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "width": 425,
      "height": 550,
      "data": {
        "values": data.features
      },
      "transform": [
        {
          "lookup": "properties.codimuni",
          "from": {
            "data": {
              "values": predictionsWithStringKeys
            },
            "key": "CODI_MUNICIPAL",
            "fields": ["INGRESSOS_AVG", "municipi"]
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
          "field": "INGRESSOS_AVG",
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
    const handleNewView = (view: View) => {
      view.addEventListener('click', (event, item) => {
          if (item && item.datum && item.datum.properties && item.datum.properties.nommuni) {
              onMunicipiSelect(item.datum.properties.nommuni);
          }
      });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-4 justify-between gap-4 sm:flex">
      <h4 className="text-xl font-semibold text-black dark:text-white pl-5 pt-3">
    Predicció dels pròxims 7 dies de visites als CAPs
  </h4>
      </div>
    <VegaLite spec={spec} onNewView={handleNewView} />
    </div>
  )
};

export default Mapa;
