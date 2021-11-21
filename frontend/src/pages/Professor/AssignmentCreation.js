import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// @mui components
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Container,
  Typography,
  Box,
  Stack,
  Radio,
  Breadcrumbs,
} from "@mui/material";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import bg from "../../images/multi_background_dashboard.jpg";
import TextField from "@mui/material/TextField";
import CustomizedBody from "../../components/CustomizedBody";
// Worker
import { Document, Page, pdfjs } from "react-pdf";
import { useSelector, useDispatch } from "react-redux";
import CustomizedContainer from "../../components/CustomizedContainer";
import CustomizedTextField from "../../components/CustomizedTextField";
import CustomizedRadios from "../../components/CustomizedRadios";
import CustomizedCard from "../../components/CustomizedCard";
import AssignmentViewer from "./AssignmentViewer";
import CustomizedPdfUploader from "../../components/CustomizedPdfUploader";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { postNewAssignmentByProfessor } from "../../axios/APIRequests";
import { ConsoleView } from "react-device-detect";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function AssignmentCreation({ history, location }) {
  const [newAssignment, setNewAssignment] = useState();
  const [title, setTitle] = useState("");
  const [solutionPdfFile, setSolutionPdfFile] = useState([]);
  const [peerReviewPdfFile, setPeerReviewPdfFile] = useState([]);
  const [solutionDueDate, setSolutionDueDate] = useState(new Date());
  const [prDueDate, setPRDueDate] = useState(new Date());
  const [solutionPdfFileName, setSolutionPdfFileName] = useState("");
  const [peerReviewPdfFileName, setPeerReviewPdfFileName] = useState("");
  var ErrorMessage = "Please fill out !!!"
  const [disablePublishBtn, setDisablePublishBtn] = useState(true)
  useEffect(() => {
    if (location.state.assignment == undefined) return
      var assignment = location.state.assignment;
      console.log(assignment)
      setTitle(assignment.title);
      setSolutionDueDate(new Date(assignment.solutionDueDateTime))
      setPRDueDate(new Date(assignment.peerReviewDueDateTime))
      setSolutionPdfFileName(assignment.solutionPdfFileName)
      setPeerReviewPdfFileName(assignment.peerReviewPdfFileName)
      setSolutionPdfFile(assignment.solutionPdfDoc)
      setPeerReviewPdfFile(assignment.peerReviewPdfDoc)

    if ( title === "" || solutionPdfFile.length === 0 ||  peerReviewPdfFile.length === 0) {
      setDisablePublishBtn(true)  
      return
    }
    setDisablePublishBtn(false)
  }, []);

  useEffect(() => {
    const generateAssignment = () => {
      setNewAssignment({
        courseID: location.state.courseID,
        settings: "settings",
        title: title,
        draft: true,
        solutionPdfDoc: solutionPdfFile,
        peerReviewPdfDoc: peerReviewPdfFile,
        solutionPdfFileName : solutionPdfFileName,
        peerReviewPdfFileName:peerReviewPdfFileName,
        solutionDueDateTime: solutionDueDate.toJSON().split(".")[0],
        peerReviewDueDateTime: prDueDate.toJSON().split(".")[0],
      });
    };
    
    generateAssignment();
  }, [title, solutionPdfFile, peerReviewPdfFile,solutionPdfFileName,peerReviewPdfFileName, solutionDueDate, prDueDate]);

  const handlePreview = () => {
    
    if (
      title === "" ||
      solutionPdfFile.length === 0 ||
      peerReviewPdfFile.length === 0
    ) {
        alert(ErrorMessage)
    } else{
      var assignment = {
        courseID: location.state.courseID,
        settings: "settings",
        title: title,
        solutionPdfDoc: solutionPdfFile,
        peerReviewPdfDoc: peerReviewPdfFile,
        solutionPdfFileName : solutionPdfFileName,
        peerReviewPdfFileName:peerReviewPdfFileName,
        solutionDueDateTime: solutionDueDate,
        peerReviewDueDateTime: prDueDate,
      }
      console.log(assignment)
        history.push("./assignmentviewer", {assignment: assignment , 
          courseID: location.state.courseID 
        })
    }
   
  }
  const handleSaveDraft = () => {
    if (
      title === "" ||
      solutionPdfFile.length === 0 ||
      peerReviewPdfFile.length === 0
    ) {
      alert(ErrorMessage)
    } else {
      const json = JSON.stringify(newAssignment);
      console.log(json);
      postNewAssignmentByProfessor(json)
        .then(function (response) {
          console.log(response);
          history.push("/course");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handlePublish = () => {
    if (
      title === "" ||
      solutionPdfFile.length === 0 ||
      peerReviewPdfFile.length === 0
    ) {
      alert(ErrorMessage)
    } else {
      var tempAss = {...newAssignment, draft: false}
      console.log(tempAss)
      const json = JSON.stringify(tempAss);
      console.log(json);
      postNewAssignmentByProfessor(json)
        .then(function (response) {
          console.log(response);
          history.push("/course");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <CustomizedBody bg={bg}>
      <NavBar fixed></NavBar>
      <>
      <CustomizedContainer>
            <Breadcrumbs aria-label="breadcrumb" mb={5} ml={2}>
              <Typography color="text.primary">Home</Typography>
              <Typography color="text.primary">Courses</Typography>
              <Typography color="text.primary">Course Name</Typography>
              <Typography color="text.primary" style={{ fontWeight: "600" }}>
                New Assignment
              </Typography>
            </Breadcrumbs>
            <Stack direction="row" justifyContent="space-between" alignItems="center">

                <Typography
                  style={{ fontWeight: "600" }}
                  variant="body1"
                  component="div"
                >
                  Build New Assignment
                </Typography>
                <CustomizedButtons
                  type2
                  onClick={handlePreview}
                >
                  Preview
                </CustomizedButtons>
            </Stack>

            {/* First Box */}
            <CustomizedCard sx={{ marginBottom: "30px", marginTop: "30px" }}>
              <CardContent>
                <Stack direction="column" spacing={2}>
                  <Typography
                    style={{
                      fontWeight: "600",
                    }}
                    variant="body1"
                    component="div"
                  >
                    Title Assignment:
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <CustomizedTextField
                      value={title}
                      handleTextFieldChange={setTitle}
                    >
                      Title
                    </CustomizedTextField>
                    <Typography
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "600",
                      }}
                      variant="body1"
                      component="div"
                    >
                      ‘Solution’ and ‘Peer Review’ will be added to title in
                      their respective phases.
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </CustomizedCard>

            {/* second box */}
            <CustomizedCard sx={{ marginBottom: "30px" }}>
              <CardContent>
                <Stack direction="column" spacing={2}>
                  <Typography
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      fontWeight: "600",
                    }}
                    variant="body1"
                    component="div"
                  >
                    Solution Assignment Content:
                  </Typography>
                  <Typography variant="body2" component="div">
                    Please set the due date and upload instruction PDFs to be
                    displayed within solution assignment.
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Solution Due Date"
                        value={solutionDueDate}
                        onChange={(newValue) => {
                          setSolutionDueDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                    <CustomizedPdfUploader
                      id="solution"
                      pdfFileName={solutionPdfFileName}
                      setPdfFileName={setSolutionPdfFileName}
                      setPdfFile={setSolutionPdfFile}
                    ></CustomizedPdfUploader>
                  </Stack>
                </Stack>
              </CardContent>
            </CustomizedCard>

            {/* third box */}
            <CustomizedCard sx={{ marginBottom: "30px" }}>
              <CardContent>
                <Stack direction="column" spacing={2}>
                  <Typography
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      fontWeight: "600",
                    }}
                    variant="body1"
                    component="div"
                  >
                    Peer Review Assignment Content:
                  </Typography>
                  <Typography variant="body2" component="div">
                    Please set the due date and upload instruction PDFs to be
                    displayed within Peer Review Assignment. Please note that
                    peer reviews must be manually sent for review by professors
                    after quality checking.
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Peer Review Due Date"
                        value={prDueDate}
                        onChange={(newValue) => {
                          setPRDueDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                    <CustomizedPdfUploader
                      id="peerReview"
                      pdfFileName={peerReviewPdfFileName}
                      setPdfFileName={setPeerReviewPdfFileName}
                      setPdfFile={setPeerReviewPdfFile}
                    ></CustomizedPdfUploader>
                  </Stack>
                </Stack>
              </CardContent>
            </CustomizedCard>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                margintop: "10px",
              }}
            >
              <Stack direction="row" spacing={2}>
                <CustomizedButtons type2 model={"type2"} onClick={handleSaveDraft}>
                Save Draft
              </CustomizedButtons>
              <CustomizedButtons onClick={handlePublish} type1 >
                Publish
              </CustomizedButtons>
              </Stack>
              
            </Grid>
          </CustomizedContainer>
      </>
    </CustomizedBody>
  );
}

export default AssignmentCreation;
