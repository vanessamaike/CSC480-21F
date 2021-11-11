import React, { useState } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { MdOutlineCancel } from "react-icons/md";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedTables from "../../components/CustomizedTables";

import bg from "../../images/multi_background_dashboard.jpg";
import {
  CardContent,
  Grid,
  Breadcrumbs
} from "@mui/material";
import CSVUploader from "../../components/CSVUploader";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import CustomizedBody from "../../components/CustomizedBody";

function ResultsViewerPage({ history }) {
  const [jsonData, setjsonData] = useState([]);
  return (
    <CustomizedBody bg={bg}>
      <NavBar fixed history={history}></NavBar>
      <CustomizedContainer>
      <Breadcrumbs aria-label="breadcrumb" mb={5} ml={2}>
          <Typography color="text.primary">Home</Typography>
          <Typography color="text.primary">Courses</Typography>
          <Typography color="text.primary">Course Name</Typography>
          <Typography color="text.primary" style={{fontWeight:"600"}}>New Assignment</Typography>
        </Breadcrumbs>
        <Grid container sx={{ marginBottom: "20px" }}>
          <Grid item xs={9}>
            <Typography
              style={{
                display: "flex",
                textAlign: "center",
                fontWeight: "600",
              }}
              variant="h6"
              component="div"
            >
              Student Information
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <CustomizedButtons type3 model={"checked"}>
              Send Results
            </CustomizedButtons>
          </Grid>
        </Grid>
        <div>
          <CustomizedCard>
            <CardContent
              sx={{
                paddingTop: "0",
              }}
            >
              <CSVUploader setjsonData={setjsonData}></CSVUploader>
              <CustomizedTables
                jsonData={jsonData.slice(0, -1)}
              ></CustomizedTables>
            </CardContent>
          </CustomizedCard>
        </div>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default ResultsViewerPage;
