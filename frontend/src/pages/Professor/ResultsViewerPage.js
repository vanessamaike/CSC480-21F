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
  CardHeader,
  Divider,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Modal,
  Fade,
} from "@mui/material";
import CSVUploader from "../../components/CSVUploader";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";

function ResultsViewerPage({ history }) {
  const [jsonData, setjsonData] = useState([]);
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        height: "80vh",
        backgroundSize: "cover",
        paddingTop: "150px",
      }}
    >
      <NavBar fixed history={history}></NavBar>
      <CustomizedContainer>
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
    </div>
  );
}

export default ResultsViewerPage;
