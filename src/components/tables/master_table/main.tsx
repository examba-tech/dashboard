"use client";

import VirtualTable from "@/src/components/tables/master_table/table";
import Filters from "@/src/components/tables/master_table/filters";
import * as React from "react";
import { MasterInterface } from "@/src/utils/interfaces";

export default function MasterTable({ data }: { data: MasterInterface[] }) {
  const [selectedValues, setSelectedValues] = React.useState<{
    [key: string]: string[];
  }>({
    cps: [],
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
      <VirtualTable data={data} selectedValues={selectedValues} />
      <div className="py-8"></div>
    </>
  );
}
