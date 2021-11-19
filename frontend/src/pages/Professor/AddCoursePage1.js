import React, { useState,useEffect } from "react";
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
import { postNewCourseByProfessor } from "../../axios/APIRequests";

const buttonRef = React.createRef();

function AddCoursePage1({ history }) {
  const [newCourse, setNewCourse] = useState()
  const [title, setTitle] = useState("");
  const [section, setSection] = useState("");
  const [submissionType, setSubmissionType] = React.useState("Manually Set Teams");
  const [isTeamed, setIsTeamed] = useState(true);
  const [numberOfTeam, setNumberOfTeam] = React.useState(2);
  const [csvFile, setCSVFile] = useState(null);

  const [isDisabled, setIsDisabled] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
 
  useEffect(() => {
    const DiableTeamInput = () => {
      if(submissionType === "Randomized Teams"){
        setIsDisabled(!isDisabled)
        setIsTeamed(true)
      }
      else if (submissionType === "Independent"){
        setIsTeamed(false)
      }
      else{
        setIsTeamed(true)
      }
    }
    DiableTeamInput()
  }, [submissionType])

  const handleAddCourse = () => {
    if( title==="" || section === "" )
    {
      console.log("error")
    }
    else{
    var newCourse = {
      userID: 87369,
      "title": title,
      "code": title,
      "sectionNumber": section,
    };
    var json = {
      "csvContents": csvFile,
      "isTeamed": isTeamed,
      "numberOfTeams": numberOfTeam,
      "course": newCourse,
    };
    const json_ = JSON.stringify(json);
    
    postNewCourseByProfessor(json_)
      .then(function (response) {
        setIsPublishing(false)
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
        
        <>
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
                  <CustomizedTextField value={title} handleTextFieldChange={setTitle}>
                    Course Title{" "}
                  </CustomizedTextField>
                  <Typography
                    style={{ fontWeight: "600" }}
                    variant="body1"
                    component="div"
                  >
                    Course reference number (CRN) recommended
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={4}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <CustomizedTextField value={section} handleTextFieldChange={setSection}>
                    Course Section{" "}
                  </CustomizedTextField>
                  
                </Stack>
                <Typography
                  style={{ fontWeight: "600" }}
                  variant="body1"
                  component="div"
                >
                  Please select team settings:
                </Typography>
                <Stack direction="row" spacing={1}>

                <CustomizedButtons
                  type4
                  model={"radio4"}
                  filterType={submissionType}
                  setFilterType={setSubmissionType}
                ></CustomizedButtons>
                <CustomizedTextField
                  handleTextFieldChange={setNumberOfTeam}
                  number
                  isDisabled={isDisabled}
                >
                  Teams
                </CustomizedTextField>
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Stack direction="row" spacing={2}>
            <CustomizedButtons
              type2
              height1
              onClick={() => {
                history.push("./professorhome");
              }}
            >
              Cancel
            </CustomizedButtons>
            <CustomizedButtons
              type1
              height1
              onClick={handleAddCourse}
            >
              Publish
            </CustomizedButtons>
          </Stack>
        </div>
        </>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default AddCoursePage1;
