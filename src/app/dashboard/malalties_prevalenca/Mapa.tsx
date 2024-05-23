"use client"
import data from './Filtered_MC.json';
import { VegaLite, Vega } from 'react-vega';
import { View } from 'vega';


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
     Codi_municipi: prediction.Codi_municipi.toString()
    }));

    const spec:any = {
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
              "values": predictionsWithStringKeys
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
        Distribució del nombre de pacients per municipis
      </h4>
      </div>
  <VegaLite spec={spec} onNewView={handleNewView} />
  </div>
  )
};

export default Mapa;