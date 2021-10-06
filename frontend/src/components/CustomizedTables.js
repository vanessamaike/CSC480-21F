import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { secondaryColor, primaryColor, fontColor } from "../styles/Style";
import { borderRadius } from "@mui/system";

const rows = [
  ["An98Wi00", "0", "15", "0", "0", "0", "15", "0", "14", "0", "14.67"],
  ["Br00Mi99", "9", "0", "14.25", "0", "12.5", "0", "0", "0", "0", "11.92"],
  ["Br99Da99", "0", "0", "0", "0", "0", "0", "14.25", "10.5", "13", "12.58"],
  ["Ch99Sa00", "0", "15", "10.5", "0", "0", " 14.5", "0", "0", "0", "13.33"],
  ["D099", "0", "0", "13", "10", "0", "0", "11.5", "0", "0", "11.50"],
  ["Na99Ma96", "15", "0", "0", "12.5", "0", "0", "0", "0", "14", "13.83"],
  ["Pa99Mi99", "0", "0", "0", "13", "15", "0", "0", "0", "13.75", "14.08"],
  ["Po04Ch97", "8.5", "15", "0", "0", "0", "0", "0", "13", "0", "12.17"],
];

const label = [{ id: 'name', label: 'Team Name', minWidth: 50 }]

const headers = rows.map((index) => {
  return {
    id: index[0],
    label: index[0],
    minWidth: 50,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  };
});
const columns = label.concat(headers)

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, border: "0.01px solid #000000", backgroundColor: primaryColor}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, indexRow) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                    {columns.map((column, indexCol) => {
                      let value = row[indexCol];
                      let bgColor;
                      {(indexCol == (indexRow + 1) || indexCol == 0) ? (bgColor=primaryColor) : (bgColor=secondaryColor)}
                      return (
                        <TableCell key={column.id} align={column.align} style={{ backgroundColor: bgColor, border: "0.01px solid #000000"}}>
                          {value != 0
                            ? value : ""}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
