"use client";
import * as React from "react";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Waterfall from "@/src/components/charts/waterfall_comparativa_meses";

const calculateTotalCasesByMonth = (visits: any[]) => {
  const monthlyData: { [key: string]: { last_year: number } } = {};
  const last_year = 2023; // Ajusta el año actual según tus necesidades

  visits.forEach((visit: any) => {
    const date = new Date(visit["Data Alta Problema"]);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth devuelve el mes base 0, sumamos 1

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
  const [loading, setLoading] = React.useState(true);
  const [visits, setVisits] = React.useState<any[]>([]);
  const [average, setAverage] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMongoCollection("visits");
        const visitsData = data && data.collection ? data.collection : [];
        setVisits(visitsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    if (visits.length > 0) {
      const monthlyData = calculateTotalCasesByMonth(visits);
      const totalCasesThisYear = monthlyData.reduce((acc, curr) => acc + curr.last_year, 0);
      const average = totalCasesThisYear / 12; // Dividir por 12 para obtener el promedio mensual
      setAverage(average);
    }
  }, [visits]);

  return (
    <>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Waterfall</h1>
      <br></br>
      {loading && (
        <Box className="flex justify-center items-center h-96">
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <>
          <Waterfall data={calculateTotalCasesByMonth(visits)} average={average} />
        </>
      )}
    </>
  );
};

export default HomePage;