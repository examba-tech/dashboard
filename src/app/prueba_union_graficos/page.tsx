import React from "react";
import MyLineChart from "@/src/components/charts/line_chart";
import MyBarChart from "@/src/components/charts/bar_chart";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";

const Page = async () => {
  const data = await getMongoCollection("visits");

  const visits = data && data.collection ? data.collection : [];

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr 1fr 1fr",
          gap: "150px",
          width: "900px",
          height: "600px",
        }}
      >
        <div style={{ gridColumn: "1 / 2", gridRow: "1 / 2" }}>
          <MyLineChart visits={visits} />
        </div>
        <div style={{ gridColumn: "1 / 2", gridRow: "2 / 3" }}>
          <MyBarChart visits={visits} />
        </div>
      </div>

      <div className="py-8"></div>
    </>
  );
};

export default Page;
