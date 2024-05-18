"use client";
import React, { useState } from "react";
import ChartThree from "./ChartThree";
import Mapa from "./Mapa";
import ChartTwo from "./ChartTwo";
import ChartTwoEdats from "./ChartTwoEdats";
import ChartOne from "./ChartOne";
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

  // Convertir el objeto semanal en un array de objetos
  return Object.keys(weeklyData).map((week) => ({
    name: `Setmana ${week}`,
    data: [weeklyData[week]],
  }));
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
      NOM_MUNICIPI: String;
    }[]
  >([]);

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

  // const [selectedMunicipi, setSelectedMunicipi] =
  //   React.useState<string>("Tots"); // Valor predeterminado

  // Función para manejar el cambio de diagnóstico seleccionado

  // const handleMunicipiChange = (municipi: string) => {
  //   setSelectedMunicipi(municipi);

  // };

  React.useEffect(() => {
    const params = {
      Nom_municipi: selectedMunicipi,
    };
    const params_second = {
      Nom_municipi: selectedSecondMunicipi,
    };

    const params2 = {
      NOM_MUNICIPI: selectedMunicipi,
    };
    const params_pred = {
      DIA: "27",
      MES: "11",
      ANY: "2015",
    };
    const fetchData = async () => {
      try {
        const data_full = await getMongoCollection("dinamics", params);
        const dinamics =
          data_full && data_full.collection ? data_full.collection : undefined;

        const data_full_second = await getMongoCollection(
          "dinamics",
          params_second
        );
        const dinamics_second =
          data_full_second && data_full_second.collection
            ? data_full_second.collection
            : undefined;

        if (dinamics_second !== undefined) {
          setSecondVisits(calculateTotalCasesByWeek(dinamics_second));
        }

        if (dinamics !== undefined) {
          setInfo_ICS(calculateTotalCasesBySex(dinamics, selectedDiagnostic));
          setInfo2_ICS([calculateTotalCasesByDiagnostic(dinamics)]);
          setInfo3_ICS([
            calculateTotalCasesByEdats(dinamics, selectedDiagnostic),
          ]);
          setVisits(calculateTotalCasesByWeek(dinamics));
          setSos(calculateTotalCasesByWeekSos(dinamics));
          setNos(calculateTotalCasesByWeekNos(dinamics));
          setVisits_Month(dinamics);
          const monthlyData = calculateTotalCasesByMonth(
            dinamics,
            selectedDiagnostic
          );
          const totalCasesThisYear = monthlyData.reduce(
            (acc, curr) => acc + curr.last_year,
            0
          );
          const average = totalCasesThisYear / 12;
          setAverage(average);
        }
        const data2 = await getMongoCollection("prediccions", params2);
        const data3 = await getMongoCollection("prediccions", params_pred);
        const prediccions =
          data2 && data2.collection ? data2.collection : undefined;
        const prediccions1 =
          data3 && data3.collection ? data3.collection : undefined; 

        setLoading(false);
        if (prediccions !== undefined) {
          setPrediccions([filterByDay(prediccions)]);
          setPreds(prediccions1);
          setPrediccions2([ultima_prediccion(prediccions)]);
          setPrediccions3([NO2_ultims_6_dies(prediccions)]);
          setPrediccions4([SO2_ultims_6_dies(prediccions)]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [
    visits_month,
    visits,
    secondVisits,
    selectedDiagnostic,
    selectedMunicipi,
    selectedSecondMunicipi,
  ]);

  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Visites als CAPs de la zona Metropolitana Sud degudes a patologies respiratòries agudes
          {infoVisible && (
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
          )}
          <span
            className="text-sm text-gray-400 cursor-pointer"
            onClick={toggleInfo}
          >
            {" "}
            +info
          </span>
        </h1>
      </div>
      {loading && (
        <Box className="flex justify-center items-center h-96">
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <div className="max-w-7xl">
          <br></br>
          <br></br>
          <br></br>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Dades d&apos;interès per patologies agudes respiratòries - Resum</h1>
          </div>
          <div className="border-b border-black my-4"></div>
          <div className="flex items-center gap-4"></div>
          <h4 className="text-sm text-gray-600">(Selecciona el municipi d&apos;interès per la resta de l&apos;anàlisi)</h4>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="flex justify-center items-center">
              <Mapa
                predictions={preds}
                onMunicipiSelect={handleMunicipiSelect}
              />
            </div>
            <div
              className="flex-1 flex flex-col justify-center items-center"
              style={{ marginTop: "0px" }}
            >
            <h4 className="text-xl font-semibold text-black dark:text-white pt-3">
                 {selectedMunicipi === "Tots"
                 ? "Valors per tots els municipis:"
                 : `Valors pel municipi ${selectedMunicipi}:`}
            </h4> 
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
              <br></br>
              <div className="flex justify-center items-center  gap-2">
                <ChartOne series={prediccions} selectedMunicipi={selectedMunicipi}/>
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
              <MyLineChart visits={visits} secondVisits={secondVisits} selectedMunicipi={selectedMunicipi}/>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <MyLineChart1 visits={sos} selectedMunicipi={selectedMunicipi}/>
              <LineChartNO2 visits={nos} selectedMunicipi={selectedMunicipi}/>
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
          <div className="flex items-center gap-4">
            <Filters
              selectedDiagnostic={selectedDiagnostic}
              onDiagnosticChange={handleDiagnosticChange}
            />
          </div>

          <div className="flex flex-wrap justify-left items-center gap-4 pl-[-80px]">
            <div className="flex flex-col justify-center items-center">
              <ChartTwo
                series={info2_ICS}
                selectedMunicipi={selectedMunicipi}
              />
              <br></br>
              <div className="flex justify-center items-center  gap-2">
                <ChartThree series={info_ICS} selectedMunicipi={selectedMunicipi}/>
                <ChartTwoEdats series={info3_ICS} selectedMunicipi={selectedMunicipi}/>
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
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
