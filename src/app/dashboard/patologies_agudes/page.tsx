"use client";
import React, { useState } from "react";
import Link from "next/link";
import ChartThree from "./ChartThree";
import Mapa from "./Mapa";
import ChartTwo from "./ChartTwo";
import ChartTwoEdats from "./ChartTwoEdats";
//import ChartOne from "./ChartOne";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import * as Interfaces from "@/src/utils/interfaces";
import MyLineChart from "@/src/components/charts/line_chart";
import MyLineChart1 from "@/src/components/charts/line_chart_SO";
import LineChartNO2 from "@/src/components/charts/line_chart_NO2";
import Filters from "@/src/app/dashboard/patologies_agudes/filters";
import Filters_municipi from "@/src/app/dashboard/patologies_agudes/filter_municipi";
import Waterfall from "@/src/components/charts/waterfall_comparativa_meses";
import SimpleChart from "./cuadro_preds";
import BulletChart_NO2 from "@/src/components/charts/bullet_chart_NO2";
import BulletChart_SO2 from "@/src/components/charts/bullet_chart_SO2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { set } from "mongoose";

const calculateTotalCasesBySex = (
  info: Interfaces.Dinamic[],
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
      totalCasesByDiagnostic.PNEUMONIA_VIRICA,
    ],
  };
};

const calculateTotalCasesByEdats = (
  info: Interfaces.Dinamic[],
  selectedDiagnostic: string
) => {
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
    ],
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

  const result = Object.keys(weeklyData).map((week) => ({
    name: `Setmana ${week}`,
    data: [weeklyData[week]],
  }));

  result.pop();

  return result;
};

const calculateTotalCasesByWeekSos = (dinamics: Interfaces.Dinamic[]) => {
  const weeklyData: { [key: string]: number } = {};
  const i: { [key: string]: number } = {};
  const lastYear = "2023";

  dinamics.forEach((entry: Interfaces.Dinamic) => {
    const [week, , year] = entry.DATA_SETMANA.split("-").map(Number);

    if (year === parseInt(lastYear)) {
      if (!weeklyData[week]) {
        weeklyData[week] = 0;
        i[week] = 0;
      }
      i[week] += 1;
      weeklyData[week] += Number(entry.SO2);
    }
  });

  // Convertir el objeto semanal en un array de objetos
  return Object.keys(weeklyData).map((week) => ({
    name: `Setmana${week}`,
    data: [weeklyData[week] / i[week]],
  }));
};

const calculateTotalCasesByWeekNos = (dinamics: Interfaces.Dinamic[]) => {
  const weeklyData: { [key: string]: number } = {};
  const i: { [key: string]: number } = {};
  const lastYear = "2023";

  dinamics.forEach((entry: Interfaces.Dinamic) => {
    const [week, , year] = entry.DATA_SETMANA.split("-").map(Number);

    if (year === parseInt(lastYear)) {
      if (!weeklyData[week]) {
        weeklyData[week] = 0;
        i[week] = 0;
      }
      i[week] += 1;
      weeklyData[week] += Number(entry.NO2);
    }
  });

  // Convertir el objeto semanal en un array de objetos
  return Object.keys(weeklyData).map((week) => ({
    name: `Setmana${week}`,
    data: [weeklyData[week] / i[week]],
  }));
};

const calculateTotalCasesByMonth = (
  dinamics: Interfaces.Dinamic[],
  selectedDiagnostic: string
) => {
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
};

