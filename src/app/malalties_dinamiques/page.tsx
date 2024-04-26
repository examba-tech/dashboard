"use client";
import ChartThree from "./ChartThree";
import * as React from "react";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";

interface CaseEntry {
  CODI_MUNICIPAL: String,
  Sexe: String,
  FranjaEdat: String,
  'Data Alta Problema': Date,
  NUMERO_CASOS: number
}

// Función para calcular el recuento total de casos por sexo
const calculateTotalCasesBySex = (info: CaseEntry[]) => {
  const totalCasesBySex = {
    male: 0,
    female: 0,
  };

  info.forEach((entry: CaseEntry) => {
    if (entry.Sexe === 'H') {
      totalCasesBySex.male += entry.NUMERO_CASOS;
    } else if (entry.Sexe === 'D') {
      totalCasesBySex.female += entry.NUMERO_CASOS;
    }
  });

  return totalCasesBySex;
};

const HomePage = () => {
  const [info_ics, setInfo] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getMongoCollection("Genere");
      setInfo(data && data.collection ? data.collection : []);
    };
    fetchData();
  }, []);

  const info_ICS = calculateTotalCasesBySex(info_ics);

  return (
    <div>
      <h1>Malalties dinàmiques</h1>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartThree info_ICS={info_ICS} />
      </div>
    </div>
  );
};

export default HomePage;
