import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Date from "@/src/components/filters/Date";
import MultipleSelectChip from "@/src/components/filters/Select";

export default function Filters() {
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
            <MultipleSelectChip />
            <MultipleSelectChip />
        </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