const filterByDay = (info: Interfaces.Prediccions[]) => {
  var totalCasesByDay = {
    dia1: 0,
    dia2: 0,
    dia3: 0,
    dia4: 0,
    dia5: 0,
    dia6: 0,
    dia7: 0,
  };
  info.forEach((entry: Interfaces.Prediccions) => {
    if (entry.DIA == 25 && (entry.MES = 12)) {
      totalCasesByDay.dia1 = entry.INGRESSOS_AVG.valueOf();
    } else if (entry.DIA == 26 && (entry.MES = 12)) {
      totalCasesByDay.dia2 = entry.INGRESSOS_AVG.valueOf();
    } else if (entry.DIA == 27 && (entry.MES = 12)) {
      totalCasesByDay.dia3 = entry.INGRESSOS_AVG.valueOf();
    } else if (entry.DIA == 28 && (entry.MES = 12)) {
      totalCasesByDay.dia4 = entry.INGRESSOS_AVG.valueOf();
    } else if (entry.DIA == 29 && (entry.MES = 12)) {
      totalCasesByDay.dia5 = entry.INGRESSOS_AVG.valueOf();
    } else if (entry.DIA == 30 && (entry.MES = 12)) {
      totalCasesByDay.dia6 = entry.INGRESSOS_AVG.valueOf();
    } else if (entry.DIA == 31 && (entry.MES = 12)) {
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

const ultima_prediccion = (info: Interfaces.Prediccions[]) => {
  var totalCases = {
    dia: 0,
  };
  info.forEach((entry: Interfaces.Prediccions) => {
    if (entry.DIA == 31 && (entry.MES = 12)) {
      totalCases.dia = entry.INGRESSOS_AVG.valueOf();
    }
  });
  return {
    name: "Prediccions",
    data: [totalCases.dia],
  };
};

const NO2_ultims_6_dies = (info: Interfaces.Prediccions[]) => {
  var totalCases = {
    dia: 0,
  };
  info.forEach((entry: Interfaces.Prediccions) => {
    if (entry.DIA == 31 && (entry.MES = 12)) {
      totalCases.dia = entry.NO2_AVG.valueOf();
    }
  });
  return {
    name: "Prediccions",
    data: [totalCases.dia],
  };
};

const SO2_ultims_6_dies = (info: Interfaces.Prediccions[]) => {
  var totalCases = {
    dia: 0,
  };
  info.forEach((entry: Interfaces.Prediccions) => {
    if (entry.DIA == 31 && (entry.MES = 12)) {
      totalCases.dia = entry.SO2_AVG.valueOf();
    }
  });
  return {
    name: "Prediccions",
    data: [totalCases.dia],
  };
};

const HomePage = () => {
  const [infoExpandida, setinfoExpandida] = useState<number[]>([]);
  const toggleExpansion = (index: number) => {
    if (infoExpandida.includes(index)) {
      setinfoExpandida(infoExpandida.filter((item) => item !== index));
    } else {
      setinfoExpandida([...infoExpandida, index]);
    }
  };

  const informació = [
    {
      nombre: "+info",
      info: (
        <div>
          <p style={{ marginBottom: "5px", textAlign: "justify" }}>
            En aquesta secció es realitza un estudi sobre les patologies agudes,
            les quals són malalties o trastorns que es desenvolupen de manera
            ràpida i repentina, amb una durada curta i una intensitat variable.
            Aquest tipus de patologia es caracteritza per aparèixer de manera
            brusca i provocar símptomes aguts que poden ser severes, però
            tendeixen a resoldre&apos;s en un període relativament curt de
            temps. Ens hem enfocat en aquestes 6: Bronquiolitis Aguda,
            Bronquitis Aguda, Grip, Infeccions Agudes de les Vies Respiratòries
            Superiors (TRS), Pneumònia Viral i Pneumònia Bacteriana.
          </p>
          {/* <p style={{ marginBottom: '5px' }}>Hola</p> */}
        </div>
      ),
    },
  ];

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

  const [prediccions2, setPrediccions2] = React.useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);

  const [prediccions3, setPrediccions3] = React.useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);

  const [prediccions4, setPrediccions4] = React.useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);

  const [preds, setPreds] = React.useState<
    {
      CODI_MUNICIPAL: Number;
      ANY: Number;
      MES: Number;
      DIA: Number;
      DIA_SETMANA: Number;
      NO_AVG: Number;
      NO2_AVG: Number;
      SO2_AVG: Number;
      POBLACIO: Number;
      INGRESSOS_AVG: Number;
      INGRESSOS: Number;
      INGRESSOS_DEUMIL: Number;
      NOM_MUNICIPI: String;
    }[]
  >([]);

  const [dinamics_saved, setDinamics] = React.useState<Interfaces.Dinamic[]>(
    []
  );

  const [visits, setVisits] = React.useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);

  const [secondVisits, setSecondVisits] = React.useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);

  const [sos, setSos] = React.useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);

  const [nos, setNos] = React.useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);

  const [visits_month, setVisits_Month] = React.useState<any[]>([]);

  const [average, setAverage] = React.useState(0);

  const [selectedDiagnostic, setSelectedDiagnostic] =
    React.useState<string>("Tots"); // Valor predeterminado
  // Función para manejar el cambio de diagnóstico seleccionado
  const handleDiagnosticChange = (diagnostic: string) => {
    setSelectedDiagnostic(diagnostic);
  };

  const [selectedMunicipi, setSelectedMunicipi] = React.useState("Tots");
  const [selectedSecondMunicipi, setSecondSelectedMunicipi] =
    React.useState("Tots");

  const handleSecondMunicipiSelect = (municipi: any) => {
    setSecondSelectedMunicipi(municipi);
    console.log("Second municipi selected:", municipi);
  };

  // This function will be passed to the Mapa component
  const handleMunicipiSelect = (municipi: any) => {
    setSelectedMunicipi(municipi);
    console.log("Municipi selected:", municipi);
  };

  React.useEffect(() => {
    const params = {
      Nom_municipi: selectedMunicipi,
    };
    const fetchData = async () => {
      const data_full = await getMongoCollection("dinamics", params);
      const dinamics =
        data_full && data_full.collection ? data_full.collection : undefined;

      if (dinamics !== undefined) {
        setDinamics(dinamics);
        setInfo2_ICS([calculateTotalCasesByDiagnostic(dinamics)]);
        setVisits(calculateTotalCasesByWeek(dinamics));
        setSos(calculateTotalCasesByWeekSos(dinamics));
        setNos(calculateTotalCasesByWeekNos(dinamics));
        setVisits_Month(dinamics);
      }
    };
    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedMunicipi]);

  React.useEffect(() => {
    setInfo_ICS(calculateTotalCasesBySex(dinamics_saved, selectedDiagnostic));
    setInfo3_ICS([
      calculateTotalCasesByEdats(dinamics_saved, selectedDiagnostic),
    ]);
    const monthlyData = calculateTotalCasesByMonth(
      dinamics_saved,
      selectedDiagnostic
    );
    const totalCasesThisYear = monthlyData.reduce(
      (acc, curr) => acc + curr.last_year,
      0
    );
    const average = totalCasesThisYear / 12;
    setAverage(average);
  }, [dinamics_saved, selectedDiagnostic]);

  React.useEffect(() => {
    const params = {
      Nom_municipi: selectedSecondMunicipi,
    };
    const fetchData = async () => {
      const data_full = await getMongoCollection("dinamics", params);
      const dinamics =
        data_full && data_full.collection ? data_full.collection : undefined;

      if (dinamics !== undefined) {
        setSecondVisits(calculateTotalCasesByWeek(dinamics));
      }
    };
    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedSecondMunicipi]);

  React.useEffect(() => {
    const params_pred = {
      DIA: "25",
      MES: "12",
      ANY: "2022",
    };
    const fetchData = async () => {
      const data = await getMongoCollection("prediccions", params_pred);
      const prediccions_dia =
        data && data.collection ? data.collection : undefined;
      setPreds(prediccions_dia);
    };

    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  React.useEffect(() => {
    const params = {
      NOM_MUNICIPI: selectedMunicipi,
    };

    const fetchData = async () => {
      try {
        const data = await getMongoCollection("prediccions", params);
        const prediccions =
          data && data.collection ? data.collection : undefined;
        if (prediccions !== undefined) {
          setPrediccions2([ultima_prediccion(prediccions)]);
          setPrediccions3([NO2_ultims_6_dies(prediccions)]);
          setPrediccions4([SO2_ultims_6_dies(prediccions)]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMunicipi]);

  const [mergedVisits, setMergedVisits] = React.useState<any[]>([]);
  React.useEffect(() => {
    const condition =
      visits &&
      secondVisits &&
      secondVisits.length > 0 &&
      visits.length > 0 &&
      visits.length === secondVisits.length;
    if (condition) {
      const mergedVisits_ = visits.map((visit, index) => {
        return {
          ...visit,
          data2: secondVisits[index].data,
        };
      });
      setMergedVisits(mergedVisits_);
    }
  }, [visits, secondVisits]);

  return (
    <>
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Visites als CAPs de la zona Metropolitana Sud degudes a patologies
          respiratòries agudes
          {/* {infoVisible && (
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 w-64 h-54 rounded-lg shadow-lg"
              onClick={toggleInfo}
              style={{ marginLeft: "25px" }}
            >
              <p className="text-sm text-gray-800 px-4 py-2 text-center">
                En aquesta secció es realitza un estudi sobre les patologies
                agudes, les quals són malalties o trastorns que es desenvolupen
                de manera ràpida i repentina, amb una durada curta i una
                intensitat variable. Aquest tipus de patologia es caracteritza
                per aparèixer de manera brusca i provocar símptomes aguts que
                poden ser severes, però tendeixen a resoldre&apos;s en un
                període relativament curt de temps. Ens hem enfocat en aquestes
                6: Bronquiolitis Aguda, Bronquitis Aguda, Grip, Infeccions
                Agudes de les Vies Respiratòries Superiors (TRS), Pneumònia
                Viral i Pneumònia Bacteriana.
              </p>
            </div>
          )} */}
          {/* <span
            className="text-sm text-gray-400 cursor-pointer"
            onClick={toggleInfo}
          >
            {" "}
            +info
          </span> */}
        </h1>
        <ul style={{ marginLeft: "115px", marginTop: "-33px" }}>
          {informació.map((informació, index) => (
            <li key={index}>
              <span onClick={() => toggleExpansion(index)}>
                <strong style={{ color: "gray" }}>{informació.nombre}</strong>
                {infoExpandida.includes(index) ? (
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    style={{ color: "gray", marginLeft: "5px" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{ color: "gray", marginLeft: "5px" }}
                  />
                )}
              </span>
              {infoExpandida.includes(index) && (
                <div style={{ marginLeft: "-115px", marginTop: "20px" }}>
                  <p>{informació.info}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* {show_loading && (
        <Box className="flex justify-center items-center h-96">
          <CircularProgress />
        </Box>
      )} */}
      {
        <div className="max-w-7xl">
          <br></br>
          <br></br>
          <br></br>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">
              Dades d&apos;interès per patologies agudes respiratòries - Resum
            </h1>
          </div>
          <div className="border-b border-black my-4"></div>
          <div className="flex items-center gap-4"></div>
          <h4 className="text-sm text-gray-600">
            (Selecciona el municipi d&apos;interès per la resta de
            l&apos;anàlisi)
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="flex justify-center items-center">
              <Mapa
                predictions={preds}
                onMunicipiSelect={handleMunicipiSelect}
              />
            </div>
            <div
              className="flex-1 flex flex-col justify-center items-center"
              style={{ marginTop: "0" }}
            >
              <h4 className="text-xl font-semibold text-black dark:text-white pt-0">
                {selectedMunicipi === "Tots"
                  ? "Valors per tots els municipis:"
                  : `Valors pel municipi ${selectedMunicipi}:`}
              </h4>
              <br></br>
              <div className="flex flex-wrap">
                <div
                  style={{
                    width: "170px",
                    height: "170px",
                    backgroundColor: "white",
                    border: "1.5px solid #dddddd",
                    marginRight: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "10px",
                  }}
                  className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow"
                >
                  <SimpleChart data={prediccions2}></SimpleChart>
                  <p style={{ fontSize: "13px" }}>
                    Predicció de la mitjana del número de visites de la propera
                    setmana
                  </p>
                </div>
                <div
                  style={{
                    width: "170px",
                    height: "170px",
                    backgroundColor: "white",
                    border: "1.5px solid #dddddd",
                    marginRight: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "10px",
                  }}
                  className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow"
                >
                  <SimpleChart data={prediccions3}></SimpleChart>
                  <p style={{ fontSize: "13px" }}>
                    Mitjana del valor de NO2 dels 6 dies anteriors
                  </p>
                </div>
                <div
                  style={{
                    width: "170px",
                    height: "170px",
                    backgroundColor: "white",
                    border: "1.5px solid #dddddd",
                    marginRight: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "10px",
                  }}
                  className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-grow"
                >
                  {/* <p style={{ fontSize: '65px',fontWeight: 'bold', fontFamily: 'Roboto'  }}>4.14</p> */}
                  <SimpleChart data={prediccions4}></SimpleChart>
                  <p style={{ fontSize: "13px" }}>
                    Mitjana del valor de SO2 dels 6 dies anteriors
                  </p>
                </div>
              </div>

              <br></br>
              {/* <br></br>
              <br></br> */}
              <h5
                className="text-xl font-semibold text-black dark:text-white pt-3"
                style={{ fontSize: "15px" }}
              >
                Mitjana del NO2 respecte el rang d&apos;ICQA del NO2
              </h5>
              <div className="flex justify-center items-center  gap-2">
                {/* <ChartOne series={prediccions} selectedMunicipi={selectedMunicipi}/> */}
                <BulletChart_NO2 data2={prediccions3} />
              </div>
              <br></br>
              <h5
                className="text-xl font-semibold text-black dark:text-white pt-3"
                style={{ fontSize: "15px" }}
              >
                Mitjana del SO2 respecte el rang d&apos;ICQA del SO2
              </h5>
              <div className="flex justify-center items-center  gap-2">
                <BulletChart_SO2 data2={prediccions4} />
              </div>
              <br></br>
              <div>
                {/* <p>Els valors de referència establerts pel rang d&apos;ICQA del NO2 i del SO2 es poden trobar a l'explicació de les estacions de contaminació corresponent.</p> */}
                <p
                  className="mt-4 text-black dark:text-white"
                  style={{ fontSize: "13px" }}
                >
                  Els valors de referència establerts pel rang d&apos;ICQA del
                  NO2 i del SO2 es poden trobar a l&apos;explicació de les{" "}
                  <Link href="/dashboard/estacions_contaminacio">
                    <span className="text-blue-500 underline">
                      estacions de contaminació
                    </span>
                  </Link>{" "}
                  corresponent, juntament amb la informació dels contaminants de
                  NO2 i SO2.
                </p>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Històric de dades</h1>
          </div>
          <div className="border-b border-black my-4" />

          <Filters_municipi
            selectedMunicipi={selectedSecondMunicipi}
            onMunicipiChange={handleSecondMunicipiSelect}
          />
          <div className="flex justify-center items-center gap-4">
            <div className="flex-1 flex justify-center items-center">
              <MyLineChart
                mergedVisits={mergedVisits}
                selectedMunicipi={selectedMunicipi}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <MyLineChart1 visits={sos} selectedMunicipi={selectedMunicipi} />
              <LineChartNO2 visits={nos} selectedMunicipi={selectedMunicipi} />
              <p
                className="mt-4 text-black dark:text-white"
                style={{ fontSize: "13px" }}
              >
                La informació dels contaminants de NO2 i SO2 es troba a
                l&apos;explicació de les{" "}
                <Link href="/dashboard/estacions_contaminacio">
                  <span className="text-blue-500 underline">
                    estacions de contaminació
                  </span>
                </Link>{" "}
              </p>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Anàlisi de malalties</h1>
          </div>
          <div className="border-b border-black my-4"></div>
          <h4 className="text-sm text-gray-600">
            (Selecciona el diagnòstic d&apos;interès per aquesta secció de
            l&apos;anàlisi)
          </h4>

          <div className="flex flex-wrap justify-left items-center gap-4 pl-[-80px]">
            <div className="flex flex-col justify-center items-center">
              <ChartTwo
                series={info2_ICS}
                selectedMunicipi={selectedMunicipi}
                onDiagnosticChange={handleDiagnosticChange}
              />
              <br></br>
              <div className="flex justify-center items-center  gap-2">
                <ChartThree
                  series={info_ICS}
                  selectedMunicipi={selectedMunicipi}
                  selectedDiagnostic={selectedDiagnostic}
                />
                <ChartTwoEdats
                  series={info3_ICS}
                  selectedMunicipi={selectedMunicipi}
                  selectedDiagnostic={selectedDiagnostic}
                />
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <Waterfall
                data={calculateTotalCasesByMonth(
                  visits_month,
                  selectedDiagnostic
                )}
                average={average}
                selectedMunicipi={selectedMunicipi}
                selectedDiagnostic={selectedDiagnostic}
              />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default HomePage;
