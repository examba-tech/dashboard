import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MultipleSelectChip from "@/src/components/ui/filters/select";
import { montserrat } from "@/src/components/ui/fonts";

export default function Filters({
  selectedValues,
  onSelectedValuesChange,
}: {
  selectedValues: { [key: string]: string[] };
  onSelectedValuesChange: (attribute: string, values: string[]) => void;
}) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className={`${montserrat.className} md:text-center`}
        >
          Filtres
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-row">
            <MultipleSelectChip
              selectedValues={selectedValues}
              onSelectedValuesChange={onSelectedValuesChange}
              names={[
                "080898",
                "081141",
                "081574",
                "081960",
                "082634",
                "083015",
                "083073",
              ]}
              which_column="cps"
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
