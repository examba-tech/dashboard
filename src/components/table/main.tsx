"use client";

import ReactVirtualizedTable from "@/src/components/table/tables/virtualTable";
import Filters from "@/src/components/table/filters/main";
import * as React from "react";

export default function Main({ movies }) {
  const [selectedValues, setSelectedValues] = React.useState<{
    [key: string]: string[];
  }>({
    movie_names: [],
  });

  const handleSelectedValuesChange = (attribute: string, values: string[]) => {
    setSelectedValues(() => ({
      [attribute]: values,
    }));
  };

  return (
    <>
      {/* <div>
        <DenseTable movies={movies} />
      </div>
      <div className="py-8"></div> */}
      <Filters
        selectedValues={selectedValues}
        onSelectedValuesChange={handleSelectedValuesChange}
      />
      <div className="py-8" />
      <ReactVirtualizedTable movies={movies} selectedValues={selectedValues} />
      <div className="py-8"></div>
    </>
  );
}
