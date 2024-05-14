"use client";
import ChartThree from "./ChartThree";
import ChartTwo from "./ChartTwo";
import ChartTwoEdats from "./ChartTwoEdats";
//import MapaOne from "./Mapa";
import React, { useState } from "react";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import * as Interfaces from "@/src/utils/interfaces";
import Mapa from "./Mapa";
import Mapa_cont from "./Mapa_cont";
import Filter_diagnostic from "@/src/app/dashboard/malalties_estatiques/filter_diagnostic";

const calculateTotalCasesBySex = (info: Interfaces.Estatiques[], selectedDiagnostic: string) => {
  var totalCasesBySex = {
    male: 0,
    female: 0,
  };

  info.forEach((entry: Interfaces.Estatiques) => {
    if (selectedDiagnostic && entry.DIAGNOSTIC !== selectedDiagnostic) {
      return; // Si hay un diagnóstico seleccionado y no coincide con el de la entrada, salta esta iteración
    }

    if (entry.Sexe == "H") {
      totalCasesBySex.male += entry.Numero_Casos.valueOf();
    } else if (entry.Sexe == "D") {
      totalCasesBySex.female += entry.Numero_Casos.valueOf();
    }
  });
  return totalCasesBySex;
};

const calculateTotalCasesByDiagnostic = (info: Interfaces.Estatiques[]) => {
  var totalCasesByDiagnostic = {
    ASMA: 0,
    BRONQUITIS_CRONICA: 0,
    MPOC_MIXTE: 0,
    BRONQUIECTASIES: 0,
    OTHER: 0,
    NEOPLASIA_PULMONAR: 0,
    ENFISEMA: 0,
    FIBROSI_PULMONAR: 0,
    AGENTS_EXTERNS: 0,
  };

  info.forEach((entry: Interfaces.Estatiques) => {
    if (entry.DIAGNOSTIC == "ASMA") {
      totalCasesByDiagnostic.ASMA += entry.Numero_Casos.valueOf();
    } else if (entry.DIAGNOSTIC == "BRONQUITIS_CRONICA") {
      totalCasesByDiagnostic.BRONQUITIS_CRONICA += entry.Numero_Casos.valueOf();
    } else if (entry.DIAGNOSTIC == "MPOC_MIXTE") {
      totalCasesByDiagnostic.MPOC_MIXTE += entry.Numero_Casos.valueOf();
    } else if (entry.DIAGNOSTIC == "BRONQUIECTASIES") {
      totalCasesByDiagnostic.BRONQUIECTASIES += entry.Numero_Casos.valueOf();
    } else if (entry.DIAGNOSTIC == "OTHER") {
      totalCasesByDiagnostic.OTHER += entry.Numero_Casos.valueOf();
    } else if (entry.DIAGNOSTIC == "NEOPLASIA_PULMONAR") {
      totalCasesByDiagnostic.NEOPLASIA_PULMONAR += entry.Numero_Casos.valueOf();
    } else if (entry.DIAGNOSTIC == "ENFISEMA") {
      totalCasesByDiagnostic.ENFISEMA += entry.Numero_Casos.valueOf();
    } else if (entry.DIAGNOSTIC == "FIBROSI_PULMONAR") {
      totalCasesByDiagnostic.FIBROSI_PULMONAR += entry.Numero_Casos.valueOf();
    }  else if (entry.DIAGNOSTIC == "AGENTS_EXTERNS") {
        totalCasesByDiagnostic.AGENTS_EXTERNS += entry.Numero_Casos.valueOf();
    }
  });
  return {
    name: "Visites",
    data: [
      totalCasesByDiagnostic.ASMA,
      totalCasesByDiagnostic.BRONQUITIS_CRONICA,
      totalCasesByDiagnostic.MPOC_MIXTE,
      totalCasesByDiagnostic.BRONQUIECTASIES,
      totalCasesByDiagnostic.OTHER,
      totalCasesByDiagnostic.NEOPLASIA_PULMONAR,
      totalCasesByDiagnostic.ENFISEMA,
      totalCasesByDiagnostic.FIBROSI_PULMONAR,
      totalCasesByDiagnostic.AGENTS_EXTERNS
    ]
  };
  };

