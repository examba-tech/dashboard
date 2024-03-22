import React from "react";
import MyLineChart from "@/src/components/charts/line_chart";

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

const Page = async () => {
  const data = await getVisits();

  const visits = data && data.visits ? data.visits : [];

  return (
    <>
      <div>
        <MyLineChart visits={visits} />
      </div>
      <div className="py-8"></div>
    </>
  );
};

export default Page;
