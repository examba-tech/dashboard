"use client";
import ChartThree from "./ChartThree";
import ChartTwo from "./ChartTwo";
import ChartTwoEdats from "./ChartTwoEdats";
//import MapaOne from "./Mapa";
import React, { useState } from "react";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import * as Interfaces from "@/src/utils/interfaces";
import Mapa from "./Mapa";
import Mapa_cont from "./Mapa_cont";
import Mapa_SO2 from "./Mapa_SO2";
import SimpleChart from "./cuadros";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "@/src/app/dashboard/estilo_info.css";

const calculateTotalCasesBySex = (
  info: Interfaces.Estatiques[],
  selectedDiagnostic: string
) => {
  var totalCasesBySex = {
    male: 0,
    female: 0,
  };

  info.forEach((entry: Interfaces.Estatiques) => {
    if (selectedDiagnostic && entry.DIAGNOSTIC !== selectedDiagnostic) {
      return; // Si hay un diagnóstico seleccionado y no coincide con el de la entrada, salta esta iteración
    }

    if (entry.Sexe == "H") {
      totalCasesBySex.male +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.Sexe == "D") {
      totalCasesBySex.female +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    }
  });
  console.log("SEXE");
  console.log(totalCasesBySex);
  return totalCasesBySex;
};

const calculateTotalCasesByDiagnostic = (info: Interfaces.Estatiques[]) => {
  var totalCasesByDiagnostic = {
    TOTS: 0,
    ASMA: 0,
    BRONQUITIS_CRONICA: 0,
    MPOC_MIXTE: 0,
    BRONQUIECTASIES: 0,
    OTHER: 0,
    NEOPLASIA_PULMONAR: 0,
    ENFISEMA: 0,
    FIBROSI_PULMONAR: 0,
    AGENTS_EXTERNS: 0,
  };

  info.forEach((entry: Interfaces.Estatiques) => {
    if (entry.DIAGNOSTIC == "ASMA") {
      totalCasesByDiagnostic.ASMA +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.DIAGNOSTIC == "BRONQUITIS_CRONICA") {
      totalCasesByDiagnostic.BRONQUITIS_CRONICA +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.DIAGNOSTIC == "MPOC_MIXTE") {
      totalCasesByDiagnostic.MPOC_MIXTE +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.DIAGNOSTIC == "BRONQUIECTASIES") {
      totalCasesByDiagnostic.BRONQUIECTASIES +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.DIAGNOSTIC == "OTHER") {
      totalCasesByDiagnostic.OTHER +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.DIAGNOSTIC == "NEOPLASIA_PULMONAR") {
      totalCasesByDiagnostic.NEOPLASIA_PULMONAR +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.DIAGNOSTIC == "ENFISEMA") {
      totalCasesByDiagnostic.ENFISEMA +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.DIAGNOSTIC == "FIBROSI_PULMONAR") {
      totalCasesByDiagnostic.FIBROSI_PULMONAR +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.DIAGNOSTIC == "AGENTS_EXTERNS") {
      totalCasesByDiagnostic.AGENTS_EXTERNS +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.DIAGNOSTIC == "TOTS") {
      totalCasesByDiagnostic.TOTS +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    }
  });
  return {
    name: "Visites",
    data: [
      totalCasesByDiagnostic.TOTS,
      totalCasesByDiagnostic.ASMA,
      totalCasesByDiagnostic.BRONQUITIS_CRONICA,
      totalCasesByDiagnostic.MPOC_MIXTE,
      totalCasesByDiagnostic.BRONQUIECTASIES,
      totalCasesByDiagnostic.OTHER,
      totalCasesByDiagnostic.NEOPLASIA_PULMONAR,
      totalCasesByDiagnostic.ENFISEMA,
      totalCasesByDiagnostic.FIBROSI_PULMONAR,
      totalCasesByDiagnostic.AGENTS_EXTERNS,
    ],
  };
};

