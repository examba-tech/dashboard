
import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";
import ChartThree from "./ChartThree";
import React from "react";

const getInfo = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Infos", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

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

const HomePage = async() => {
  const data = await getInfo();
  const infos = data && data.info_ICS ? data.info_ICS : []
  const info_ICS = calculateTotalCasesBySex(infos);
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

