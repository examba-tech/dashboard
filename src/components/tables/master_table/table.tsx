"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import * as Interfaces from "@/src/utils/interfaces";
import { montserrat } from "@/src/components/ui/fonts";

interface Data {
  date: string;
  cp: string;
  no: number;
  no2: number;
  so2: number;
  ingressos: number;
  poblacio: number;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

function createData(object: Interfaces.Master): Data {
  return {
    date: object.DATA.substring(0, 10),
    cp: object["CODI_MUNICIPAL"],
    no: object.NO,
    no2: object.NO2,
    so2: object.SO2,
    ingressos: object.INGRESSOS,
    poblacio: object.POBLACIO,
  };
}

const columns: ColumnData[] = [
  {
    width: 50,
    label: "Data",
    dataKey: "date",
  },
  {
    width: 25,
    label: "Codi Municipal",
    dataKey: "cp",
    numeric: true,
  },
  {
    width: 25,
    label: "NO",
    dataKey: "no",
    numeric: true,
  },
  {
    width: 25,
    label: "NO2",
    dataKey: "no2",
    numeric: true,
  },
  {
    width: 25,
    label: "SO2",
    dataKey: "so2",
    numeric: true,
  },
  {
    width: 25,
    label: "Visites",
    dataKey: "ingressos",
    numeric: true,
  },
  {
    width: 25,
    label: "Població",
    dataKey: "poblacio",
    numeric: true,
  },
];

const rows = (data: Interfaces.Master[]) => {
  return data.map((document) => createData(document));
};

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>(function SCRLLR(props, ref) {
    return <TableContainer component={Paper} {...props} ref={ref} />;
  }),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableRow: function TR({ item: _item, ...props }) {
    return <TableRow {...props} />;
  },
  TableBody: React.forwardRef<HTMLTableSectionElement>(function TBLRW(
    props,
    ref
  ) {
    return <TableBody {...props} ref={ref} />;
  }),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? "right" : "left"}
          style={{ width: column.width }}
          sx={{
            backgroundColor: "background.paper",
            fontSize: '16px',
            minWidth: column.width,
            maxWidth: column.width,
          }}
          className={montserrat.className} 
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Data) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? "right" : "left"}
          className={montserrat.className}
          sx={{
            minWidth: column.width,
            maxWidth: column.width,
          }}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function VirtualTable({
  filteredDataset,
}: {
  filteredDataset: Interfaces.Master[];
}) {
  return (
    <Paper style={{ height: 400, width: "100%" }}>
      <TableVirtuoso
        data={rows(filteredDataset)}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}