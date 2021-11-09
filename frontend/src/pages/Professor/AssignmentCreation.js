import React, { useState } from "react";
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
} from "@mui/material";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import bg from "../../images/multi_background_dashboard.jpg";
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { secondaryColor, primaryColor, darkColor, blueColor, greenColor, purpleColor } from "../../styles/Style";
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { red } from "@mui/material/colors";
import { Document, Page, pdfjs } from 'react-pdf';
import { useSelector, useDispatch } from "react-redux";
import {selectPdf} from '../../features/pdfSlice'
import { setPdf } from "../../features/pdfSlice";
import CustomizedContainer from "../../components/CustomizedContainer";
import axios from "axios";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function AssignmentCreation(){
    const [title, setTitle] = useState('');
    const [solutionDueDate, setSolutionDueDate] = useState('');
    const [prDueDate, setPRDueDate] = useState('');
    const dispatch = useDispatch();
    // for onchange event
    const [pdfFile, setPdfFile]=useState(null);
    const [pdfFileError, setPdfFileError]=useState('');
    const getPdf = useSelector(selectPdf)
    const {viewPdf} =getPdf
    console.log(getPdf)
    // for submit event
  
    const fileType=['application/pdf'];
    const handlePdfFileChange=(e)=>{
      let selectedFile=e.target.files[0];
      if(selectedFile){
        if(selectedFile&&fileType.includes(selectedFile.type)){
          let reader = new FileReader();
              reader.readAsDataURL(selectedFile);
              reader.onloadend = (e) =>{
                setPdfFile(e.target.result);
                setPdfFileError('');
                axios.post("pi.cs.oswego.edu:9081/api/assignment", e.target.result);
                console.log(e.target.result)
              }
        }
        else{
          setPdfFile(null);
          setPdfFileError('Please select valid pdf file');
        }
      }
      else{
        console.log('select your file');
      }
    }
    const handlePdfFileSubmit=(e)=>{
      e.preventDefault();
      if(pdfFile!==null){

        dispatch(setPdf(pdfFile))
      }
      else{

        dispatch(setPdf(null))
      }
    }

    return (
        <div
            style={{
                backgroundImage: `url(${bg})`,
                height: "80vh",
                backgroundSize: "cover",
                paddingTop: "150px",
            }}
        >
            <NavBar fixed ></NavBar>
            <CustomizedContainer
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item xs={8}>
                        <Typography
                            style={{ fontWeight: "300" }}
                            variant="h5"
                            component="div"
                        >
                            Build New Assignment
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={2}>
                    <Link
                        to="/assignmentviewer"
                        style={{ textDecoration: "none", color: "#000" }}
                        >
                  <CustomizedButtons type2 >Preview</CustomizedButtons>
                </Link>
                    </Grid>
                </Grid>

                {/* First Box */}
                <div>
                <Grid item xs={11.1}>
                    <Card
                        variant="outlined"
                        sx={{
                            overflow: "hidden",
                            p: 2,
                            border: "3px solid #fff",
                            borderRadius: "10px",
                            marginTop: "10px",
                        }}
                    >
                        <CardHeader
                            title={
                                <Stack>
                                    <Typography
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            fontWeight: "500",
                                            margin: "4px",
                                        }}
                                        variant="h6"
                                        component="div"
                                    >
                                        Title Assignment:
                                    </Typography>
                                    <Box
                                        sx={{
                                           
                                        }}
                                    >
                                        <Box sx={{display: "flex", marginBottom: "20px"}}>
                                        <TextField placeholder="Title" onChange={(e) => setTitle(e.target.value)}></TextField>
                                        <Typography
                                            style={{
                                                display: "flex",
                                                fontWeight: "600",
                                                marginLeft: "10px",
                                                alignItems: "center",
                                                marginBottom: "10px"
                                            }}
                                            variant="subtitle1"
                                            component="div"> ‘Solution’ and ‘Peer Review’ will be added to title in their respective phases.</Typography>
                                        </Box>
                                        
                                        <Typography
                                            style={{
                                                fontWeight: "300",
                                                //marginLeft: "10px",
                                                alignItems: "center"
                                            }}
                                            variant="subtitle2"
                                            component="div">Please select submission type. Teams submissions should be used when groups of students will submit a solution together.</Typography>

                                            <FormControl component="fieldset">
                                            <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                                <FormControlLabel value="Manually Set Teams" control={<Radio
                                                    sx={{
                                                        color: darkColor,
                                                        '&.Mui-checked': {
                                                            color: darkColor,
                                                        },
                                                    }}
                                                />} label="Manually Set Teams (student-defined)" />
                                                <FormControlLabel value="Randomized Teams" control={<Radio 
                                                        sx={{
                                                        color: darkColor,
                                                        '&.Mui-checked': {
                                                            color: darkColor,
                                                        },
                                                    }} />} label="Randomized Teams" />
                                                <FormControlLabel value="Independent" control={<Radio 
                                                        sx={{
                                                        color: darkColor,
                                                        '&.Mui-checked': {
                                                            color: darkColor,
                                                        },
                                                    }} />} label="Independent" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                </Stack>
                            }
                        ></CardHeader>
                    </Card>
                </Grid>
                </div>

                {/* second box */}
                <Grid item xs={11.1}>
                    <Card
                        variant="outlined"
                        sx={{
                            overflow: "hidden",
                            p: 2,
                            border: "3px solid #fff",
                            borderRadius: "10px",
                            marginTop: "25px"
                        }}
                    >
                        <CardHeader
                            title={
                                <Stack>
                                    <Typography
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            fontWeight: "600",
                                        }}
                                        variant="h6"
                                        component="div"
                                    >
                                        Solution Assignment Content:
                                    </Typography>
                                    <Typography
                                            style={{
                                                fontWeight: "300",
                                                //marginLeft: "10px",
                                                alignItems: "center",
                                                marginBottom: "10px"
                                            }}
                                            variant="subtitle2"
                                            component="div">Please set the due date and upload instruction PDFs to be displayed within solution assignment.</Typography>
                                        <Box
                                        sx={{
                                            display: "flex",
                                        }}
                                    >
                                        <TextField onChange={(e) => setSolutionDueDate(e.target.value)}></TextField>
                                        <Typography
                                            style={{
                                                display: "flex",
                                                fontWeight: "600",
                                                marginLeft: "10px",
                                                alignItems: "center",
                                                marginBottom: "20px"
                                            }}
                                            variant="subtitle1"
                                            component="div">Solution Due Date</Typography>
                                        <Box sx={{ p: 2 }}></Box>
                                        
                                        <form onSubmit={handlePdfFileSubmit}>
                                        <input type="file" required onChange={handlePdfFileChange}></input>
                                        {pdfFileError&&<div style= {{
                                                            width: '100%',
                                                            color: red,
                                                            fontSize: '14px',
                                                            fontWeight: 600
                                                        }}>{pdfFileError}</div>}
                                                        <Box sx={{ display: "flex"}}>
                                        <CustomizedButtons type="submit" type1 onChange={handlePdfFileChange} model={"type1"}>Upload </CustomizedButtons>
                                        <Typography
                                            style={{
                                                display: "flex",
                                                fontWeight: "600",
                                                alignItems: "center",
                                                marginTop: "10px",
                                                marginBottom: "10px",
                                                marginLeft: "10px"
                                            }}
                                            variant="subtitle1"
                                            component="div">Solution Instructions</Typography>
                                            </Box>
                                        </form>
                                        </Box>
                                </Stack>
                            }
                        ></CardHeader>
                    </Card>
                </Grid>

                {/* third box */}
                <Grid item xs={11.1}>
                    <Card
                        variant="outlined"
                        sx={{
                            overflow: "hidden",
                            p: 1,
                            border: "3px solid #fff",
                            borderRadius: "10px",
                            marginTop: "25px",
                            marginBottom: "10px"
                        }}
                    >
                        <CardHeader
                            title={
                                <Stack>
                                    <Typography
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            fontWeight: "600",
                                        }}
                                        variant="h6"
                                        component="div"
                                    >
                                        Peer Review Assignment Content:
                                    </Typography>
                                    <Typography
                                            style={{
                                                fontWeight: "300",
                                                //marginLeft: "10px",
                                                alignItems: "center",
                                                marginBottom: "10px"
                                            }}
                                            variant="subtitle2"
                                            component="div">Please set the due date and upload instruction PDFs to be displayed within Peer Review Assignment. Please note that peer reviews must be manually sent for review by professors after quality checking.</Typography>
                                        <Box
                                        sx={{
                                            display: "flex",
                                        }}
                                    >
                                        <TextField onChange={(e) => setPRDueDate(e.target.value)}></TextField>
                                        
                                        <Typography
                                            style={{
                                                display: "flex",
                                                fontWeight: "600",
                                                marginLeft: "10px",
                                                alignItems: "center",
                                                marginBottom: "20px"
                                            }}
                                            variant="subtitle1"
                                            component="div">Peer Review Due Date</Typography>
                                            <Box sx={{ p: 2 }}></Box>
                                        <form onSubmit={handlePdfFileSubmit}>
                                        <input type="file" required onChange={handlePdfFileChange}></input>
                                        {pdfFileError&&<div style= {{
                                                            width: '100%',
                                                            color: red,
                                                            fontSize: '14px',
                                                            fontWeight: 600
                                                        }}>{pdfFileError}</div>}
                                        <Box sx={{ display: "flex"}}>
                                        <CustomizedButtons type="submit" type1 onChange={handlePdfFileChange} model={"type1"}>Upload </CustomizedButtons>
                                        <Typography
                                            style={{
                                                display: "flex",
                                                fontWeight: "600",
                                                alignItems: "center",
                                                marginTop: "10px",
                                                marginBottom: "10px",
                                                marginLeft: "10px"
                                            }}
                                            variant="subtitle1"
                                            component="div">Peer Review Instructions</Typography>
                                        </Box>
                                        </form>
                                        
                                    </Box>
                                </Stack>
                            }
                        ></CardHeader>
                    </Card>
                </Grid>
                <Grid item xs={11} sx={{ display: "flex", justifyContent: "flex-end", margintop: "5px",marginBottom: "10px" }}>
                    <CustomizedButtons type2 model={"type2"}> Save Draft  </CustomizedButtons>
                    <Box sx={{ p: 2 }}></Box>
                    <Link
                        to="/professorhome"
                        style={{ textDecoration: "none", color: "#000" }}
                        >
                  <CustomizedButtons type1 >Publish</CustomizedButtons>
                  <Box sx={{ p: 2 }}></Box>
                </Link>
                    </Grid>

            </CustomizedContainer>
        </div>
    )
}
export default AssignmentCreation
