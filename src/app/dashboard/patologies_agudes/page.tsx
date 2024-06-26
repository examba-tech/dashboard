"use client";
import React, { useState } from "react";
import Link from "next/link";
import ChartThree from "./ChartThree";
import Mapa from "./Mapa";
import ChartTwo from "./ChartTwo";
import ChartTwoEdats from "./ChartTwoEdats";
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
import MonthRange from "@/src/components/ui/filters/month-picker";
import dayjs from "dayjs";
import '@/src/app/dashboard/estilo_info.css'; 
import MyLineChart_vis_NO2 from '@/src/components/charts/line_chart_visitas_NO2'
import MyLineChart_vis_SO2 from '@/src/components/charts/line_chart_visitas_SO2'
import "@/src/app/dashboard/estilo_info.css";


const calculateTotalCasesBySex = (
  info: Interfaces.Dinamic[],
  selectedDiagnostic: string
) => {
  var totalCasesBySex = {
    male: 0,
    female: 0,
  };

  info.forEach((entry: Interfaces.Dinamic) => {
    if (selectedDiagnostic && entry.DIAGNOSTIC !== selectedDiagnostic) {
      return; 
    }

    if (entry.Sexe == "H") {
      totalCasesBySex.male +=
        (entry.NUMERO_CASOS.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.Sexe == "D") {
      totalCasesBySex.female +=
        (entry.NUMERO_CASOS.valueOf() / entry.POBLACIO.valueOf()) * 10000;
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
        (entry.NUMERO_CASOS.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.DIAGNOSTIC == "BRONQUITIS_AGUDA") {
      totalCasesByDiagnostic.BRONQUITIS_AGUDA +=
        (entry.NUMERO_CASOS.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.DIAGNOSTIC == "GRIP") {
      totalCasesByDiagnostic.GRIP +=
        (entry.NUMERO_CASOS.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.DIAGNOSTIC == "BRONQUIOLITIS_AGUDA") {
      totalCasesByDiagnostic.BRONQUIOLITIS_AGUDA +=
        (entry.NUMERO_CASOS.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.DIAGNOSTIC == "PNEUMONIA_BACTERIANA") {
      totalCasesByDiagnostic.PNEUMONIA_BACTERIANA +=
        (entry.NUMERO_CASOS.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.DIAGNOSTIC == "PNEUMONIA_VIRICA") {
      totalCasesByDiagnostic.PNEUMONIA_VIRICA +=
        (entry.NUMERO_CASOS.valueOf() / entry.POBLACIO.valueOf()) * 10000;
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
      return; 
    }
    if (entry.FranjaEdat == "15-44") {
      totalCasesByEdats.de_15_44 +=
        (entry.NUMERO_CASOS.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.FranjaEdat == "45-64") {
      totalCasesByEdats.de_45_64 +=
        (entry.NUMERO_CASOS.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.FranjaEdat == "65-74") {
      totalCasesByEdats.de_65_74 +=
        (entry.NUMERO_CASOS.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.FranjaEdat == ">75") {
      totalCasesByEdats.mes_75 +=
        (entry.NUMERO_CASOS.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.FranjaEdat == "<15") {
      totalCasesByEdats.menys_15 +=
        (entry.NUMERO_CASOS.valueOf() / entry.POBLACIO.valueOf()) * 10000;
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
  console.log("example", dinamics[0]);
  const weeklyData: { [key: string]: number } = {};
  const pobData: { [key: string]: number } = {};

  dinamics.forEach((entry: Interfaces.Dinamic) => {
    const week = entry.SETMANA.valueOf();
    if (week !== 53) {
      const date = new Date(entry.DATA);
      const dateString = date.toLocaleDateString("en");
      if (weeklyData[dateString] === undefined) {
        weeklyData[dateString] = 0;
      }
      if (pobData[dateString] === undefined) {
        pobData[dateString] = 0;
      }
      weeklyData[dateString] += Number(entry.NUMERO_CASOS);
      pobData[dateString] = Number(entry.POBLACIO);
    }
  });

  const result = Object.keys(weeklyData)
    .map((week) => ({
      name: week,
      data: [parseFloat(((weeklyData[week] / pobData[week]) * 1000).toFixed(1))],
    }))
    .sort((a, b) => {
      const dateA = new Date(a.name);
      const dateB = new Date(b.name);
      return dateA.getTime() - dateB.getTime();
    });

  return result;
};

const calculateTotalCasesByWeekSos2 = (dinamics: Interfaces.Dinamic[]) => {
  const weeklyData: { [key: string]: number } = {};
  const i: { [key: string]: number } = {};

  dinamics.forEach((entry: Interfaces.Dinamic) => {
    const week = entry.SETMANA.valueOf();
    if (week !== 53) {
      const date = new Date(entry.DATA);
      const dateString = date.toLocaleDateString("en");
      if (weeklyData[dateString] === undefined) {
        weeklyData[dateString] = 0;
        i[dateString] = 0;
      }
      i[dateString] += 1;
      weeklyData[dateString] += Number(entry.SO2);
    }
  });

  const result = Object.keys(weeklyData)
    .map((week) => ({
      name: week,
      data: [parseFloat((weeklyData[week] / i[week]).toFixed(1))],
    }))
    .sort((a, b) => {
      const dateA = new Date(a.name);
      const dateB = new Date(b.name);
      return dateA.getTime() - dateB.getTime();
    });

  return result;
};


const calculateTotalCasesByWeekNos2 = (dinamics: Interfaces.Dinamic[]) => {
  const weeklyData: { [key: string]: number } = {};
  const i: { [key: string]: number } = {};

  dinamics.forEach((entry: Interfaces.Dinamic) => {
    const week = entry.SETMANA.valueOf();
    if (week !== 53) {
      const date = new Date(entry.DATA);
      const dateString = date.toLocaleDateString("en");
      if (weeklyData[dateString] === undefined) {
        weeklyData[dateString] = 0;
        i[dateString] = 0;
      }
      i[dateString] += 1;
      weeklyData[dateString] += Number(entry.NO2);
    }
  });

  const result = Object.keys(weeklyData)
    .map((week) => ({
      name: week,
      data: [parseFloat((weeklyData[week] / i[week]).toFixed(1))],
    }))
    .sort((a, b) => {
      const dateA = new Date(a.name);
      const dateB = new Date(b.name);
      return dateA.getTime() - dateB.getTime();
    });

  return result;
};

const calculateTotalCasesByMonth = (
  dinamics: Interfaces.Dinamic[],
  selectedDiagnostic: string
) => {
  const monthlyData: { [key: string]: { visites: number } } = {};

  dinamics.forEach((entry: Interfaces.Dinamic) => {
    if (selectedDiagnostic && entry.DIAGNOSTIC !== selectedDiagnostic) {
      return; 
    }
    const date = new Date(entry.DATA);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const key = `${month}-${year}`;

    if (!monthlyData[key]) {
      monthlyData[key] = { visites: 0 };
    }

    monthlyData[key].visites +=
      (Number(entry.NUMERO_CASOS) / entry.POBLACIO.valueOf()) * 10000;
  });

  return Object.entries(monthlyData).map(([month, data]) => ({
    name: month,
    visites: data.visites,
  }));
};

const ultima_prediccion = (info: Interfaces.Prediccions[]) => {
  var totalCases = {
    dia: 0,
  };
  info.forEach((entry: Interfaces.Prediccions) => {
    if (entry.DIA == 25 && (entry.MES = 12)) {
      totalCases.dia = entry.INGRESSOS_DEUMIL.valueOf();
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
          <p style={{ marginBottom: "5px", textAlign: "justify" }}></p>
            En aquesta secció es realitza un estudi sobre les patologies respiratòries agudes. Ens hem enfocat en aquestes 6: 
            <li style={{ marginLeft: "30px"}}>- Bronquiolitis Aguda </li>
            <li style={{ marginLeft: "30px"}}>- Bronquitis Aguda</li>
            <li style={{ marginLeft: "30px"}}>- Grip</li>
            <li style={{ marginLeft: "30px"}}>- Infeccions Agudes de les Vies Respiratòries
            Superiors (TRS)</li>
            <li style={{ marginLeft: "30px"}}>- Pneumònia Viral</li>
            <li style={{ marginLeft: "30px"}}>- Pneumònia Bacteriana</li>
          Cal destacar que tots els gràfics d&apos;aquesta secció estan normalitzats per població per a facilitar la comparació i l&apos;ànalisi realitzat.
          <div className="py-1"/>
          Les prediccions del nombre de visites per patologies respiratòries agudes han sigut realtzades a partir de dades meteorològiques i de contaminació.
        </div>
      ),
    },
  ];

  const [info_ICS, setInfo_ICS] = React.useState<{
    male: number;
    female: number;
  }>({ male: 0, female: 0 });

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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

  const [secondsos, setSecondSos] = React.useState<
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

  const [secondnos, setSecondNos] = React.useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);

  const [so2, setSo2] = React.useState<
    {
      VALOR_SO2: Number;
      COUNT_SO2: Number;
      Codi_municipi: String;
      Nom_municipi: String;
    }[]
  >([]);
  const [no2, setNo2] = React.useState<
    {
      VALOR_NO2: Number;
      COUNT_NO2: Number;
      Codi_municipi: String;
      Nom_municipi: String;
    }[]
  >([]);

  const [average, setAverage] = React.useState(0);

  const [selectedDiagnostic, setSelectedDiagnostic] =
    React.useState<string>("Tots");
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

  const handleMunicipiSelect = (municipi: any) => {
    setSelectedMunicipi(municipi);
    console.log("Municipi selected:", municipi);
  };

  const [dinamics_year_saved, setDinamics_year] = React.useState<
    Interfaces.Dinamic[]
  >([]);

  const [beginDate, setBeginDate] = React.useState(dayjs("2023-01-01"));
  const [endDate, setEndDate] = React.useState(dayjs("2023-12-31"));

  React.useEffect(() => {
    const params = {
      Nom_municipi: selectedMunicipi,
      beginDate: beginDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
    };
    const fetchData = async () => {
      const data_full = await getMongoCollection("dinamics", params);
      const dinamics =
        data_full && data_full.collection ? data_full.collection : undefined;

      if (dinamics !== undefined) {
        setDinamics_year(dinamics);
        console.log("success");
      }
    };
    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedMunicipi, beginDate, endDate]);

  React.useEffect(() => {
    setVisits(calculateTotalCasesByWeek(dinamics_year_saved));
    setSos(calculateTotalCasesByWeekSos2(dinamics_year_saved));
    setNos(calculateTotalCasesByWeekNos2(dinamics_year_saved));
  }, [dinamics_year_saved]);

  React.useEffect(() => {
    const params = {
      Nom_municipi: selectedMunicipi,
      beginDate: beginDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
    };
    const fetchData = async () => {
      const data_full = await getMongoCollection("dinamics", params);
      const dinamics =
        data_full && data_full.collection ? data_full.collection : undefined;

      if (dinamics !== undefined) {
        setDinamics(dinamics);
      }
    };
    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedMunicipi, beginDate, endDate]);

  React.useEffect(() => {
    setInfo2_ICS([calculateTotalCasesByDiagnostic(dinamics_saved)]);
  }, [dinamics_saved]);

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
      (acc, curr) => acc + curr.visites,
      0
    );
    const average = totalCasesThisYear / 12;
    setAverage(average);
  }, [dinamics_saved, selectedDiagnostic]);

  React.useEffect(() => {
    const params = {
      Nom_municipi: selectedSecondMunicipi,
      beginDate: beginDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
    };
    const fetchData = async () => {
      const data_full = await getMongoCollection("dinamics", params);
      const dinamics =
        data_full && data_full.collection ? data_full.collection : undefined;

      if (dinamics !== undefined) {
        console.log("dinamics", dinamics);
        setSecondVisits(calculateTotalCasesByWeek(dinamics));
        setSecondSos(calculateTotalCasesByWeekSos2(dinamics));
        setSecondNos(calculateTotalCasesByWeekNos2(dinamics));
      }
    };
    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedSecondMunicipi, beginDate, endDate]);

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

  React.useEffect(() => {
    const params = {
      Nom_municipi: selectedMunicipi,
    };
    const fetchData = async () => {
      const data_so2 = await getMongoCollection("so2", params);
      const data_no2 = await getMongoCollection("no2", params);
      const so22 =
        data_so2 && data_so2.collection ? data_so2.collection : undefined;
      const no22 =
        data_no2 && data_no2.collection ? data_no2.collection : undefined;
      setSo2(so22);
      setNo2(no22);
    };
    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedMunicipi]);

  const [mergedVisits, setMergedVisits] = React.useState<any[]>([]);
  React.useEffect(() => {
    const condition =
      visits && secondVisits && secondVisits.length > 0 && visits.length > 0;
    if (condition) {
      const mergedVisits_ = visits.map((visit, index) => {
        return {
          ...visit,
          data2: secondVisits[index]
            ? secondVisits[index].data
            : [secondVisits[0].data],
        };
      });
      setMergedVisits(mergedVisits_);
    }
  }, [visits, secondVisits]);

  const [mergedSos, setMergedSos] = React.useState<any[]>([]);
  React.useEffect(() => {
    const condition =
      sos && secondsos && secondsos.length > 0 && sos.length > 0;
    if (condition) {
      const mergedSos_ = sos.map((sos, index) => {
        return {
          ...sos,
          data2: secondsos[index] ? secondsos[index].data : [secondsos[0].data],
        };
      });
      setMergedSos(mergedSos_);
    }
  }, [sos, secondsos]);

  const [mergedNos, setMergedNos] = React.useState<any[]>([]);
  React.useEffect(() => {
    const condition =
      nos && secondnos && secondnos.length > 0 && nos.length > 0;
    if (condition) {
      const mergedNos_ = nos.map((nos, index) => {
        return {
          ...nos,
          data2: secondnos[index] ? secondnos[index].data : [secondnos[0].data],
        };
      });
      setMergedNos(mergedNos_);
    }
  }, [nos, secondnos]);

  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

  return (
    <>
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Visites als CAPs de la regió Metropolitana Sud degudes a patologies
          respiratòries agudes
        </h1>
        <ul style={{ marginLeft: "0px", marginTop: "10px" }}>
          {informació.map((informació, index) => (
            <li key={index}>
              <span
                onClick={() => toggleExpansion(index)}
                className="icon-container"
              >
                <strong style={{ color: "gray" }}>{informació.nombre}</strong>
                {infoExpandida.includes(index) ? (
                  <FontAwesomeIcon icon={faChevronUp} className="icon" />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} className="icon" />
                )}
              </span>
              {infoExpandida.includes(index) && (
                <div style={{ marginLeft: "0px", marginTop: "10px" }}>
                  <p>{informació.info}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
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
            <h1 className="text-xl font-bold">
              Dades d&apos;interès per patologies respiratòries agudes - Resum
            </h1>
          </div>
          <div className="border-b border-black my-4"></div>
          <div className="flex items-center gap-4"></div>
          <h4 className="text-sm text-gray-600">
            (Selecciona el municipi d&apos;interès per la resta de
            l&apos;anàlisi)
          </h4>

          <div className="flex justify-center items-center gap-4">
            <div className="flex-1 flex justify-center items-center">
              <div className="flex justify-center items-center">
                <Mapa
                  predictions={preds}
                  onMunicipiSelect={handleMunicipiSelect}
                  selectedMunicipi={selectedMunicipi}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <div
                className="flex-1 flex flex-col justify-center items-center"
                style={{ marginTop: "0" }}
              >
                <h4 className="text-lg font-semibold text-black dark:text-white pt-0">
                  {selectedMunicipi === "Tots"
                    ? "Valors per tots els municipis:"
                    : `Valors pel municipi ${selectedMunicipi}:`}
                </h4>
                <br></br>
                <div className = "flex">
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
                    <p style={{ fontSize: "10px" }}>
                      Predicció de la mitjana del número de visites cada 10.000 habitants de la
                      propera setmana
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
                    <p style={{ fontSize: "12px" }}>
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
                    <SimpleChart data={prediccions4}></SimpleChart>
                    <p style={{ fontSize: "12px" }}>
                      Mitjana del valor de SO2 dels 6 dies anteriors
                    </p>
                  </div>
                </div>
                
                <h5
                  className="text-xl font-semibold text-black dark:text-white pt-3"
                  style={{ fontSize: "15px" }}
                >
                  Mitjana del NO2 respecte el rang d&apos;ICQA del NO2
                  <span
                        className="text-sm text-gray-400 cursor-pointer"
                        onClick={toggleInfo}
                      >
                        {" "}
                        +info
                      </span>
                </h5>
                <div
                  className="mx-auto flex justify-center relative"
                  style={{ marginLeft: "-30px" }}
                >
                  <BulletChart_NO2 data2={prediccions3} no2Data={no2} />
                  {infoVisible && (
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 w-104 h-74 rounded-lg shadow-lg"
              onClick={toggleInfo}
              style={{ marginTop: "-10px"}}
            >
              <p className="text-sm text-gray-800">
              En aquestes dues visualitzacions es pot veure el valor de NO2 (o SO2 respectivament) respecte tots els possibles. Aquesta escala distribueix els valors segons el rang d&apos;ICQA dels contaminants. A més, sobre el gràfic de l&apos;escala es presenta un histograma que il·lustra la distribució dels nivells de contaminació durant l&apos;any anterior específicament per a aquest municipi. És important destacar que en situacions on es registrin valors atípics, mai abans observats, la precisió del nostre model predictiu es podria veure afectada. Segons l&apos;ICQA superar els 120 µg/m³ de NO2 i els 350 µg/m³ de SO2 en una hora ja es considera que la qualitat de l&apos;aire és desfavorable.
              </p>
            </div>
          )}
                </div>
                <br></br>
                <h5
                  className="text-xl font-semibold text-black dark:text-white pt-3"
                  style={{ fontSize: "15px" }}
                >
                  Mitjana del SO2 respecte el rang d&apos;ICQA del SO2
                </h5>
                <div
                  className="flex justify-center items-center  gap-2"
                  style={{ marginLeft: "-100px" }}
                >
                  <BulletChart_SO2 data2={prediccions4} so2Data={so2} />
                </div>
              </div>
              <br></br>
              
              <div>
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
            <h1 className="text-xl font-bold">
            {selectedMunicipi === "Tots"
          ? `Històric de dades de patologies respiratòries agudes de tots els municipis`
          : `Històric de dades de patologies respiratòries agudes del municipi ${selectedMunicipi}`
          }
            </h1>
          </div>
          <div className="border-b border-black my-4" />
          <div>
            <div className="pb-5">
              <Filters_municipi
                selectedMunicipi={selectedSecondMunicipi}
                onMunicipiChange={handleSecondMunicipiSelect}
              />
            </div>
            <div className="pb-10 pl-2">
              Selecciona un rang de dates:
              <div className="pt-4">
                <MonthRange
                  beginDate={beginDate}
                  endDate={endDate}
                  setBeginDate={setBeginDate}
                  setEndDate={setEndDate}
                />
              </div>
            </div>
          </div>
          
          
          <div className="flex justify-center items-stretch gap-4 pt-5">
            <div className="flex-1 flex chart-container">
              <MyLineChart
                mergedVisits={mergedVisits}
                selectedMunicipi={selectedMunicipi}
                beginDate={beginDate}
                endDate={endDate}
                selectedSecondMunicipi={selectedSecondMunicipi}
              />
            </div>
            <div className="flex-1 flex flex-col chart-container gap-4 max-w-[600px]">
              <MyLineChart1
                mergedSos={mergedSos}
                selectedMunicipi={selectedMunicipi}
                beginDate={beginDate}
                endDate={endDate}
                selectedSecondMunicipi={selectedSecondMunicipi}
              />
              <LineChartNO2
                mergedNos={mergedNos}
                selectedMunicipi={selectedMunicipi}
                beginDate={beginDate}
                endDate={endDate}
                selectedSecondMunicipi={selectedSecondMunicipi}
              />
            </div>
          </div>

          <div className="flex justify-center items-stretch gap-4 pt-5">
            <div className="flex-1 flex chart-container">
                <MyLineChart_vis_NO2
                  mergedVisits={mergedVisits}
                  mergedNos={mergedNos}
                  selectedMunicipi={selectedMunicipi}
                  beginDate={beginDate}
                  endDate={endDate}
                />
              </div>
              <div className="flex-1 flex chart-container  max-w-[600px]">
                <MyLineChart_vis_SO2
                  mergedVisits={mergedVisits}
                  mergedSos={mergedSos}
                  selectedMunicipi={selectedMunicipi}
                  beginDate={beginDate}
                  endDate={endDate}
                />
              </div>
            </div>
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
         
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">
            {selectedMunicipi === "Tots"
          ? `Anàlisi de patologies respiratòries agudes de tots els municipis`
          : `Anàlisi de patologies respiratòries agudes del municipi ${selectedMunicipi}`
          }
            </h1>
          </div>
          <div className="border-b border-black my-4"></div>
          <h4 className="text-sm text-gray-600">
            (Selecciona el diagnòstic d&apos;interès per aquesta secció de
            l&apos;anàlisi)
          </h4>

          <div className="flex justify-center items-stretch gap-3 pt-5">
            <div className="flex-1 flex flex-col chart-container">
              <ChartTwo
                series={info2_ICS}
                selectedMunicipi={selectedMunicipi}
                onDiagnosticChange={handleDiagnosticChange}
                beginDate={beginDate}
                endDate={endDate}
              />
              <div className="h-4" />
              <div className="flex-1 flex flex-row chart-container">
                <ChartThree
                  series={info_ICS}
                  selectedMunicipi={selectedMunicipi}
                  selectedDiagnostic={selectedDiagnostic}
                  beginDate={beginDate}
                  endDate={endDate}
                />
                <div className="w-8" />
                <ChartTwoEdats
                  series={info3_ICS}
                  selectedMunicipi={selectedMunicipi}
                  selectedDiagnostic={selectedDiagnostic}
                  beginDate={beginDate}
                  endDate={endDate}
                />
              </div>
            </div>
            <div className="flex-1 flex chart-container gap-2">
              <Waterfall
                data={calculateTotalCasesByMonth(
                  dinamics_saved,
                  selectedDiagnostic
                )}
                average={average}
                selectedMunicipi={selectedMunicipi}
                selectedDiagnostic={selectedDiagnostic}
                beginDate={beginDate}
                endDate={endDate}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;