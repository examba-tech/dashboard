import React from "react";
import SingleSelectChip from "@/src/app/dashboard/patologies_agudes/select";

interface FiltersProps {
  selectedDiagnostic: string;
  onDiagnosticChange: (diagnostic: string) => void;
}

const Filter_diagnostic: React.FC<FiltersProps> = ({
  selectedDiagnostic,
  onDiagnosticChange,
}) => {
  return (
    <div>
      <SingleSelectChip
        selectedValue={selectedDiagnostic}
        onSelectedValueChange={(column, value) => onDiagnosticChange(value)}
        options={[
          "TOTS",
          "ASMA",
          "BRONQUITIS_CRONICA",
          "MPOC_MIXTE",
          "BRONQUIECTASIES",
          "OTHER",
          "NEOPLASIA_PULMONAR",
          "ENFISEMA",
          "FIBROSI_PULMONAR",
          "AGENTS_EXTERNS",
        ]}
        label="Selecciona un diagnòstic"
        which_column="DIAGNOSTIC"
      />
    </div>
  );
};

export default Filter_diagnostic;
