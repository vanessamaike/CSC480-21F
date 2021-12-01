import React, {useState, useEffect} from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { primaryColor, darkColor, grayColor, greenColor, whiteColor, blueColor } from "../styles/Style";
import { borderRadius, Box } from "@mui/system";

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
    { id: "name", label: "Team Name", align: "center", width: 20 },
  ];
  const label_2 = [
    {
      id: "avggradereceived",
      label: "Avg Grade RECEIVED",
      align: "center",
      width: 20,
    },
  ];
  const headers = arrayData.map((index, i) => {
    return {
      key: i,
      id: index[0],
      label: index[0],
      width: 20,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    };
  });

  const columns = label_1.concat(headers);
  return (
    <Box sx={{ width: "100%"}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow >
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
                    width: "10px",
                    height: "10px",
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} style={{
                    width: "10px",
                    height: "10px"}}>
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
                            width: "10px",
                            height: "10px",
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
    </Box>
  );
}
