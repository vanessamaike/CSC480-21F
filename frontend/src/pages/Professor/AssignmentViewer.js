// import React, { useState } from "react";
// // @mui components
// import {
//     Grid,
//     Card,
//     CardHeader,
//     CardContent,
//     Container,
//     Typography,
//     Box,
//     Stack,
//     Radio,
//     autocompleteClasses,
// } from "@mui/material";
// // styled components
// import CustomizedContainer from "../../components/CustomizedContainer";
// import NavBar from "../../components/NavBar/NavBar";
// import bg from "../../images/multi_background_dashboard.jpg";
// import { secondaryColor, primaryColor, darkColor, blueColor, greenColor, purpleColor } from "../../styles/Style";
// import AssignmentCreation from "./AssignmentCreation"
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// function AssignmentViewer() {

//     // Create new plugin instance
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();
// // console.log(pdfFileErrorv);
//     return (
//         <div 
//         style={{
//             backgroundImage: `url(${bg})`,
//             height: "80vh",
//             backgroundSize: "cover",
//             paddingTop: "150px",
//           }}
//         >
//           <NavBar></NavBar>
//           <CustomizedContainer>
//             <Grid container sx={{ marginBottom: "20px" }}>
//               <Grid item xs={8}>
//                 <Typography
//                   style={{
//                     display: "flex",
//                     textAlign: "center",
//                     fontWeight: "600",
//                   }}
//                   variant="h6"
//                   component="div"
//                 >
//                   Assignment
//                 </Typography>
//                         </Grid>
//                         </Grid>
//                 <div style={{
//                     width: "100%",
//                     height: "550px",
//                     backgroundColor: "white",
//                     overflowY: "auto",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center"
//                 }}>
                    
//                 </div>
//         </CustomizedContainer>
            
//         </div>
//     )
// }

// export default AssignmentViewer

   
import React,{useState} from 'react'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

export const AssignmentView = () => {

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  // for onchange event
  const [pdfFile, setPdfFile]=useState(null);
  const [pdfFileError, setPdfFileError]=useState('');

  // for submit event
  const [viewPdf, setViewPdf]=useState(null);

  // onchange event
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

  // form submit
  const handlePdfFileSubmit=(e)=>{
    e.preventDefault();
    if(pdfFile!==null){
      setViewPdf(pdfFile);
    }
    else{
      setViewPdf(null);
    }
  }

  return (
    <div className='container'>

    <br></br>
    
      <form className='form-group' onSubmit={handlePdfFileSubmit}>
        <input type="file" className='form-control'
          required onChange={handlePdfFileChange}
        />
        {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
        <br></br>
        <button type="submit" className='btn btn-success btn-lg'>
          UPLOAD
        </button>
      </form>
      <br></br>
      <h4>View PDF</h4>
      <div className='pdf-container'>
        {/* show pdf conditionally (if we have one)  */}
        {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl={viewPdf}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {/* if we dont have pdf or viewPdf state is null */}
      {!viewPdf&&<>No pdf file selected</>}
      </div>

    </div>
  )
}

export default AssignmentView
