import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Date from "@/src/components/table/filters/date";
import MultipleSelectChip from "@/src/components/table/filters/select";

export default function Filters({ selectedValues, onSelectedValuesChange }) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="md:text-center"
        >
          Filters
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-row">
            <Date />
            <MultipleSelectChip
              selectedValues={selectedValues}
              onSelectedValuesChange={onSelectedValuesChange}
              names={[
                "The Dark Knight",
                "Gladiator",
                "Inglourious Basterds",
                "The Lord of the Rings: The Two Towers",
              ]}
              which_column="movie_names"
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
