import React from "react";
import MyBarChart from "@/src/components/charts/bar_chart";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";

const Page = async () => {
  const data = await getMongoCollection("visits");

  const visits = data && data.collection ? data.collection : [];

  return (
    <>
      <div>
        <MyBarChart visits={visits} />
      </div>
      <div className="py-8"></div>
    </>
  );
};

export default Page;
