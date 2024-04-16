"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";

interface Data {
  movie: string;
  director: string;
  year: number;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

function createData(object: any): Data {
  return { movie: object.title, director: object.director, year: object.year };
}

const columns: ColumnData[] = [
  {
    width: 200,
    label: "Movie",
    dataKey: "movie",
  },
  {
    width: 120,
    label: "Director",
    dataKey: "director",
  },
  {
    width: 120,
    label: "Year",
    dataKey: "year",
    numeric: true,
  },
];

const rows = (movies: any) =>
  Array.from({ length: movies.length > 0 ? 100000 : 0 }, (_) => {
    const randomSelection = movies[Math.floor(Math.random() * movies.length)];
    return createData(randomSelection);
  });

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
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{
            backgroundColor: "background.paper",
          }}
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
          align={column.numeric || false ? "right" : "left"}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function ReactVirtualizedTable({ movies, selectedValues }) {
  const filteredDataset = movies.filter(
    (item) =>
      selectedValues.movie_names.length == 0 ||
      selectedValues.movie_names.includes(item.Movie)
  );
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
