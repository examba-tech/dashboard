"use client"
import React from "react";
import ChartThree from "./ChartThree";
import ChartTwo from "./ChartTwo";
import ChartTwoEdats from "./ChartTwoEdats";
import ChartOne from "./ChartOne";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import * as Interfaces from "@/src/utils/interfaces";
import MyLineChart from "@/src/components/charts/line_chart";
import Filters from "@/src/app/dashboard/malalties_dinamiques/filters";
import MapaOne from "./Mapa";
import Waterfall from "@/src/components/charts/waterfall_comparativa_meses";

const calculateTotalCasesBySex = (info: Interfaces.Cases[], selectedDiagnostic: string | null) => {
  var totalCasesBySex = {
    male: 0,
    female: 0,
  };

  info.forEach((entry: Interfaces.Cases) => {
    // Aplicar filtro por diagnóstico si está seleccionado
    if (selectedDiagnostic && entry.DIAGNOSTIC !== selectedDiagnostic) {
      return; // Si hay un diagnóstico seleccionado y no coincide con el de la entrada, salta esta iteración
    }

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


const calcularVisitasPorDia2023 = (visitas: Interfaces.Cases[]) => {
  var visitasPorDia: { [key: string]: number } = {};
  
  visitas.forEach((visita: Interfaces.Cases) => {
    const fecha = new Date(visita["Data Alta Problema"]);
    const year = fecha.getFullYear();
  
    // Verificar si el año es 2023
    if (year === 2023) {
      const fechaClave = fecha.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
  
      // Si la fecha no existe en el diccionario, inicializar a 0
      if (!visitasPorDia[fechaClave]) {
        visitasPorDia[fechaClave] = 0;
      }
  
      // Sumar el número de casos a la fecha correspondiente
      visitasPorDia[fechaClave] += visita.NUMERO_CASOS;
    }
  });
  
  // Convertir el diccionario en un array de objetos con fecha y cantidad de visitas
  return Object.keys(visitasPorDia).map(date => ({
    date: date,
    o: visitasPorDia[date]
  }));
};

interface Visit {
  _id: { $oid: string };
  Sexe: string;
  'Data Alta Problema': Date;
  DIAGNOSTIC: string;
  NUMERO_CASOS: number;
}

const calculateTotalCasesByMonth = (visits: Visit[]) => {
const monthlyData: { [key: string]: { last_year: number } } = {};
const last_year = 2023;

visits.forEach((visit: Visit) => {
  const date = new Date(visit["Data Alta Problema"]);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

if (year === last_year) {
  const key = `${month}`;

if (!monthlyData[key]) {
  monthlyData[key] = { last_year: 0 };
  }

monthlyData[key].last_year += visit.NUMERO_CASOS;
}
});

  return Object.entries(monthlyData).map(([month, data]) => ({
    name: `Month ${month}`,
    last_year: data.last_year,
  }));
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

  const [visits, setVisits] = React.useState<{
    date: string
    o: number
  }[]>([]);

  const [selectedDiagnostic, setSelectedDiagnostic] = React.useState<string | null>(null);

  // Función para manejar el cambio de diagnóstico seleccionado
  const handleDiagnosticChange = (diagnostic: string) => {
    setSelectedDiagnostic(diagnostic);
  };

  const [average, setAverage] = React.useState(0);
  const [visits1, setVisits1] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMongoCollection("visits");
        const visits = data && data.collection ? data.collection : undefined;
        const data1 = await getMongoCollection("edats");
        const edats = data1 && data1.collection ? data1.collection : undefined;
        if (visits !== undefined) {
          setInfo_ICS(calculateTotalCasesBySex(visits, selectedDiagnostic));
          setInfo2_ICS([calculateTotalCasesByDiagnostic(visits)]);
          setInfo3_ICS([calculateTotalCasesByEdats(edats)]);
          setVisits(calcularVisitasPorDia2023(visits));
          setVisits(calcularVisitasPorDia2023(visits));
          setVisits1(visits);
        }
        setLoading(false);
      } catch (error) { 
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDiagnostic]);
  
  React.useEffect(() => {
    if (visits1.length > 0) {
      const monthlyData = calculateTotalCasesByMonth(visits1);
      const totalCasesThisYear = monthlyData.reduce((acc, curr) => acc + curr.last_year, 0);
      const average = totalCasesThisYear / 12;
      setAverage(average);
    }
  }, [visits]);

  return (
    <>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Patologies Agudes</h1>
      {loading && (
        <Box className="flex justify-center items-center h-96">
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <>
        <Filters
            selectedDiagnostic={selectedDiagnostic}
            onDiagnosticChange={handleDiagnosticChange}
          />

        <div style={{ marginTop: '50px' }}></div>
        <div className="flex justify-center items-center h-[26rem] gap-4">
          <div className="flex-1 flex justify-center items-center">
            <ChartOne />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <MyLineChart visits={visits} />
          </div>
        </div>
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
        <div className="flex justify-center items-center h-[26rem] gap-4">
          <div className="flex-1 flex justify-center items-center">
          <Waterfall data={calculateTotalCasesByMonth(visits1)} average={average} />
          </div>
          <div className="flex-1 flex justify-center items-center">
          <MapaOne />
          </div>
        </div>
      </>
      
      )}
    </>
  );
};

export default HomePage;