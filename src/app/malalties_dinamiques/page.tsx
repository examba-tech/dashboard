"use client";
import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";
import ChartThree from "./ChartThree";
import React, { useState, useEffect } from "react";

// Función asíncrona para obtener información
const getInfo = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/info_ICS", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return await res.json();
  } catch (error) {
    console.error("Error loading topics: ", error);
    return null; // Retorna null en caso de error
  }
};

// Función para calcular el recuento total de casos por sexo
const calculateTotalCasesBySex = (info) => {
  const totalCasesBySex = {
    male: 0,
    female: 0
  };

  info.forEach(entry => {
    if (entry.Sexe === 'H') {
      totalCasesBySex.male += entry.NUMERO_CASOS;
    } else if (entry.Sexe === 'D') {
      totalCasesBySex.female += entry.NUMERO_CASOS;
    }
  });

  return totalCasesBySex;
};

const HomePage = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInfo();
      if (data && data.info) {
        setInfo(data.info);
      } else {
        setInfo([]);
      }
    };

    fetchData();
  }, []);

  const totalCasesBySex = calculateTotalCasesBySex(info);

  return (
    <div>
      <h1>Malalties dinàmiques</h1>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne info={totalCasesBySex} />
        <ChartTwo info={totalCasesBySex} />
        <ChartThree info={totalCasesBySex} />
      </div>
    </div>
  );
};

export default HomePage;



/*
"use client";
import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";
import ChartThree from "./ChartThree";
import React, { useState,  useEffect} from "react";

const getInfo = () => {
  try {
    const res = fetch("http://localhost:3000/api/info_ICS", {
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

// Función para calcular el recuento total de casos por sexo
const calculateTotalCasesBySex = (info) => {
  const totalCasesBySex = {
    male: 0,
    female: 0
  };

  info.forEach(entry => {
    if (entry.Sexe === 'H') {
      totalCasesBySex.male += entry.NUMERO_CASOS;
    } else if (entry.Sexe === 'D') {
      totalCasesBySex.female += entry.NUMERO_CASOS;
    }
  });
  print(totalCasesBySex)

  return totalCasesBySex;
};

const HomePage = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const data = getInfo();
      setInfo(data && data.info ? data.info : []);
    };

    fetchData();
  }, []);

  const totalCasesBySex = calculateTotalCasesBySex(data);
  return (
    <div>
    <h1>Malalties dinàmiques</h1>
    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne info = {totalCasesBySex}/>
        <ChartTwo info = {totalCasesBySex}/>
        <ChartThree info = {totalCasesBySex}/>
      </div>
    </div>
  );
};

export default HomePage;

*/