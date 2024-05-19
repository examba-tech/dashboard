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
    selectedMunicipi: string;
  }


const Mapa: React.FC<ChartPredProps> = ({predictions, onMunicipiSelect, selectedMunicipi}) => {    
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

  const renderAdditionalInfo = () => {
    if (selectedMunicipi === "Cubelles") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080018, Abrera</p>
          <ul>
            <li>- 1 Equip d’Atenció Primària</li>
            <li>- 2 Consultoris</li>
            <li>- 1 Punt d’Atenció continuada</li>
            <li>- 1 estació contaminants a 081141, Martorell</li>
            <li>- XC</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Avinyonet del Penedès") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080137, Avinyonet del Penedès</p>
          <ul>
            <li>- 4 Consultoris</li>
            <li>- 4 estacions contaminants a 083054, Vilafranca del Penedès</li>
            <li>- W4</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Begues") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080207, Begues</p>
          <ul>
            <li>- 1 Equip d’Atenció Primària</li>
            <li>- 1 estació contaminants a 080898, Gavà</li>
            <li>- D3</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "les Cabanyes") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080272, les Cabanyes</p>
          <ul>
            <li>- 1 Equip d’Atenció Primària</li>
            <li>- 1 Punt d’Atenció continuada</li>
            <li>- 1 estació contaminants de 083054, Vilafranca del Penedès</li>
            <li>- W4</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Canyelles") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080431, Canyelles</p>
          <ul>
            <li>- 1 Consultori</li>
            <li>- 1 estació contaminants de 082515, Santa Margarida i els Monjos</li>
            <li>- XU</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Castelldefels") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080569, Castelldefels</p>
          <ul>
            <li>- 1 Equip d’atenció primària</li>
            <li>- 1 Punt d’Atenció continuada</li>
            <li>- SDPI</li>
            <li>- 1 estació contaminants de 080898, Gavà</li>
            <li>- UG</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Castellet i la Gornal") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080581, Castellet i la Gornal</p>
          <ul>
            <li>- 3 Consultoris</li>
            <li>- 2 estacions contaminants de 080749, Cubelles</li>
            <li>- YR</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Castellví de la Marca") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080654, Castellví de la Marca</p>
          <ul>
            <li>- 1 Consultori</li>
            <li>- 1 estació contaminants de 082515, Santa Margarida i els Monjos</li>
            <li>- W4</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Cervelló") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080689, Cervelló</p>
          <ul>
            <li>- 1 Consultori</li>
            <li>- 1 estació contaminants de 082634, Sant Vicenç dels Horts</li>
            <li>- D3</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Collbató") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080692, Collbató</p>
          <ul>
            <li>- 1 Consultori</li>
            <li>- 1 estació contaminants de 081141, Martorell</li>
            <li>- XC</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Corbera de Llobregat") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080728, Corbera de Llobregat</p>
          <ul>
            <li>- 1 Equip d’Atenció Primària</li>
            <li>- 1 Punt d’Atenció continuada</li>
            <li>- 1 estació contaminants de 81960, Sant Andreu de la Barca</li>
            <li>- D3</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Cornellà de Llobregat") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080734, Cornellà de Llobregat</p>
          <ul>
            <li>- 1 Equip d’Atenció Primària</li>
            <li>- 2 Consultoris</li>
            <li>- 1 estació contaminants de 081017, Hospitalet de Llobregat</li>
            <li>- XL</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Esparreguera") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080765, Esparreguera</p>
          <ul>
            <li>- 1 Equip d’Atenció Primària</li>
            <li>- 1 Punt d’Atenció continuada</li>
            <li>- 1 estació contaminants de 081141, Martorell</li>
            <li>- XC</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Esplugues de Llobregat") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080771, Esplugues de Llobregat</p>
          <ul>
            <li>- 2 Equips d’Atenció Primària</li>
            <li>- 2 Punts d’Atenció continuada</li>
            <li>- 1 estació contaminant de 081017, Hospitalet de Llobregat</li>
            <li>- X8</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Font-rubí") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080850, Font-rubí</p>
          <ul>
            <li>- 1 Consultori</li>
            <li>- 1 estació contaminant de 083054, Vilafranca del Penedès</li>
            <li>- W4</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Gavà") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080898, Gavà</p>
          <ul>
            <li>- 1 Equip d’atenció primària</li>
            <li>- 1 Punt d’Atenció continuada</li>
            <li>- 1 estació contaminant de 080898, Gavà</li>
            <li>- UG</li>
          </ul>
        </div>
      );
    }
    
    if (selectedMunicipi === "Gelida") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080919, Gelida</p>
          <ul>
            <li>- 1 Consultori</li>
            <li>- 2 estacions contaminant de 081017, Hospitalet de Llobregat</li>
            <li>- D3</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "la Granada") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080945, la Granada</p>
          <ul>
            <li>- 1 Consultori</li>
            <li>- 1 estació contaminant de 083054, Vilafranca del Penedès</li>
            <li>- W4</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "l'Hospitalet de Llobregat") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>081017, l’Hospitalet de Llobregat</p>
          <ul>
            <li>- 10 Equips d’atenció primària</li>
            <li>- 2 Consultoris</li>
            <li>- 2 CUAP</li>
            <li>- 3 Atenció especialitzada</li>
            <li>- 8 estacions contaminant de 081017, l’Hospitalet de Llobregat</li>
            <li>- X8</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Martorell") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>081141, Martorell</p>
          <ul>
            <li>- 1 Equip d’atenció primària</li>
            <li>- 1 estació contaminant de 081141, Martorell</li>
            <li>- XC</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Mediona") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>081228, Mediona</p>
          <ul>
            <li>- 1 Consultori</li>
            <li>- 1 estació contaminant de 080749, Cubelles</li>
            <li>- W4</li>
          </ul>
        </div>
      );
    }
    return null;
  };
  if (selectedMunicipi === "Molins de Rei") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>081234, Molins de Rei</p>
        <ul>
          <li>- 1 Equip d’atenció primària</li>
          <li>- 1 Punt d’Atenció continuada</li>
          <li>- 1 estació contaminant 081574, Pallejà</li>
          <li>- D3</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Olèrdola") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>081458, Olèrdola</p>
        <ul>
          <li>- 3 Consultoris</li>
          <li>- 2 estacions contaminants 083054, Vilafranca del Penedès</li>
          <li>- W4</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Olesa de Bonesvalls") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>081461, Olesa de Bonesvalls</p>
        <ul>
          <li>- 1 Consultori</li>
          <li>- 1 estació contaminant 083054, Vilafranca del Penedès</li>
          <li>- W4</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Olivella") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>081483, Olivella</p>
        <ul>
          <li>- 1 Consultori</li>
          <li>- 1 estació contaminant 083054, Vilafranca del Penedès</li>
          <li>- W4</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Pacs del Penedès") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>081542, Pacs del Penedès</p>
        <ul>
          <li>- 1 Consultori</li>
          <li>- 1 estació contaminant 083054, Vilafranca del Penedès</li>
          <li>- W4</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Pallejà") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>081574, Pallejà</p>
        <ul>
          <li>- 1 Equip d’atenció primària</li>
          <li>- 1 Punt d’Atenció continuada</li>
          <li>- 2 estacions contaminant 081574, Pallejà</li>
          <li>- D3</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "el Pla del Penedès") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>081640, el Pla del Penedès</p>
        <ul>
          <li>- 1 Consultori</li>
          <li>- 1 estació contaminant 083054, Vilafranca del Penedès</li>
          <li>- W4</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "el Prat de Llobregat") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>081691, el Prat de Llobregat</p>
        <ul>
          <li>- 3 Equips d’atenció primària</li>
          <li>- 1 Punt d’Atenció continuada</li>
          <li>- 1 Atenció especialitzada</li>
          <li>- Unitat de salut laboral</li>
          <li>- SDPI</li>
          <li>- 1 estació contaminant 081691, "Prat de Llobregat, el"</li>
          <li>- XL</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Pontons") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>081688, Pontons</p>
        <ul>
          <li>- 1 Consultori</li>
          <li>- 1 estació contaminant 082515, Santa Margarida i els Monjos</li>
          <li>- W4</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Sant Boi de Llobregat") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082009, Sant Boi de Llobregat</p>
        <ul>
          <li>- 2 Equips d’atenció primària</li>
          <li>- 1 estació contaminant 083015, Viladecans</li>
          <li>- XL</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Sant Cugat Sesgarrigues") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082068, Sant Cugat Sesgarrigues</p>
        <ul>
          <li>- 1 Consultori</li>
          <li>- 1 estació contaminant 083054, Vilafranca del Penedès</li>
          <li>- W4</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Sant Feliu de Llobregat") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082114, Sant Feliu de Llobregat</p>
        <ul>
          <li>- 1 Equip d’atenció primària</li>
          <li>- 1 Punt d’Atenció continuada</li>
          <li>- 1 estació contaminant 082634, Sant Vicenç dels Horts</li>
          <li>- XL</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Sant Joan Despí") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082172, Sant Joan Despí</p>
        <ul>
          <li>- 1 Equip d’atenció primària</li>
          <li>- 1 estació contaminant 081017, "Hospitalet de Llobregat, l"</li>
          <li>- XL</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Sant Just Desvern") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082212, Sant Just Desvern</p>
        <ul>
          <li>- 1 Equip d’atenció primària</li>
          <li>- 1 estació contaminant 081017, "Hospitalet de Llobregat, l"</li>
          <li>- XL</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Sant Llorenç d'Hortons") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082227, Sant Llorenç d'Hortons</p>
        <ul>
          <li>- 3 Consultoris</li>
          <li>- 1 estació contaminants 081141, Martorell</li>
          <li>- XC</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Sant Martí Sarroca") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082270, Sant Martí Sarroca</p>
        <ul>
          <li>- 3 Consultoris</li>
          <li>- 1 estació contaminants 082515, Santa Margarida i els Monjos</li>
          <li>- W4</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Sant Pere de Ribes") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082310, Sant Pere de Ribes</p>
        <ul>
          <li>- 1 Equip d’atenció primària</li>
          <li>- 1 Consultori</li>
          <li>- 1 Punt d’Atenció continuada</li>
          <li>- 2 estacions contaminants 083073, Vilanova i la Geltrú</li>
          <li>- UK</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Sant Pere de Riudebitlles") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082325, Sant Pere de Riudebitlles</p>
        <ul>
          <li>- 1 Consultori</li>
          <li>- 1 estació contaminants 083054, Vilafranca del Penedès</li>
          <li>- W4</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Sant Quintí de Mediona") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082362, Sant Quintí de Mediona</p>
        <ul>
          <li>- 1 Consultori</li>
          <li>- 1 estació contaminants 083054, Vilafranca del Penedès</li>
          <li>- W4</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Sant Sadurní d'Anoia") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082401, Sant Sadurní d'Anoia</p>
        <ul>
          <li>- 1 Equip d’atenció primària</li>
          <li>- 1 Punt d’Atenció continuada</li>
          <li>- 1 estació contaminants 083054, Vilafranca del Penedès</li>
          <li>- W4</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Santa Margarida i els Monjos") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082515, Santa Margarida i els Monjos</p>
        <ul>
          <li>- 2 Consultoris</li>
          <li>- 1 estació contaminants 082515, Santa Margarida i els Monjos</li>
          <li>- XU</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Sant Vicenç dels Horts") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082634, Sant Vicenç dels Horts</p>
        <ul>
          <li>- 2 Equips d’atenció primària</li>
          <li>- 1 Consultori</li>
          <li>- CUAP</li>
          <li>- SDPI</li>
          <li>- 1 estació contaminants 082634, Sant Vicenç dels Horts</li>
          <li>- D3</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Sitges") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082704, Sitges</p>
        <ul>
          <li>- 1 Equip d’atenció primària</li>
          <li>- 1 Punt d’Atenció continuada</li>
          <li>- 3 estacions contaminants 083073, Vilanova i la Geltrú</li>
          <li>- YR</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Torrelavit") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082877, Torrelavit</p>
        <ul>
          <li>- 1 Consultori</li>
          <li>- 1 estació contaminants 083054, Vilafranca del Penedès</li>
          <li>- W4</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Torrelles de Foix") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082883, Torrelles de Foix</p>
        <ul>
          <li>- 1 Consultori</li>
          <li>- 1 estació contaminants 082515, Santa Margarida i els Monjos</li>
          <li>- W4</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Vallirana") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>082956, Vallirana</p>
        <ul>
          <li>- 1 Equip d’atenció primària</li>
          <li>- 1 Punt d’Atenció continuada</li>
          <li>- 2 estacions contaminants de 082634, Sant Vicenç dels Horts</li>
          <li>- D3</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Viladecans") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>083015, Viladecans</p>
        <ul>
          <li>- 1 Equip d’atenció primària</li>
          <li>- 1 Punt d’Atenció continuada</li>
          <li>- 1 estació contaminants 083015, Viladecans</li>
          <li>- UG</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Vilafranca del Penedès") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>083054, Vilafranca del Penedès</p>
        <ul>
          <li>- 1 Equip d’atenció primària</li>
          <li>- Línea d’atenció pediàtrica</li>
          <li>- Punt d’atenció continuada</li>
          <li>- 1 estació contaminants 083054, Vilafranca del Penedès</li>
          <li>- W4</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Vilobí del Penedès") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>083041, Vilobí del Penedès</p>
        <ul>
          <li>- 1 Consultori</li>
          <li>- 1 estació contaminants 083054, Vilafranca del Penedès</li>
          <li>- W4</li>
        </ul>
      </div>
    );
  }
  if (selectedMunicipi === "Vilanova i la Geltrú") {
    return (
      <div className="additional-info ml-4">
        <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
        <p>083073, Vilanova i la Geltrú</p>
        <ul>
          <li>- 1 Equip d’atenció primària</li>
          <li>- SDPI</li>
          <li>- 1 estació contaminants 083073, Vilanova i la Geltrú</li>
          <li>- YR</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-4 justify-between gap-4 sm:flex">
      <h4 className="text-xl font-semibold text-black dark:text-white pl-5 pt-3">
    Predicció dels pròxims 7 dies de visites als CAPs
  </h4>
      </div>
    <VegaLite spec={spec} onNewView={handleNewView} />
    {renderAdditionalInfo()}
    </div>
  )
};

export default Mapa;