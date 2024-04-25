
"use client"
/*import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";
*/
import ChartThree from "./ChartThree";
import React from "react";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";

interface CaseEntry {
  index: number,
  'Codi Postal': String,
  Sexe: String,
  FranjaEdat: String,
  'Data Alta Problema': Date,
  DIAGNOSTIC: String,
  NUMERO_CASOS: number
}

// Función para calcular el recuento total de casos por sexo
const calculateTotalCasesBySex = (info:CaseEntry[]) => {
  const totalCasesBySex = {
    male: 0,
    female: 0
  };

  info.forEach((entry:CaseEntry) => {
    if (entry.Sexe === 'H') {
      totalCasesBySex.male += entry.NUMERO_CASOS;
    } else if (entry.Sexe === 'D') {
      totalCasesBySex.female += entry.NUMERO_CASOS;
    }
  });

  return totalCasesBySex;
};

const HomePage = () => {
  const [master, setMaster] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMongoCollection("master");
        setMaster(data && data.collection ? data.collection : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const info_ICS = calculateTotalCasesBySex(master);

  return (
    <div>
    <h1>Malalties dinàmiques</h1>
    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartThree info_ICS = {info_ICS}/>
      </div>
    </div>
  );
};

export default HomePage;

