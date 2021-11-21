import React, { useState,useEffect } from "react";
import {
  Card,
  Typography,
  Container,
  CardContent,
  Stack,
  Breadcrumbs,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
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
  const [submissionType, setSubmissionType] = React.useState("Manually Set Teams");
  const [isTeamed, setIsTeamed] = useState(true);
  const [numberOfTeam, setNumberOfTeam] = React.useState(2);
  const [csvFile, setCSVFile] = useState(null);
  var ErrorMessage = "Please fill out !!!"
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const handleChangeTeams = (event) => {
    setNumberOfTeam(event.target.value);
  };
  useEffect(() => {
    const DiableTeamInput = () => {
      if(submissionType === "Randomized Teams"){
        setIsDisabled(false)
        setIsTeamed(true)
      }
      else if (submissionType === "Independent"){
        setIsDisabled(true)
        setIsTeamed(false)
      }
      else{
        setIsTeamed(true)
      }
    }
    DiableTeamInput()
  }, [submissionType])

  const handleAddCourse = () => {
    if( title===""  || csvFile === null)
    {
      alert(ErrorMessage)
    }
    else{
    var newCourse = {
      userID: 34189,
      "title": title,
      "isTeamed": isTeamed,
      "code": title,
    };
    var json = {
      "csvContents": csvFile,
      "numberOfTeams": numberOfTeam,
      "course": newCourse,
    };
    const json_ = JSON.stringify(json);
    
    postNewCourseByProfessor(json_)
      .then(function (response) {
        console.log(response);
        history.push("./course")
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
          <Typography
            style={{ fontWeight: "600" }}
            variant="h6"
            component="div"
          >
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
                    <CustomizedTextField
                      value={title}
                      handleTextFieldChange={setTitle}
                    >
                      Course Title To Display{" "}
                    </CustomizedTextField>
                    <Typography
                      style={{ fontWeight: "600" }}
                      variant="body1"
                      component="div"
                    >
                      Course reference number (CRN) recommended
                    </Typography>
                  </Stack>
                  <Typography
                    style={{ fontWeight: "600" }}
                    variant="body1"
                    component="div"
                  >
                    Please select team settings:
                  </Typography>
                  <Stack direction="row" spacing={1} >
                    <CustomizedButtons
                      type4
                      model={"radio4"}
                      filterType={submissionType}
                      setFilterType={setSubmissionType}
                    ></CustomizedButtons>
                    <FormControl sx={{ width: "100px", height: "10px" }} disabled={isDisabled}>
                      <InputLabel id="demo-simple-select-label">
                        Teams
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={numberOfTeam}
                        label="Teams"
                        onChange={handleChangeTeams}
                      >
                        {Array.from(Array(5).keys()).map((index, key) => (
                          <MenuItem value={index + 2} key={key}>
                            {index + 2}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
              <CustomizedButtons type1 height1 onClick={handleAddCourse}>
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
