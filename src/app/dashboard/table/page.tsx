"use client";

import React, { useState } from "react";
import MasterTable from "@/src/components/tables/master_table/main";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import * as Interfaces from "@/src/utils/interfaces";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import '@/src/app/dashboard/estilo_info.css'; 

const Page = () => {
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
      nombre: '+info', info: <div>
        <p style={{ marginBottom: '5px', textAlign: 'justify' }}>
          Taula de dades que permet filtrar per codi municipal, i descarregar-les en format &quot;.csv&quot;</p>
        {/* <p style={{ marginBottom: '5px' }}>Hola</p> */}
      </div>
    },
  ];

  const [master, setMaster] = React.useState<Interfaces.Master[]>([]);
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

  return (
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Descàrrega de Dades
      </h1>
      <ul style={{ marginLeft: '0px', marginTop: '10px' }}>
        {informació.map((informació, index) => (
          <li key={index}>
            <span onClick={() => toggleExpansion(index)} className="icon-container">
              <strong style={{ color: 'gray' }} >{informació.nombre}</strong>
              {infoExpandida.includes(index) ? (
                <FontAwesomeIcon icon={faChevronUp} className="icon" />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} className="icon" />
              )}
            </span>
            {infoExpandida.includes(index) && (
              <div style={{ marginLeft: '0px', marginTop: '10px' }}>
                <p>{informació.info}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <br></br>
      {loading && (
        <Box className="flex justify-center items-center h-96">
          <CircularProgress />
        </Box>
      )}
      {!loading && <MasterTable data={master} />}
    </div>
  );
};

export default Page;
