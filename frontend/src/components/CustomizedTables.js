import React, {useState, useEffect} from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { primaryColor, darkColor, grayColor, greenColor, whiteColor, blueColor } from "../styles/Style";
import { borderRadius } from "@mui/system";

export default function StickyHeadTable({jsonData}) {
  console.log(jsonData)
  const [arrayData, setarrayData] = useState([]);
  useEffect(() => {
      var result = [];
      for(var i in jsonData){
        var row = [];
        for(var j in jsonData[i]){
          row.push(jsonData[i][j]);
        }
        result.push(row)
      }
      setarrayData(result)
  }, [jsonData])
  console.log(arrayData)

  const label_1 = [
    { id: "name", label: "Team Name", align: "center", minWidth: 50 },
  ];
  const label_2 = [
    {
      id: "avggradereceived",
      label: "Avg Grade RECEIVED",
      align: "center",
      minWidth: 50,
    },
  ];
  const headers = arrayData.map((index, i) => {
    return {
      key: i,
      id: index[0],
      label: index[0],
      minWidth: 50,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    };
  });

  const columns = label_1.concat(headers);
  return (
    <Paper elevation={1} sx={{ width: "70%", overflow: "hidden", p: 2 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, indexCol) => {
                let bgColor;
                let color;
                if (indexCol == columns.length - 1) {
                  bgColor = greenColor
                  color = whiteColor
                }
                else{
                  bgColor = grayColor
                  color = darkColor
                }
                return <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    border: "0.01px solid #000",
                    backgroundColor: bgColor,
                    color: color,
                  }}
                >
                  {column.label}
                </TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {arrayData
              .map((row, indexRow) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column, indexCol) => {
                      let value = row[indexCol];
                      let bgColor;
                      let color;
                      {
                        if(indexCol == indexRow + 1 || indexCol == 0 && indexRow != arrayData.length - 1){
                          bgColor = primaryColor
                        }
                        else {
                          if (indexCol == columns.length - 1 && indexRow != arrayData.length - 1) {
                            bgColor = greenColor
                            color = whiteColor
                          }
                          else {
                            if (indexRow == arrayData.length - 1 && indexCol != columns.length - 1) {
                              bgColor = blueColor
                              color = whiteColor
                            }
                            else {
                              bgColor = whiteColor
                            }
                          }
                        }
                      }
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            color: color,
                            backgroundColor: bgColor,
                            border: "0.01px solid #000",
                          }}
                        >
                          {value != 0 ? value : ""}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
