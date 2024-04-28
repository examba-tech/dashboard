"use client";
import ChartThree from "./ChartThree";
import ChartTwo from "./ChartTwo";
import ChartOne from "./ChartOne";
import * as React from "react";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MasterTable from "@/src/components/tables/master_table/main";

interface CaseEntry {
  Sexe: String;
  "Data Alta Problema": Date;
  DIAGNOSTIC: String;
  NUMERO_CASOS: Number;
}

// Función para calcular el recuento total de casos por sexo
var calculateTotalCasesBySex = (info: CaseEntry[]) => {
  var totalCasesBySex = {
    male: 0,
    female: 0,
  };

  info.forEach((entry: CaseEntry) => {
    if (entry.Sexe == "H") {
      totalCasesBySex.male += entry.NUMERO_CASOS.valueOf();
    } else if (entry.Sexe == "D") {
      totalCasesBySex.female += entry.NUMERO_CASOS.valueOf();
    }
  });
  return totalCasesBySex;
};

const HomePage = () => {
  const [visits, setVisit] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      console.log("Iniciando la obtención de datos...");
      try {
        const data = await getMongoCollection("visits");
        setVisit(data && data.collection ? data.collection : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const info_ICS = calculateTotalCasesBySex(visits);

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
            <ChartTwo />
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
