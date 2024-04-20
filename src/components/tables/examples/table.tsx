import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function DenseTable({ movies }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Movie</TableCell>
            <TableCell align="right">Director</TableCell>
            <TableCell align="right">Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.director}</TableCell>
              <TableCell align="right">{row.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
