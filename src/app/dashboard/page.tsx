"use client";
import React from "react";
import Alertas_taula from "../dashboard/Alertas_taula";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import HomeCard from "@/src/components/ui/HomeCard";

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
      const params = {};
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
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          <div
            className="overflow-y-auto"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            HOLA DE NOU! 👋🏼
          </div>
        </h1>
      </div>
      <div className="flex justify-center flex-wrap items-center mt-10 gap-5">
        <HomeCard
          link="/dashboard/patologies_agudes"
          img_path="/bar-chart-regular-24-negro.png"
          text="Patologies Agudes"
        />
        <HomeCard
          link="/dashboard/malalties_prevalenca"
          img_path="/pie-chart-alt-2-regular-24 (1).png"
          text="Malalties de prevalença"
        />
        <HomeCard
          link="/dashboard/table"
          img_path="/table-regular-24-negro.png"
          text="Descàrrega de dades"
        />
        <HomeCard
          link="/dashboard/estacions_meteo"
          img_path="/cloud-lightning-regular-24 (1)-negro.png"
          text="Estacions meteorològiques"
        />
        <HomeCard
          link="/dashboard/estacions_contaminacio"
          img_path="/world-regular-24 (1).png"
          text="Estacions de contaminació"
        />
      </div>
      <div className="mt-10">
        {loading && (
          <Box className="flex justify-center items-center h-96">
            <CircularProgress />
          </Box>
        )}
        {!loading && <Alertas_taula predictions={preds} />}
      </div>
    </div>
  );
};

export default Page;