const calculateTotalCasesByEdats = (info: Interfaces.Estatiques[], selectedDiagnostic: string) => {
  var totalCasesByEdats = {
    menys_5: 0,
    de_5_9: 0,
    de_10_14: 0,
    de_15_17: 0,
    de_18_24: 0,
    de_25_34: 0,
    de_35_44: 0,
    de_45_54: 0,
    de_55_64: 0,
    de_65_74: 0,
    mes_75: 0,
  };
  
  info.forEach((entry: Interfaces.Estatiques) => {
    if (selectedDiagnostic && entry.DIAGNOSTIC !== selectedDiagnostic) {
      return; // Si hay un diagnóstico seleccionado y no coincide con el de la entrada, salta esta iteración
    }
    if (entry.FranjaEdat == "<5") {
      totalCasesByEdats.menys_5 += entry.Numero_Casos.valueOf();
    } else if (entry.FranjaEdat == "5-9") {
      totalCasesByEdats.de_5_9 += entry.Numero_Casos.valueOf();
    } else if (entry.FranjaEdat == "10-14") {
      totalCasesByEdats.de_10_14 += entry.Numero_Casos.valueOf();
    } else if (entry.FranjaEdat == "15-17") {
      totalCasesByEdats.de_15_17 += entry.Numero_Casos.valueOf();
    } else if (entry.FranjaEdat == "18-24") {
      totalCasesByEdats.de_18_24 += entry.Numero_Casos.valueOf();
    } else if (entry.FranjaEdat == "25-34") {
      totalCasesByEdats.de_25_34 += entry.Numero_Casos.valueOf();
    } else if (entry.FranjaEdat == "35-44") {
      totalCasesByEdats.de_35_44 += entry.Numero_Casos.valueOf();
    } else if (entry.FranjaEdat == "45-54") {
      totalCasesByEdats.de_45_54 += entry.Numero_Casos.valueOf();
    } else if (entry.FranjaEdat == "55-64") {
      totalCasesByEdats.de_55_64 += entry.Numero_Casos.valueOf();
    } else if (entry.FranjaEdat == "65-74") {
      totalCasesByEdats.de_65_74 += entry.Numero_Casos.valueOf();
    } else if (entry.FranjaEdat == "75+") {
      totalCasesByEdats.mes_75 += entry.Numero_Casos.valueOf();
    }
  });

  return {
    name: "Visites",
    data: [
      totalCasesByEdats.menys_5,
      totalCasesByEdats.de_5_9,
      totalCasesByEdats.de_10_14,
      totalCasesByEdats.de_15_17,
      totalCasesByEdats.de_18_24,
      totalCasesByEdats.de_25_34,
      totalCasesByEdats.de_35_44,
      totalCasesByEdats.de_45_54,
      totalCasesByEdats.de_55_64,
      totalCasesByEdats.de_65_74,
      totalCasesByEdats.mes_75,
      ]
  };
  };


const HomePage = () => {
  const [info_ICS, setInfo_ICS] = React.useState<{
    male: number;
    female: number;
  }>({ male: 0, female: 0 });
  const [loading, setLoading] = React.useState(true);

  const [info2_ICS, setInfo2_ICS] = React.useState<{
    name: string;
    data: number[]
  }[]>([]);

  const [info3_ICS, setInfo3_ICS] = React.useState<{
    name: string;
    data: number[]
  }[]>([]);

  const [mapa_casos, set_mapa_casos] = React.useState<{
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
  }[]>([]);

  const [selectedDiagnostic, setSelectedDiagnostic] = React.useState<string>("ASMA"); // Valor predeterminado
// Función para manejar el cambio de diagnóstico seleccionado
  const handleDiagnosticChange = (diagnostic: string) => {
  setSelectedDiagnostic(diagnostic);
};

  React.useEffect(() => {
    const params = {

    };
    const fetchData = async () => {
      try {
        const data = await getMongoCollection("estatics", params);
        const data1 = await getMongoCollection("mapas", params);
        const estatics = data && data.collection ? data.collection : undefined;
        const mapaestatics = data1 && data1.collection ? data1.collection : undefined;

        if (estatics !== undefined) {
          setInfo_ICS(calculateTotalCasesBySex(estatics, selectedDiagnostic));
          setInfo2_ICS([calculateTotalCasesByDiagnostic(estatics)]);
          setInfo3_ICS([calculateTotalCasesByEdats(estatics, selectedDiagnostic)]);
          set_mapa_casos(mapaestatics)
        }
        setLoading(false);
      } catch (error) { 
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDiagnostic]);

  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

  return (
    <>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Malalties de Prevalença
        {infoVisible && (
                <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 w-64 h-54 rounded-lg shadow-lg"
                onClick={toggleInfo}
                style={{ marginLeft: "25px" }}
                >
                  <p className="text-sm text-gray-800 px-4 py-2 text-center">
                  En aquesta secció es realitza un estudi sobre les malalties de prevalença, les quals són presents en una població durant un període de temps específic. Es defineix per la quantitat total de persones que tenen la malaltia en un moment determinat en relació amb el nombre total de persones en aquella població. En el nostre cas, la variable temporal no la considerem sinó que ens enfoquem més en la comparativa i en la correlació que pugui haver entre les variables. Ens hem centrat en les següents 7 malalties: Asma, Bronquitis Crònica, MPOC Mixte (Malaltia Pulmonar Obstructiva Crònica), Bronquiectàsies, Emfisema, Neoplàsia Pulmonar i Fibrosi Pulmonar.
                  </p>
                </div>
              )}
            <span
                  className="text-sm text-gray-400 cursor-pointer"
                  onClick={toggleInfo}
                >
                  {" "}
                  +info
                </span>
        </h1>
      {loading && (
        <Box className="flex justify-center items-center h-96">
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <>
        <br></br>
        <br></br>
        <br></br>
        <div className="flex justify-center items-center gap-4">
          <div className="flex-1 flex flex-col justify-center items-center">
          <Mapa predictions={mapa_casos} />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
          <Mapa_cont predictions={mapa_casos} />
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="flex items-center gap-4">
            <Filter_diagnostic
              selectedDiagnostic={selectedDiagnostic}
              onDiagnosticChange={handleDiagnosticChange}
            />
          </div>
        <div className="flex justify-center items-center gap-4" style={{ transform: 'scale(0.8)' }}>
          <div className="flex-1 flex flex-col justify-center items-center">
            <ChartTwo series={info2_ICS} />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <ChartThree series={info_ICS} />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <ChartTwoEdats series={info3_ICS} />
          </div>
        </div>
      </>
      )}
    </>
  );
};

export default HomePage;