const calculateTotalCasesByEdats = (
  info: Interfaces.Estatiques[],
  selectedDiagnostic: string
) => {
  var totalCasesByEdats = {
    de_15_44: 0,
    de_45_64: 0,
    de_65_74: 0,
    mes_75: 0,
    menys_15: 0,
  };

  info.forEach((entry: Interfaces.Estatiques) => {
    if (selectedDiagnostic && entry.DIAGNOSTIC !== selectedDiagnostic) {
      return; // Si hay un diagnóstico seleccionado y no coincide con el de la entrada, salta esta iteración
    }
    if (entry.FranjaEdat === "15-44") {
      totalCasesByEdats.de_15_44 +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.FranjaEdat === "45-64") {
      totalCasesByEdats.de_45_64 +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.FranjaEdat === "65-74") {
      totalCasesByEdats.de_65_74 +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.FranjaEdat === ">75") {
      totalCasesByEdats.mes_75 +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
    } else if (entry.FranjaEdat === "<15") {
      totalCasesByEdats.menys_15 +=
        (entry.Numero_Casos.valueOf() / entry.POBLACIO.valueOf()) * 10000;
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
            En aquesta secció es realitza un estudi sobre les malalties respiratòries cròniques, on ens enfoquem més en la comparativa i en la correlació
            que pugui haver entre les variables. Ens hem centrat en les següents
            7 malalties:
            <li style={{ marginLeft: "30px"}}>- Asma</li>
            <li style={{ marginLeft: "30px"}}>- Bronquitis Crònica</li>
            <li style={{ marginLeft: "30px"}}>- MPOC Mixte (Malaltia Pulmonar Obstructiva Crònica)</li>
            <li style={{ marginLeft: "30px"}}>- Bronquiectàsies</li>
            <li style={{ marginLeft: "30px"}}>- Emfisema</li>
            <li style={{ marginLeft: "30px"}}>- Neoplàsia Pulmonar</li>
            <li style={{ marginLeft: "30px"}}>- Fibrosi Pulmonar</li>
            Cal destacar que tots els gràfics d&apos;aquesta secció estan normalitzats per població per a facilitar la comparació i l&apos;ànalisi realitzat.
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

  const [mapa1, setMapa1] = React.useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);

  const [mapa2, setMapa2] = React.useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);

  const [mapa3, setMapa3] = React.useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);

  const [mapa_casos, set_mapa_casos] = React.useState<
    {
      Codi_municipi: String;
      municipi: String;
      Latitud: Number;
      Longitud: Number;
      valor: Number;
      TN: Number;
      TX: Number;
      TM: Number;
      HRM: Number;
      PPT: Number;
      RS24h: Number;
      NO2: Number;
      NO: Number;
      SO2: Number;
      Numero_Casos: Number;
      ICQA_NO2: Number;
      ICQA_SO2: Number;
      total_poblacio: Number;
    }[]
  >([]);

  const [selectedDiagnostic, setSelectedDiagnostic] =
    React.useState<string>("ASMA"); // Valor predeterminado
  // Función para manejar el cambio de diagnóstico seleccionado

  const handleDiagnosticChange = (diagnostic: string) => {
    setSelectedDiagnostic(diagnostic);
  };

  const [selectedMunicipi, setSelectedMunicipi] =
    React.useState<string>("Tots");

  const handleMunicipiSelect = (municipi: string) => {
    setSelectedMunicipi(municipi);
    console.log("Municipi selected:", municipi);
  };

  const caja = (info: Interfaces.Mapa[]) => {
    var totalCases = {
      dia: 0,
    };
    info.forEach((entry: Interfaces.Mapa) => {
        totalCases.dia = (entry.Numero_Casos.valueOf() / entry.total_poblacio.valueOf()) * 10000;
    });

    return {
      name: "Ingressos",
      data: [totalCases.dia],
    };
  };

  const caja2 = (info: Interfaces.Mapa[]) => {
    var totalCases = {
      dia: 0,
    };
    info.forEach((entry: Interfaces.Mapa) => {
        totalCases.dia = entry.NO2.valueOf();
    });
    return {
      name: "Ingressos",
      data: [totalCases.dia],
    };
  };

  const caja3 = (info: Interfaces.Mapa[]) => {
    var totalCases = {
      dia: 0,
    };
    info.forEach((entry: Interfaces.Mapa) => {
        totalCases.dia = entry.SO2.valueOf();
    });
    return {
      name: "Ingressos",
      data: [totalCases.dia],
    };
  };

  React.useEffect(() => {
    const params = {};
    const params2 = {
      municipi: selectedMunicipi,
    };
    const fetchData = async () => {
      try {
        const data = await getMongoCollection("estatics", params2);
        const data1 = await getMongoCollection("mapas", params);
        const data2 = await getMongoCollection("mapas", params2);

        const estatics = data && data.collection ? data.collection : undefined;
        const mapaestatics =
          data1 && data1.collection ? data1.collection : undefined;
        const mapaestatics2 =
          data2 && data2.collection ? data2.collection : undefined;

        if (estatics !== undefined) {
          setInfo_ICS(calculateTotalCasesBySex(estatics, selectedDiagnostic));
          setInfo2_ICS([calculateTotalCasesByDiagnostic(estatics)]);
          setInfo3_ICS([
            calculateTotalCasesByEdats(estatics, selectedDiagnostic),
          ]);
          set_mapa_casos(mapaestatics);
          setMapa1([caja(mapaestatics2)]);
          setMapa2([caja2(mapaestatics2)]);
          setMapa3([caja3(mapaestatics2)]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    
      
    };

    fetchData();
  }, [selectedDiagnostic, selectedMunicipi]);

  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };



  return (
    <>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Pacients als CAPs de la regió Metropolitana Sud degudes a malalties
        respiratòries cròniques al 2023
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
      {loading && (
        <Box className="flex justify-center items-center h-96">
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <>
          <br></br>
          <br></br>
          <br></br>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">
              Dades d&apos;interès per malaties respiratòries cròniques - Resum{" "}
            </h1>
          </div>
          <div className="border-b border-black my-4"></div>
          <h4 className="text-sm text-gray-600">
            (Selecciona el municipi d&apos;interès per la resta de
            l&apos;anàlisi)
          </h4>
          <div className="flex items-center gap-4" style= {{marginLeft: "0px"}}>
            <div className="flex-1 flex flex-col items-center" style= {{width: "800px"}}>
              <Mapa predictions={mapa_casos} onMunicipiSelect={handleMunicipiSelect} selectedMunicipi={selectedMunicipi}/>
            </div>
            <div className="flex flex-col gap-4">
              <div
                style={{
                  width: "400px",
                  height: "170px",
                  backgroundColor: "white",
                  border: "1.5px solid #dddddd",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "10px",
                  marginRight: "100px",
                }}
                className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                <SimpleChart data={mapa1} />
                <p style={{ fontSize: "12px" }}>
                  Nombre de pacients al 2023 al municipi {selectedMunicipi}
                </p>
              </div>
              <div
                style={{
                  width: "400px",
                  height: "170px",
                  backgroundColor: "white",
                  border: "1.5px solid #dddddd",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "10px",
                  marginRight: "100px",
                }}
                className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                <SimpleChart data={mapa2} />
                <p style={{ fontSize: "12px" }}>
                  Mitjana del valor de NO2 dels últims 10 anys al municipi {selectedMunicipi}
                </p>
              </div>
              <div
                style={{
                  width: "400px",
                  height: "170px",
                  backgroundColor: "white",
                  border: "1.5px solid #dddddd",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "10px",
                  marginRight: "100px",
                }}
                className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                <SimpleChart data={mapa3} />
                <p style={{ fontSize: "12px" }}>
                  Mitjana del valor de SO2 dels últims 10 anys al municipi {selectedMunicipi}
                </p>
              </div>
            </div>
          </div>

          <br></br>
          <br></br>
          
          <div className="flex justify-center items-center gap-4">
            <div className="flex-1 flex flex-col justify-center items-center">
                <Mapa_cont predictions={mapa_casos} />
              </div>
            <div className="flex-1 flex flex-col justify-center items-center">
                <Mapa_SO2 predictions={mapa_casos} />
              </div>
          </div>
          <br></br>
          <br></br>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Anàlisi de malalties respiratòries cròniques</h1>
          </div>
          <div className="border-b border-black my-4"></div>
          <h4 className="text-sm text-gray-600">
            (Selecciona el diagnòstic d&apos;interès per aquesta secció de
            l&apos;anàlisi)
          </h4>
          <div
            className="flex justify-center items-center gap-4"
            style={{ transform: "scale(0.8)" }}
          >
            <div className="flex-1 flex flex-col justify-center items-center">
              <ChartTwo
                series={info2_ICS}
                selectedMunicipi={selectedMunicipi}
                onDiagnosticChange={handleDiagnosticChange}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <ChartThree
                series={info_ICS}
                selectedMunicipi={selectedMunicipi}
                selectedDiagnostic={selectedDiagnostic}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <ChartTwoEdats
                series={info3_ICS}
                selectedMunicipi={selectedMunicipi}
                selectedDiagnostic={selectedDiagnostic}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
