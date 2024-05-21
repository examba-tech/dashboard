"use client";

import "dayjs/locale/ca";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function MonthRange() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ca">
        <DatePicker
          label={"Data Inici"}
          openTo="month"
          views={["year", "month"]}
        />
      </LocalizationProvider>
      <span className="px-6" />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ca">
        <DatePicker
          label={"Data Fi"}
          openTo="month"
          views={["year", "month"]}
        />
      </LocalizationProvider>
    </>
  );
}
