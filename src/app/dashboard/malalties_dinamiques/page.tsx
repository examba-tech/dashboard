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
import Filters_municipi from "@/src/app/dashboard/malalties_dinamiques/filter_municipi";
import Waterfall from "@/src/components/charts/waterfall_comparativa_meses";

const calculateTotalCasesBySex = (
  info: Interfaces.Cases[],
  selectedDiagnostic: string
) => {
  var totalCasesBySex = {
    male: 0,
    female: 0,
  };

  info.forEach((entry: Interfaces.Dinamic) => {
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

const calculateTotalCasesByDiagnostic = (info: Interfaces.Dinamic[]) => {
  var totalCasesByDiagnostic = {
    INFECCIONS_AGUDES_TRS: 0,
    BRONQUITIS_AGUDA: 0,
    GRIP: 0,
    BRONQUIOLITIS_AGUDA: 0,
    PNEUMONIA_BACTERIANA: 0,
    PNEUMONIA_VIRICA: 0,
  };

  info.forEach((entry: Interfaces.Dinamic) => {
    if (entry.DIAGNOSTIC == "INFECCIONS_AGUDES_TRS") {
      totalCasesByDiagnostic.INFECCIONS_AGUDES_TRS +=
        entry.NUMERO_CASOS.valueOf();
    } else if (entry.DIAGNOSTIC == "BRONQUITIS_AGUDA") {
      totalCasesByDiagnostic.BRONQUITIS_AGUDA += entry.NUMERO_CASOS.valueOf();
    } else if (entry.DIAGNOSTIC == "GRIP") {
      totalCasesByDiagnostic.GRIP += entry.NUMERO_CASOS.valueOf();
    } else if (entry.DIAGNOSTIC == "BRONQUIOLITIS_AGUDA") {
      totalCasesByDiagnostic.BRONQUIOLITIS_AGUDA +=
        entry.NUMERO_CASOS.valueOf();
    } else if (entry.DIAGNOSTIC == "PNEUMONIA_BACTERIANA") {
      totalCasesByDiagnostic.PNEUMONIA_BACTERIANA +=
        entry.NUMERO_CASOS.valueOf();
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

const calculateTotalCasesByEdats = (info: Interfaces.Dinamic[], selectedDiagnostic: string) => {
  var totalCasesByEdats = {
    de_15_44: 0,
    de_45_64: 0,
    de_65_74: 0,
    mes_75: 0,
    menys_15: 0,
  };

  info.forEach((entry: Interfaces.Dinamic) => {
    if (selectedDiagnostic && entry.DIAGNOSTIC !== selectedDiagnostic) {
      return; // Si hay un diagnóstico seleccionado y no coincide con el de la entrada, salta esta iteración
    }
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




const calculateTotalCasesByWeek = (dinamics: Interfaces.Dinamic[]) => {
  const weeklyData: { [key: string]: number } = {};
  const lastYear = "2023";

  dinamics.forEach((entry: Interfaces.Dinamic) => {
    const [week, , year] = entry.DATA_SETMANA.split("-").map(Number);

    if (year === parseInt(lastYear)) {
      if (!weeklyData[week]) {
        weeklyData[week] = 0;
      }

      weeklyData[week] += Number(entry.NUMERO_CASOS);
    }
  });

  // Convertir el objeto semanal en un array de objetos
  return Object.keys(weeklyData).map((week) => ({
    name: `Week ${week}`,
    data: [weeklyData[week]],
  }));
};


const calculateTotalCasesByMonth = (dinamics: Interfaces.Dinamic[], selectedDiagnostic: string) => {
  const monthlyData: { [key: string]: { last_year: number } } = {};
  const last_year = 2023;

  dinamics.forEach((entry: Interfaces.Dinamic) => {
    if (selectedDiagnostic && entry.DIAGNOSTIC !== selectedDiagnostic) {
      return; // Si hay un diagnóstico seleccionado y no coincide con el de la entrada, salta esta iteración
    }

    const dateParts = entry.DATA_SETMANA.split("-");
    const month = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);

    if (year === last_year) {
      const key = `${month}`;

      if (!monthlyData[key]) {
        monthlyData[key] = { last_year: 0 };
      }

      monthlyData[key].last_year += Number(entry.NUMERO_CASOS);
    }
  });

  return Object.entries(monthlyData).map(([month, data]) => ({
    name: `Month ${month}`,
    last_year: data.last_year,
  }));
    

const filterByDay = (info: Interfaces.Prediccions[]) => {
  var totalCasesByDay = {
    dia1: 0,
    dia2: 0,
    dia3: 0,
    dia4: 0,
    dia5: 0,
    dia6: 0,
    dia7: 0
  };
  info.forEach((entry: Interfaces.Prediccions) => {
    if ((entry.DIA == 25) && (entry.MES=12)) {
      totalCasesByDay.dia1 = entry.INGRESSOS_AVG.valueOf();
    } else if ((entry.DIA == 26) && (entry.MES=12)) {
      totalCasesByDay.dia2 = entry.INGRESSOS_AVG.valueOf();
    } else if ((entry.DIA == 27) && (entry.MES=12)) {
      totalCasesByDay.dia3 = entry.INGRESSOS_AVG.valueOf();
    } else if ((entry.DIA == 28) && (entry.MES=12)) {
      totalCasesByDay.dia4 = entry.INGRESSOS_AVG.valueOf();
    } else if ((entry.DIA == 29) && (entry.MES=12)) {
      totalCasesByDay.dia5 = entry.INGRESSOS_AVG.valueOf();
    } else if ((entry.DIA == 30) && (entry.MES=12)) {
      totalCasesByDay.dia6 = entry.INGRESSOS_AVG.valueOf();
    } else if ((entry.DIA == 31) && (entry.MES=12)) {
      totalCasesByDay.dia7 = entry.INGRESSOS_AVG.valueOf();
    } 
  });
  return {
    name: "Prediccions",
    data: [
      totalCasesByDay.dia1,
      totalCasesByDay.dia2,
      totalCasesByDay.dia3,
      totalCasesByDay.dia4,
      totalCasesByDay.dia5,
      totalCasesByDay.dia6,
      totalCasesByDay.dia7,
    ],
  };
};

const HomePage = () => {
  const [info_ICS, setInfo_ICS] = React.useState<{
    male: number;
    female: number;
  }>({ male: 0, female: 0 });
  const [loading, setLoading] = React.useState(true);

  const [info2_ICS, setInfo2_ICS] = React.useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);

  const [info3_ICS, setInfo3_ICS] = React.useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);

  const [prediccions, setPrediccions] = React.useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);

  const [visits, setVisits] = React.useState<{
    name: string;
    data: number[]
  }[]>([]);

  const [visits_month, setVisits_Month] = React.useState<any[]>([]);

  const [average, setAverage] = React.useState(0);

  const [selectedDiagnostic, setSelectedDiagnostic] = React.useState<string>("GRIP"); // Valor predeterminado
  // Función para manejar el cambio de diagnóstico seleccionado
  const handleDiagnosticChange = (diagnostic: string) => {
    setSelectedDiagnostic(diagnostic);
  };

  const [selectedMunicipi, setSelectedMunicipi] = React.useState<string>("Collbató"); // Valor predeterminado
  // Función para manejar el cambio de diagnóstico seleccionado
  const handleMunicipiChange = (municipi: string) => {
    setSelectedMunicipi(municipi);
  };

  React.useEffect(() => {
    const params = {
      CODI_MUNICIPAL: "80898",
    };
    const fetchData = async () => {
      try {

        const data_full = await getMongoCollection("dinamics", params);
        const dinamics = data_full && data_full.collection ? data_full.collection : undefined;
        if (dinamics !== undefined) {
          setInfo_ICS(calculateTotalCasesBySex(dinamics, selectedDiagnostic));
          setInfo2_ICS([calculateTotalCasesByDiagnostic(dinamics)]);
          setInfo3_ICS([calculateTotalCasesByEdats(dinamics, selectedDiagnostic)]);
          setVisits(calculateTotalCasesByWeek(dinamics));
          setVisits_Month(dinamics);
          const monthlyData = calculateTotalCasesByMonth(dinamics, selectedDiagnostic);
          console.log(visits);
          const totalCasesThisYear = monthlyData.reduce((acc, curr) => acc + curr.last_year, 0);
          const average = totalCasesThisYear / 12;
          setAverage(average);
        }    
        const data2 = await getMongoCollection("prediccions",params);
        const prediccions = data2 && data2.collection ? data2.collection : undefined;
  
        setLoading(false);
        if (prediccions !== undefined) {
          setPrediccions([filterByDay(prediccions)]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [visits_month, visits, selectedDiagnostic, selectedMunicipi]);

  return (
    <>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Patologies Agudes
      </h1>
      {loading && (
        <Box className="flex justify-center items-center h-96">
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <>
        <Filters_municipi
            selectedMunicipi={selectedMunicipi}
            onMunicipiChange={handleMunicipiChange}
          />
        <div style={{ marginTop: '50px' }}></div>
        <div className="flex justify-center items-center h-[26rem] gap-4">
          <div className="flex-1 flex justify-center items-center">
            <ChartOne series={prediccions}/>
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
            <ChartTwo series={info2_ICS} selectedDiagnostic={selectedDiagnostic}/>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <ChartTwoEdats series={info3_ICS} />
          </div>
        </div>
        <Filters
            selectedDiagnostic={selectedDiagnostic}
            onDiagnosticChange={handleDiagnosticChange}
          />
        <br></br>
        <div className="flex justify-center items-center h-[26rem] gap-4">
          <div className="flex-1 flex justify-center items-center">
          <Waterfall data={calculateTotalCasesByMonth(visits_month, selectedDiagnostic)} average={average} />
           </div>
         </div>
        </>
      )}
    </>
  );
};

export default HomePage;
