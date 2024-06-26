import React from "react";
import SingleSelectChip from "@/src/app/dashboard/patologies_agudes/select";

interface FiltersProps {
  selectedDiagnostic: string;
  onDiagnosticChange: (diagnostic: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedDiagnostic,
  onDiagnosticChange,
}) => {
  return (
    <div>
      <SingleSelectChip
        selectedValue={selectedDiagnostic}
        onSelectedValueChange={(column, value) => onDiagnosticChange(value)}
        options={[
          "Tots",
          "INFECCIONS_AGUDES_TRS",
          "BRONQUITIS_AGUDA",
          "GRIP",
          "BRONQUIOLITIS_AGUDA",
          "PNEUMONIA_BACTERIANA",
          "PNEUMONIA_VIRICA",
        ]}
        label="Selecciona un diagnòstic"
        which_column="DIAGNOSTIC"
      />
    </div>
  );
};

export default Filters;
