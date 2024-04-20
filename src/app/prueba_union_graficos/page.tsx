import React from "react";
import MyLineChart from "@/src/components/charts/line_chart";
import MyBarChart from "@/src/components/charts/bar_chart";
import ReactVirtualizedTable from "@/src/components/table/tables/virtualTable";

const getVisits = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/mongo/visits", {
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

const getMovies = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/mongo/movies", {
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
  const data = await getVisits();

  const visits = data && data.collection ? data.collection : [];

  const dataa = await getMovies();

  const movies = dataa && dataa.collection ? dataa.collection : [];

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
        <div style={{ gridColumn: "1 / 2", gridRow: "3 / 4" }}>
          <ReactVirtualizedTable movies={movies} />
        </div>
      </div>

      <div className="py-8"></div>
    </>
  );
};

export default Page;
