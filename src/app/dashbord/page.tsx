import React from "react";
import MyLineChart from "@/src/components/charts/line_chart";

const getVisits = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/Visits", {
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
  const a = await getVisits();

  const visits = a && a.visits ? a.visits : [];

console.log(visits)
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
