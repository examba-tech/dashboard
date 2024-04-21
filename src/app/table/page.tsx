"use client";

import * as React from "react";
import MasterTable from "@/src/components/tables/master_table/main";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Page = () => {
  const [master, setMaster] = React.useState([]);
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
    <>
      {loading && (
        <Box className="flex justify-center items-center h-96">
          <CircularProgress />
        </Box>
      )}
      {!loading && <MasterTable data={master} />}
    </>
  );
};

export default Page;
