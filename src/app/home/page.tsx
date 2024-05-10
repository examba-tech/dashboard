"use client";
import React from "react";
import Alertas_taula from "./Alertas_taula";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Page = () => {
  const [preds, setPreds] = React.useState<
    {
      Nom_municipi: String;
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
    }[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const params = {
      };
      try {
        const data2 = await getMongoCollection("prediccions", params);
        const prediccions =
          data2 && data2.collection ? data2.collection : undefined;
        setPreds(prediccions);
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
      {loading && (
        <Box className="flex justify-center items-center h-96">
          <CircularProgress />
        </Box>
      )}
      {!loading && <Alertas_taula predictions={preds} />}
    </div>
  );
};

export default Page;
