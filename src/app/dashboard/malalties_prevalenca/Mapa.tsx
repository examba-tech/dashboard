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
  selectedMunicipi: string;
}

const Mapa: React.FC<ChartPredProps> = ({ predictions, onMunicipiSelect, selectedMunicipi }) => {
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
    width: 450,
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
        title: "Pacients",
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
        { field: "Numero_Casos", type: "quantitative", title: "pacients:", format: ".1f" },
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

  const renderAdditionalInfo = () => {
    if (selectedMunicipi === "Abrera") {
        return (
          <div className="additional-info ml-4">
            <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
            <p>080018, Abrera</p>
            <ul>
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Equip d&apos;Atenció Primària</li>
              <li>- 2 Consultoris</li>
              <li>- 1 Punt d&apos;Atenció continuada</li>
              <li>- 1 estació de contaminants de 081141, Martorell</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: XC, Castellbisbal</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 4 Consultoris</li>
              <li>- 4 estacions de contaminants de 083054, Vilafranca del Penedès</li>
              <li>-Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Equip d&apos;Atenció Primària</li>
              <li>- 1 estació de contaminants de 080898, Gavà</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: D3, Vallirana</li>
            </ul>
          </div>
        );
      }
      if (selectedMunicipi === "Les Cabanyes") {
        return (
          <div className="additional-info ml-4">
            <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
            <p>080272, les Cabanyes</p>
            <ul>
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Equip d&apos;Atenció Primària</li>
              <li>- 1 Punt d&apos;Atenció continuada</li>
              <li>- 1 estació de contaminants de 083054, Vilafranca del Penedès</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Consultori</li>
              <li>- 1 estació de contaminants de 082515, Santa Margarida i els Monjos</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: XU, Canyelles</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Equip d&apos;Atenció Primària</li>
              <li>- 1 Punt d&apos;Atenció continuada</li>
              <li>- SDPI</li>
              <li>- 1 estació de contaminants de 080898, Gavà</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: UG, Viladecans</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 3 Consultoris</li>
              <li>- 2 estacions de contaminants de 080749, Cubelles</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: YR, Vilanova i la Geltrú</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Consultori</li>
              <li>- 1 estació de contaminants de 082515, Santa Margarida i els Monjos</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Consultori</li>
              <li>- 1 estació de contaminants de 082634, Sant Vicenç dels Horts</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: D3, Vallirana</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Consultori</li>
              <li>- 1 estació de contaminants de 081141, Martorell</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: XC, Castellbisbal</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Equip d&apos;Atenció Primària</li>
              <li>- 1 Punt d&apos;Atenció continuada</li>
              <li>- 1 estació de contaminants de 81960, Sant Andreu de la Barca</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: D3, Vallirana</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Equip d&apos;Atenció Primària</li>
              <li>- 2 Consultoris</li>
              <li>- 1 estació de contaminants de 081017, l&apos;Hospitalet de Llobregat</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: XL, El Prat de Llobregat </li>
            </ul>
          </div>
        );
      }
      if (selectedMunicipi === "Cubelles") {
        return (
          <div className="additional-info ml-4">
            <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
            <p>080749, Cubelles</p>
            <ul>
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Equip d&apos;Atenció Primària</li>
              <li>- 1 Punt d&apos;Atenció continuada</li>
              <li>- 1 estació de contaminants de 080749, Cubelles</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: YR, Vilanova i la Geltrú</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Equip d&apos;Atenció Primària</li>
              <li>- 1 Punt d&apos;Atenció continuada</li>
              <li>- 1 estació de contaminants de 081141, Martorell</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: XC, Castellbisbal</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 2 Equips d&apos;Atenció Primària</li>
              <li>- 2 Punts d&apos;Atenció continuada</li>
              <li>- 1 estació de contaminants de 081017, l&apos;Hospitalet de Llobregat</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: X8, Barcelona (Zona Universitària)</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Consultori</li>
              <li>- 1 estació de contaminants de 083054, Vilafranca del Penedès</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Equip d&apos;Atenció Primària</li>
              <li>- 1 Punt d&apos;Atenció continuada</li>
              <li>- 1 estació de contaminants de 080898, Gavà</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: UG, Viladecans</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Consultori</li>
              <li>- 2 estacions de contaminants de 081017, l&apos;Hospitalet de Llobregat</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: D3, Vallirana</li>
            </ul>
          </div>
        );
      }
      if (selectedMunicipi === "La Granada") {
        return (
          <div className="additional-info ml-4">
            <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
            <p>080945, la Granada</p>
            <ul>
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Consultori</li>
              <li>- 1 estació de contaminants de 083054, Vilafranca del Penedès</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
            </ul>
          </div>
        );
      }
      if (selectedMunicipi === "Hospitalet de Llobregat") {
        return (
          <div className="additional-info ml-4">
            <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
            <p>081017, l&apos;Hospitalet de Llobregat</p>
            <ul>
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 10 Equips d&apos;Atenció Primària</li>
              <li>- 2 Consultoris</li>
              <li>- 2 CUAP</li>
              <li>- 3 Atenció especialitzada</li>
              <li>- 8 estacions de contaminants de 081017, l&apos;Hospitalet de Llobregat</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: X8, Barcelona (Zona Universitària)</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Equip d&apos;Atenció Primària</li>
              <li>- 1 estació de contaminants de 081141, Martorell</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: XC, Castellbisbal</li>
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
            <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
              <li>- 1 Consultori</li>
              <li>- 1 estació de contaminants de 080749, Cubelles</li>
              <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
            </ul>
          </div>
        );
      }
    if (selectedMunicipi === "Molins de Rei") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>081234, Molins de Rei</p>
          <ul>
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Equip d&apos;Atenció Primària</li>
            <li>- 1 Punt d&apos;Atenció continuada</li>
            <li>- 1 estació de contaminants de 081574, Pallejà</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: D3, Vallirana</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 3 Consultoris</li>
            <li>- 2 estacions de contaminants de  083054, Vilafranca del Penedès</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Consultori</li>
            <li>- 1 estació de contaminants de 083054, Vilafranca del Penedès</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Consultori</li>
            <li>- 1 estació de contaminants de 083054, Vilafranca del Penedès</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Consultori</li>
            <li>- 1 estació contaminants de 083054, Vilafranca del Penedès</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Equip d&apos;Atenció Primària</li>
            <li>- 1 Punt d&apos;Atenció continuada</li>
            <li>- 2 estacions de contaminants de 081574, Pallejà</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: D3, Vallirana</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "El Pla del Penedès") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>081640, el Pla del Penedès</p>
          <ul>
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Consultori</li>
            <li>- 1 estació de contaminants de 083054, Vilafranca del Penedès</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "El Prat de Llobregat") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>081691, el Prat de Llobregat</p>
          <ul>
            <li>- 3 Equips d&apos;Atenció Primària</li>
            <li>- 1 Punt d&apos;Atenció continuada</li>
            <li>- 1 Atenció especialitzada</li>
            <li>- Unitat de salut laboral</li>
            <li>- SDPI</li>
            <li>- 1 estació de contaminants de 081691, el Prat de Llobregat</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: XL, El Prat de Llobregat </li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Consultori</li>
            <li>- 1 estació de contaminants de 082515, Santa Margarida i els Monjos</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 2 Equips d&apos;Atenció Primària</li>
            <li>- 1 estació de  contaminants de 083015, Viladecans</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: XL, El Prat de Llobregat </li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Consultori</li>
            <li>- 1 estació de contaminants de 083054, Vilafranca del Penedès</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Equip d&apos;Atenció Primària</li>
            <li>- 1 Punt d&apos;Atenció continuada</li>
            <li>- 1 estació de contaminants de 082634, Sant Vicenç dels Horts</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: XL, El Prat de Llobregat </li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Equip d&apos;Atenció Primària</li>
            <li>- 1 estació de contaminants de 081017, l&apos;Hospitalet de Llobregat</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: XL, El Prat de Llobregat </li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Equip d&apos;Atenció Primària</li>
            <li>- 1 estació de contaminants de 081017, l&apos;Hospitalet de Llobregat</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: XL, El Prat de Llobregat </li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Sant Llorenç d'Hortons") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>082227, Sant Llorenç d&apos;Hortons</p>
          <ul>
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 3 Consultoris</li>
            <li>- 1 estació de contaminants de 081141, Martorell</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: XC, Castellbisbal</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 3 Consultoris</li>
            <li>- 1 estació de contaminants de 082515, Santa Margarida i els Monjos</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Equip d&apos;Atenció Primària</li>
            <li>- 1 Consultori</li>
            <li>- 1 Punt d&apos;Atenció continuada</li>
            <li>- 2 estacions de contaminants de 083073, Vilanova i la Geltrú</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: UK, Sant Pere de Ribes - PN del Garraf</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Consultori</li>
            <li>- 1 estació de contaminants de 083054, Vilafranca del Penedès</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Consultori</li>
            <li>- 1 estació de contaminants de 083054, Vilafranca del Penedès</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Sant Sadurní d'Anoia") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>082401, Sant Sadurní d&apos;Anoia</p>
          <ul>
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Equip d&apos;Atenció Primària</li>
            <li>- 1 Punt d&apos;Atenció continuada</li>
            <li>- 1 estació de contaminants de 083054, Vilafranca del Penedès</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 2 Consultoris</li>
            <li>- 1 estació de contaminants de 082515, Santa Margarida i els Monjos</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: XU, Canyelles</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 2 Equips d&apos;Atenció Primària</li>
            <li>- 1 Consultori</li>
            <li>- CUAP</li>
            <li>- SDPI</li>
            <li>- 1 estació de  contaminants de 082634, Sant Vicenç dels Horts</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: D3, Vallirana</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Equip d&apos;Atenció Primària</li>
            <li>- 1 Punt d&apos;Atenció continuada</li>
            <li>- 3 estacions de contaminants de 083073, Vilanova i la Geltrú</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: YR, Vilanova i la Geltrú</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Consultori</li>
            <li>- 1 estació de contaminants de 083054, Vilafranca del Penedès</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Consultori</li>
            <li>- 1 estació de contaminants de 082515, Santa Margarida i els Monjos</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Equip d&apos;Atenció Primària</li>
            <li>- 1 Punt d&apos;Atenció continuada</li>
            <li>- 2 estacions de contaminants de 082634, Sant Vicenç dels Horts</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: D3, Vallirana</li>
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
            <li>- 1 Equip d&apos;Atenció Primària</li>
            <li>- 1 Punt d&apos;Atenció continuada</li>
            <li>- 1 estació de contaminants de 083015, Viladecans</li>
            <li>-  Agafa les dades de l&apos;estació meteorològica: UG, Viladecans</li>
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
            <li>- 1 Equip d&apos;Atenció Primària</li>
            <li>- Línea d&apos;atenció pediàtrica</li>
            <li>- Punt d&apos;atenció continuada</li>
            <li>- 1 estació de contaminants de 083054, Vilafranca del Penedès</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Consultori</li>
            <li>- 1 estació de contaminants de 083054, Vilafranca del Penedès</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
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
            <li>- 1 Equip d&apos;Atenció Primària</li>
            <li>- SDPI</li>
            <li>- 1 estació de contaminants de 083073, Vilanova i la Geltrú</li>
            <li>-  Agafa les dades de l&apos;estació meteorològica: YR, Vilanova i la Geltrú</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Sant Andreu de la Barca") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>081960, Sant Andreu de la Barca</p>
          <ul>
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Equip d&apos;Atenció Primària</li>
            <li>- 1 Consultori</li>
            <li>- CUAP</li>
            <li>- 1 estació de contaminants de 081960, Sant Andreu de la Barca</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: XC, Castellbisbal</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Sant Esteve Sesrovires") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>082080, Sant Esteve Sesrovires</p>
          <ul>
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Consultori</li>
            <li>- 1 estació de contaminants de 081141,Martorell</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: XC, Castellbisbal</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Castellví de Rosanes") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>080667, Castellví de Rosanes</p>
          <ul>
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Consultori</li>
            <li>- 1 estació de contaminants de 081141,Martorell</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: XC, Castellbisbal</li>
          </ul>
        </div>
      );
    }  
   if (selectedMunicipi === "Torrelles de Llobregat") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>082896, Torrelles de Llobregat</p>
          <ul>
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 1 Consultori</li>
            <li>- 1 estació de contaminants de 082634,Sant Vicenç dels Horts</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: D3, Vallirana</li>
          </ul>
        </div>
      );
    }
    if (selectedMunicipi === "Subirats") {
      return (
        <div className="additional-info ml-4">
          <h4 className="text-lg font-bold mt-4">Informació Addicional:</h4>
          <p>082732, Subirats</p>
          <ul>
          <li style={{ color: 'red', textAlign: 'center'}}>Compte! Aquest municipi no conté estacions de contaminació ni meteorològiques pròpies, les nostres prediccions poden no ser del tot acurades! </li>
            <li>- 3 Consultoris</li>
            <li>- 1 estació de contaminants de 083054, Vilafranca del Penedès</li>
            <li>- Agafa les dades de l&apos;estació meteorològica: W4, Vilafranca del Penedès - La Granada</li>
          </ul>
        </div>
      );
    }
    
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mx-auto relative">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-black dark:text-white pl-5 pr-5 pt-3">
          Distribució del nombre de pacients cada 10.000 habitants per municipis al 2023
          <span
            className="text-sm text-gray-400 cursor-pointer"
            onClick={toggleInfo}
          >
            {" "}
            +info
          </span>
        </h4>
      </div>
      <div className="flex justify-center">
      <VegaLite spec={spec} onNewView={handleNewView} />
      {infoVisible && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-4 w-64 h-54 rounded-lg shadow-lg"
          onClick={toggleInfo}
        >
          <p className="text-sm text-gray-800">
            Mapa dividit segons els municipis, on cada municipi està colorejat
            en funció del nombre de pacients registrats degut a malalties
            respiratòries cròniques al 2023, permetent així identificar fàcilment
            les àrees amb més casos, facilitant l&apos;anàlisi comparativa i la presa de
            decisions basada en dades.
          </p>
        </div>
      )}
    </div>
    </div>
  {renderAdditionalInfo()}
  <br></br>
  </div>
  );
};

export default Mapa;
