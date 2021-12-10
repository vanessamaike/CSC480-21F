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
import CustomizedContainer from "../../components/CustomizedContainer";
import CustomizedTextField from "../../components/CustomizedTextField";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedPdfUploader from "../../components/CustomizedPdfUploader";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import {
  editAssignmentByProfessor,
  getSpecificAssignment,
} from "../../axios/APIRequests";
import Loading from "../../components/Loading";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function AssignmentEdit({ history, location }) {
  const [loading, setLoading] = React.useState(true);
  const [newAssignment, setNewAssignment] = useState();
  const [assignment, setAssignment] = useState();
  const [title, setTitle] = useState("");
  const [solutionPdfDoc, setSolutionPdfDoc] = useState([]);
  const [peerReviewPdfDoc, setPeerReviewPdfDoc] = useState([]);
  const [solutionPdfFileName, setSolutionPdfFileName] = useState("");
  const [peerReviewPdfFileName, setPeerReviewPdfFileName] = useState("");
  const [solutionDueDate, setSolutionDueDate] = useState(new Date());
  const [prDueDate, setPRDueDate] = useState(new Date());
  useEffect(() => {
    if (assignment !== undefined && assignment.length !== 0) {
      setTitle(assignment.title);
      setSolutionDueDate(new Date(assignment.solutionDueDateTime));
      setPRDueDate(new Date(assignment.peerReviewDueDateTime));
      setSolutionPdfFileName(assignment.solutionPdfFileName);
      setPeerReviewPdfFileName(assignment.peerReviewPdfFileName);
      setSolutionPdfDoc(assignment.solutionPdfDoc);
      setPeerReviewPdfDoc(assignment.peerReviewPdfDoc);
      setLoading(false);
    }
  }, [assignment]);
  useEffect(() => {
    var assignmentID = location.state.assignmentID
    getSpecificAssignment(assignmentID)
    .then((value) => {
      console.log(value);
      setAssignment(value);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  console.log(newAssignment);
  useEffect(() => {
    const generateAssignment = () => {
      setNewAssignment({
        ...assignment,
        courseID: location.state.courseID,
        title: title,
        solutionPdfDoc: solutionPdfDoc,
        peerReviewPdfDoc: peerReviewPdfDoc,
        solutionPdfFileName: solutionPdfFileName,
        peerReviewPdfFileName: peerReviewPdfFileName,
        solutionDueDateTime: solutionDueDate.toJSON().split(".")[0],
        peerReviewDueDateTime: prDueDate.toJSON().split(".")[0],
      });
    };

    generateAssignment();
  }, [title, solutionPdfDoc, peerReviewPdfDoc, solutionDueDate, prDueDate]);

  const handleApplyChange = () => {
    if (
      title === "" ||
      solutionPdfDoc.length === 0 ||
      peerReviewPdfDoc.length === 0
    ) {
      console.log("Error");
    } else {
      const json = JSON.stringify(newAssignment);
      console.log(json);
      editAssignmentByProfessor(newAssignment)
        .then(function (response) {
          history.push("/assignmentdisplay", {
            assignmentID: assignment.assignmentID,
            courseID: location.state.courseID,
          });
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
          <>
          {loading === true ? (
            <Loading />
          ) : (
            <>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              style={{ fontWeight: "600" }}
              variant="body1"
              component="div"
            >
              Build New Assignment
            </Typography>

            <CustomizedButtons onClick={handleApplyChange} type1>
              Apply Changes
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
                    ‘Solution’ and ‘Peer Review’ will be added to title in their
                    respective phases.
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
                    setPdfFile={setSolutionPdfDoc}
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
                  displayed within Peer Review Assignment. Please note that peer
                  reviews must be manually sent for review by professors after
                  quality checking.
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
                    setPdfFile={setPeerReviewPdfDoc}
                  ></CustomizedPdfUploader>
                </Stack>
              </Stack>
            </CardContent>
          </CustomizedCard>
          </>
          )}
        </>
        </CustomizedContainer>
      </>
    </CustomizedBody>
  );
}

export default AssignmentEdit;
