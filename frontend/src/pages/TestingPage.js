import React, { useState } from "react";
import CustomizedTables from "../components/CustomizedTables";
import CSVUploader from "../components/CSVUploader";
import CustomizedContainer from "../components/CustomizedContainer";
import CustomizedButtons from "../components/CustomizedButtons";
import { Grid } from "@mui/material";

function TestingPage() {
  const [jsonData, setjsonData] = useState([]);
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent:"center", width: "100%" , margin: "20px"}}>
      <CSVUploader setjsonData={setjsonData}></CSVUploader>
      <CustomizedTables jsonData={jsonData.slice(0,-1)}></CustomizedTables> 
       <Grid container spacing={2}>
        <Grid item>
          <CustomizedButtons type1 model={"arrow"}>See All </CustomizedButtons>
        </Grid>
        <Grid item>
          <CustomizedButtons type2 model={"add"}>See All  </CustomizedButtons>
        </Grid>
        <Grid item>
          <CustomizedButtons type3 >See All </CustomizedButtons>
        </Grid>
      </Grid>
      
    </div>
    //<CustomizedContainer>ff</CustomizedContainer>
  )
}

export default TestingPage;
