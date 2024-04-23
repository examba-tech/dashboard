"use client";

import VirtualTable from "@/src/components/tables/master_table/table";
import Filters from "@/src/components/tables/master_table/filters";
import * as React from "react";
import * as Interfaces from "@/src/utils/interfaces";
import * as Utils from "@/src/utils/utils";
import { Button } from "@/src/components/ui/Button";

export default function MasterTable({ data }: { data: Interfaces.Master[] }) {
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

  const filteredDataset = data.filter(
    (item) =>
      selectedValues.cps.length == 0 ||
      selectedValues.cps.includes(item["CODI MUNICIPAL"])
  );

  return (
    <>
      <Filters
        selectedValues={selectedValues}
        onSelectedValuesChange={handleSelectedValuesChange}
      />
      <div className="py-8" />

      <VirtualTable filteredDataset={filteredDataset} />
      <div className="py-8"></div>

      {filteredDataset.length > 0 && (
        <div className="text-center">
          <Button
            onClick={() => Utils.downloadCSV("master.csv", filteredDataset)}
          >
            {" "}
            Descarrega dades{" "}
          </Button>
        </div>
      )}
    </>
  );
}
