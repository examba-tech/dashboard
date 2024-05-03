import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string, theme: Theme) {
  return {
    fontWeight:
      personName === name ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
  };
}

export default function SingleSelectChip({
  selectedValue,
  onSelectedValueChange,
  options,
  label,
  which_column,
}: {
  selectedValue: string;
  onSelectedValueChange: (attribute: string, value: string) => void;
  options: string[];
  label: string;
  which_column: string;
}) {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<string>) => {
    console.log("handleChange called");
    const {
      target: { value },
    } = event;

    onSelectedValueChange(which_column, value);
  };

  return (
    <>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-single-chip-label">{label}</InputLabel>
          <Select
            labelId="demo-single-chip-label"
            id="demo-single-chip"
            value={selectedValue}
            onChange={handleChange}
            input={<OutlinedInput id="select-single-chip" label={label} />}
            MenuProps={MenuProps}
          >
            {options.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, selectedValue, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}
