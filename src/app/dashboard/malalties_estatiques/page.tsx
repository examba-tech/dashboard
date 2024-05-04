"use client";
import ChartThree from "./ChartThree";
import ChartTwo from "./ChartTwo";
import ChartTwoEdats from "./ChartTwoEdats";
//import MapaOne from "./Mapa";
import * as React from "react";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import * as Interfaces from "@/src/utils/interfaces";

const calculateTotalCasesBySex = (info: Interfaces.Estatiques[]) => {
  var totalCasesBySex = {
    male: 0,
    female: 0,
  };

  info.forEach((entry: Interfaces.Estatiques) => {
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

const calculateTotalCasesByEdats = (info: Interfaces.Estatiques[]) => {
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

  React.useEffect(() => {
    const params = {
    };
    const fetchData = async () => {
      try {
        const data = await getMongoCollection("estatics", params);
        console.log("ZZZZZZZZZZZZ");
        console.log("Data from MongoDB:", data);
        const estatics = data && data.collection ? data.collection : undefined;
        console.log("Bbbbbbbbbbbbbbb");
        console.log("Data from MongoDB:", estatics);
        // const data1 = await getMongoCollection("edats");
        // const edats = data1 && data1.collection ? data1.collection : undefined;
        if (estatics !== undefined) {
          setInfo_ICS(calculateTotalCasesBySex(estatics));
          setInfo2_ICS([calculateTotalCasesByDiagnostic(estatics)]);
          setInfo3_ICS([calculateTotalCasesByEdats(estatics)]);
        }
        setLoading(false);
      } catch (error) { 
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("Aaaaaaaaaaaaaaaaaaa");
  console.log("info_ICS:", info_ICS);
  console.log("info2_ICS:", info2_ICS);
  console.log("info3_ICS:", info3_ICS);

  return (
    <>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Malalties de Prevalença</h1>
      {loading && (
        <Box className="flex justify-center items-center h-96">
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <>
        <div style={{ marginTop: '50px' }}></div>
        <div className="flex justify-center items-center h-[26rem] gap-4" style={{ transform: 'scale(0.8)' }}>
          <div className="flex-1 flex justify-center items-center">
            <ChartThree series={info_ICS} />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <ChartTwo series={info2_ICS} />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <ChartTwoEdats series={info3_ICS} />
          </div>
        </div>
      </>
      )}
    </>
  );
};

export default HomePage;