"use client";
import ChartThree from "./ChartThree";
import ChartTwo from "./ChartTwo";
import ChartTwoEdats from "./ChartTwoEdats";
import ChartOne from "./ChartOne";
import * as React from "react";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import * as Interfaces from "@/src/utils/interfaces";

const calculateTotalCasesBySex = (info: Interfaces.Cases[]) => {
  var totalCasesBySex = {
    male: 0,
    female: 0,
  };

  info.forEach((entry: Interfaces.Cases) => {
    if (entry.Sexe == "H") {
      totalCasesBySex.male += entry.NUMERO_CASOS.valueOf();
    } else if (entry.Sexe == "D") {
      totalCasesBySex.female += entry.NUMERO_CASOS.valueOf();
    }
  });
  return totalCasesBySex;
};

const calculateTotalCasesByDiagnostic = (info: Interfaces.Cases[]) => {
  var totalCasesByDiagnostic = {
    INFECCIONS_AGUDES_TRS: 0,
    BRONQUITIS_AGUDA: 0,
    GRIP: 0,
    BRONQUIOLITIS_AGUDA: 0,
    PNEUMONIA_BACTERIANA: 0,
    PNEUMONIA_VIRICA: 0,
  };

  info.forEach((entry: Interfaces.Cases) => {
    if (entry.DIAGNOSTIC == "INFECCIONS_AGUDES_TRS") {
      totalCasesByDiagnostic.INFECCIONS_AGUDES_TRS += entry.NUMERO_CASOS.valueOf();
    } else if (entry.DIAGNOSTIC == "BRONQUITIS_AGUDA") {
      totalCasesByDiagnostic.BRONQUITIS_AGUDA += entry.NUMERO_CASOS.valueOf();
    } else if (entry.DIAGNOSTIC == "GRIP") {
      totalCasesByDiagnostic.GRIP += entry.NUMERO_CASOS.valueOf();
    } else if (entry.DIAGNOSTIC == "BRONQUIOLITIS_AGUDA") {
      totalCasesByDiagnostic.BRONQUIOLITIS_AGUDA += entry.NUMERO_CASOS.valueOf();
    } else if (entry.DIAGNOSTIC == "PNEUMONIA_BACTERIANA") {
      totalCasesByDiagnostic.PNEUMONIA_BACTERIANA += entry.NUMERO_CASOS.valueOf();
    } else if (entry.DIAGNOSTIC == "PNEUMONIA_VIRICA") {
      totalCasesByDiagnostic.PNEUMONIA_VIRICA += entry.NUMERO_CASOS.valueOf();
    }
  });
  return {
    name: "Visites",
    data: [
      totalCasesByDiagnostic.INFECCIONS_AGUDES_TRS,
      totalCasesByDiagnostic.BRONQUITIS_AGUDA,
      totalCasesByDiagnostic.GRIP,
      totalCasesByDiagnostic.BRONQUIOLITIS_AGUDA,
      totalCasesByDiagnostic.PNEUMONIA_BACTERIANA,
      totalCasesByDiagnostic.PNEUMONIA_VIRICA
    ]
  };
  };

const calculateTotalCasesByEdats = (info: Interfaces.Cases1[]) => {
  var totalCasesByEdats = {
    de_15_44: 0,
    de_45_64: 0,
    de_65_74: 0,
    mes_75: 0,
    menys_15: 0,
  };
  
  info.forEach((entry: Interfaces.Cases1) => {
    if (entry.FranjaEdat == "15-44") {
      totalCasesByEdats.de_15_44 += entry.NUMERO_CASOS.valueOf();
    } else if (entry.FranjaEdat == "45-64") {
      totalCasesByEdats.de_45_64 += entry.NUMERO_CASOS.valueOf();
    } else if (entry.FranjaEdat == "65-74") {
      totalCasesByEdats.de_65_74 += entry.NUMERO_CASOS.valueOf();
    } else if (entry.FranjaEdat == ">75") {
      totalCasesByEdats.mes_75 += entry.NUMERO_CASOS.valueOf();
    } else if (entry.FranjaEdat == "<15") {
      totalCasesByEdats.menys_15 += entry.NUMERO_CASOS.valueOf();
    }
  });

  return {
    name: "Visites",
    data: [
      totalCasesByEdats.menys_15,
      totalCasesByEdats.de_15_44,
      totalCasesByEdats.de_45_64,
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
    const fetchData = async () => {
      try {
        const data = await getMongoCollection("visits");
        const visits = data && data.collection ? data.collection : undefined;
        const data1 = await getMongoCollection("edats");
        const edats = data1 && data1.collection ? data1.collection : undefined;
        if (visits !== undefined) {
          setInfo_ICS(calculateTotalCasesBySex(visits));
          setInfo2_ICS([calculateTotalCasesByDiagnostic(visits)]);
          setInfo3_ICS([calculateTotalCasesByEdats(edats)]);
        }
        setLoading(false);
      } catch (error) { 
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    // Este efecto se ejecutará cada vez que info2_ICS cambie
    console.log("Resultado de info3_ICS:", info3_ICS);
  }, [info3_ICS]);
  return (
    <>
      <h1>Malalties dinàmiques</h1>
      {loading && (
        <Box className="flex justify-center items-center h-96">
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <>
          <div className="flex center h-[26rem] py8">
            <ChartThree series={info_ICS} />
            <div className="flex-grow" />
            <ChartTwo series={info2_ICS} />
            <ChartTwoEdats series={info3_ICS} />
          </div>
          <div className="py-2" />
          <div>
            <ChartOne />
          </div>
          <div className="py-2" />
        </>
      )}
    </>
  );
};

export default HomePage;