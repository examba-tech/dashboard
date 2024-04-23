import React from "react";
import MyLineChart from "@/src/components/charts/line_chart";
import MyBarChart from "@/src/components/charts/bar_chart";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";
import Waterfall from "@/src/components/charts/waterfall_comparativa_meses";
import ReactVirtualizedTable from "@/src/components/table/VirtualTable";

const getVisits = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Visits", {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const getMovies = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Movies", {
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

const getICS = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/info_ICS", {
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


const Page = async () => {
  const data = await getMongoCollection("visits");

  const visits = data && data.collection ? data.collection : [];

  const data3 = [
    { name: 'Jan', thisYear: 4000, lastYear: 2400 },
    { name: 'Feb', thisYear: -3000, lastYear: 1398 },
    { name: 'Mar', thisYear: -2000, lastYear: -9800 },
    { name: 'Apr', thisYear: 2780, lastYear: 3908 },
    { name: 'May', thisYear: -1890, lastYear: 4800 },
    { name: 'Jun', thisYear: 2390, lastYear: -3800 },
    { name: 'Jul', thisYear: 3490, lastYear: 4300 },
    { name: 'Aug', thisYear: 4000, lastYear: 2400 },
    { name: 'Sep', thisYear: -3000, lastYear: 1398 },
    { name: 'Oct', thisYear: -2000, lastYear: -9800 },
    { name: 'Nov', thisYear: 2780, lastYear: 3908 },
    { name: 'Dec', thisYear: -1890, lastYear: 4800 },
  ];

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr 1fr 1fr', gap: '150px', width: '900px', height: '600px' }}>
        <div style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }}>
          <MyLineChart visits={visits} />
        </div>
        <div style={{ gridColumn: '1 / 2', gridRow: '2 / 3' }}>
          <Waterfall data={data3}/>
        </div>
        <div style={{ gridColumn: '1 / 2', gridRow: '3 / 4' }}>
          <ReactVirtualizedTable movies={movies} />
        </div>
      </div>
      <div className="py-8"></div>
    </>
  );
};

export default Page;
