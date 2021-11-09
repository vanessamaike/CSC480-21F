import React, { useState } from "react";
import {
  Card,
  Typography,
  Container,
  CardContent,
  Stack,
  Breadcrumbs,
} from "@mui/material";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedContainer from "../../components/CustomizedContainer";
import bg from "../../images/multi_background_dashboard.jpg";
import CustomizedCard from "../../components/CustomizedCard";
import axios from "axios";
import { CSVReader } from "react-papaparse";
import CustomizedButtons from "../../components/CustomizedButtons";
import { Box } from "@mui/system";
import CustomizedBody from "../../components/CustomizedBody";
import CustomizedTextField from "../../components/CustomizedTextField";
import CustomizedCSVUploader from "../../components/CustomizedCSVUploader";

const buttonRef = React.createRef();

function AddCoursePage1({history}) {
  const [jsonData, setjsonData] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [csvFile, setCSVFile] = useState(null);

  console.log(csvFile);

  const handleIsSubmitted = () => {
    //axios.post("http://localhost9080", jsonData);
    console.log("sent!!");
    setIsSubmitted(!isSubmitted);
    handleRemoveFile();
  };

  const handleOnDrop = (data) => {
    const combinedData = data.map((object) => {
      return object.data;
    });
    setjsonData(combinedData);
    setIsUploaded(true);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    setjsonData([]);
    setIsUploaded(false);
  };
  const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  return (
    <CustomizedBody bg={bg}>
      <NavBar></NavBar>
      <CustomizedContainer>
        <Breadcrumbs aria-label="breadcrumb" mb={5} ml={2}>
          <Typography color="text.primary">Home</Typography>
          <Typography color="text.primary">Course</Typography>
          <Typography color="text.primary" style={{ fontWeight: "600" }}>
            Create Course
          </Typography>
        </Breadcrumbs>
        <Typography style={{ fontWeight: "600" }} variant="h6" component="div">
          Create Course
        </Typography>
        <div style={{ padding: "10px" }}></div>
        <CustomizedCard>
          <CardContent>
            <div style={{ width: "100%" }}>
              <Stack direction="column" spacing={2} sx={{ display: "flex" }}>
                <Typography
                  style={{ fontWeight: "600" }}
                  variant="body1"
                  component="div"
                >
                  Course Settings:
                </Typography>
                <Stack
                  direction="row"
                  spacing={4}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <CustomizedTextField>Course Title </CustomizedTextField>
                  <Typography
                    style={{ fontWeight: "600" }}
                    variant="body1"
                    component="div"
                  >
                    Course reference number (CRN) recommended
                  </Typography>
                </Stack>
                <Typography variant="body2" component="div">
                  Please upload the course student list CSV file provided by
                  your administrator.
                </Typography>
                <CustomizedCSVUploader
                  setCSVFile={setCSVFile}
                ></CustomizedCSVUploader>
              </Stack>
            </div>
          </CardContent>
        </CustomizedCard>
        <div style={{display: "flex", justifyContent: "flex-end", marginTop: "20px"}}>
          <Stack direction="row" spacing={2}>
            <CustomizedButtons type2 height1 onClick={() => {history.push("./professorhome")}}>
              Cancel
            </CustomizedButtons>
            <CustomizedButtons type1 height1 onClick={handleIsSubmitted}>
              Publish
            </CustomizedButtons>
          </Stack>
        </div>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default AddCoursePage1;
