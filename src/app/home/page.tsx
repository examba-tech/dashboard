"use client";
import React from "react";
import Alertas_taula from "./Alertas_taula";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Link from "next/link";
import Image from "next/image";

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
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <div className="overflow-y-auto" style={{ maxHeight: '200px', overflowY: 'auto' }}>HOLA DE NOU! 👋🏼</div>
        </h1> 
      </div>
      <div className="flex justify-center items-center mt-10 space-x-8">
        <Link href={"/dashboard/malalties_dinamiques"}>
          <div className="option-box flex flex-col justify-center items-center rounded-lg border border-primary bg-blue-100 p-4 text-black transition hover:bg-opacity-90 mr-4 cursor-pointer" style={{ height: "200px", width: "200px" }}>
            <div className="mb-1">
              <Image
                    src="/bar-chart-regular-24-negro.png"
                    alt="Icon3"
                    width={24}
                    height={24}
                    className="w-8 h-8 ml-5 mr-2 opacity-1"
              />
            </div>
            <p className="text-center text-2xl font-bold">{"Patologies Agudes"}</p>
          </div>
        </Link>
        <Link href={"/dashboard/malalties_estatiques"}>
          <div className="option-box flex flex-col justify-center items-center rounded-lg border border-primary bg-blue-100 p-4 text-black transition hover:bg-opacity-90 mr-4 cursor-pointer" style={{ height: "200px", width: "200px"}}>
            <div className="mb-1">
                <Image
                      src="/pie-chart-alt-2-regular-24 (1).png"
                      alt="Icon3"
                      width={24}
                      height={24}
                      className="w-8 h-8 ml-5 mr-2 opacity-1"
                />
              </div>
            <p className="text-center text-2xl font-bold">{"Malalties de prevalença"}</p>
          </div>
        </Link>
        <Link href={"/dashboard/table"}>
          <div className="option-box flex flex-col justify-center items-center rounded-lg border border-primary bg-blue-100 p-4 text-black transition hover:bg-opacity-90 mr-4 cursor-pointer" style={{ height: "200px", width: "200px" }}>
            <div className="mb-1">
                <Image
                      src="/table-regular-24-negro.png"
                      alt="Icon3"
                      width={24}
                      height={24}
                      className="w-8 h-8 ml-5 mr-2 opacity-1"
                />
              </div>
            <p className="text-center text-2xl font-bold">{"Descàrrega de dades"}</p>
          </div>
        </Link>
        <Link href={"/dashboard/estacions_meteo"}>
          <div className="option-box flex flex-col justify-center items-center rounded-lg border border-primary bg-blue-100 p-4 text-black transition hover:bg-opacity-90 mr-4 cursor-pointer" style={{ height: "200px", width: "200px" }}>
            <div className="mb-1">
                <Image
                      src="/cloud-lightning-regular-24 (1)-negro.png"
                      alt="Icon3"
                      width={24}
                      height={24}
                      className="w-8 h-8 ml-5 mr-2 opacity-1"
                />
              </div>
            <p className="text-center text-2xl font-bold">{"Estacions meteorològiques"}</p>
          </div>
        </Link>
        <Link href={"/dashboard/estacions_contaminacio"}>
          <div className="option-box flex flex-col justify-center items-center rounded-lg border border-primary bg-blue-100 p-4 text-black transition hover:bg-opacity-90 mr-4 cursor-pointer" style={{ height: "200px", width: "200px" }}>
            <div className="mb-1">
                <Image
                      src="/world-regular-24 (1).png"
                      alt="Icon3"
                      width={24}
                      height={24}
                      className="w-8 h-8 ml-5 mr-2 opacity-1"
                />
              </div>
            <p className="text-center text-2xl font-bold">{"Estacions de contaminació"}</p>
          </div>
        </Link>
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
