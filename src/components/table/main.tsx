"use client";

import ReactVirtualizedTable from "@/src/components/table/tables/virtualTable";
import Filters from "@/src/components/table/filters/main";
import React, { useState } from "react";

export default function Main({ movies }) {
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string[];
  }>({
    movie_names: [],
  });

  const handleSelectedValuesChange = (attribute: string, values: string[]) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [attribute]: values,
    }));
  };

  console.log(selectedValues);

  return (
    <>
      {/* <div>
        <DenseTable movies={movies} />
      </div>
      <div className="py-8"></div> */}
      <Filters onSelectedValuesChange={handleSelectedValuesChange} />
      <div className="py-8" />
      <ReactVirtualizedTable movies={movies} selectedValues={selectedValues} />
      <div className="py-8"></div>
    </>
  );
}
