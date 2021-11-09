import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import CustomizedTextField from "./CustomizedTextField";
import CustomizedButtons from "./CustomizedButtons";

// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";
// style
import ButtonStyle from "../styles/ButtonStyle";

function CustomizedCSVUploader(props) {
  const { setCSVFile, multipleCSV, ...rest } = props;

  // Styles
  const classes = ButtonStyle();

  const inputStyleClasses = classNames({
    [classes.root]: true,
    [classes.displayNone]: true,
  });

  const uploadBtnClasses = classNames({
    [classes.type1]: true,
    [classes.height3]: true,
    [classes.root]: true,
  });

  //=========== Handle Submission
  const [pdfFileError, setPdfFileError] = useState("");
  const [fileName, setFileName] = useState("");

  const fileType = ["text/csv"];
  const handlePdfFileChange = (e) => {
    let arrayPdfFiles = []
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(e.target.files[i]);
      let selectedFile = e.target.files[i];
      if (selectedFile) {
        if (selectedFile && fileType.includes(selectedFile.type)) {
          setFileName(selectedFile.name);
          let reader = new FileReader();
          //reader.readAsDataURL(selectedFile);
          reader.readAsArrayBuffer(selectedFile);
          reader.onloadend = (e) => {
            console.log(e.target.result)
            //let unit8Array = new Uint8Array(e.target.result);
            let byteArray = e.target.result//unit8Array//.split(',')
            if(multipleCSV){
              arrayPdfFiles = [...arrayPdfFiles,byteArray]
              setCSVFile(arrayPdfFiles);
              setPdfFileError("");
            }
            else{
                setCSVFile(byteArray);
              setPdfFileError("");
            }
            
          };
        } else {
            setCSVFile(null);
          setPdfFileError("Please select valid pdf file");
        }
      } else {
        console.log("select your file");
      }
    }
  };

  return (
    <div>
      <Stack direction="row" spacing={3}>
        {multipleCSV === true ? (
          <input
            type="file"
            id="file"
            accept=".csv"
            class="inputfile"
            multiple
            className={inputStyleClasses}
            onChange={handlePdfFileChange}
          />
        ) : (
          <input
            type="file"
            id="file"
            accept=".csv"
            class="inputfile"
            className={inputStyleClasses}
            onChange={handlePdfFileChange}
          />
        )}

        <label for="file">
          <span id="file-name" class="file-box"></span>
          <span class={uploadBtnClasses}>Upload CSV file</span>
        </label>
        <Typography
          style={{
            display: "flex",
            textAlign: "center",
            fontWeight: "500",
          }}
          variant="h6"
          component="div"
        >
          {fileName}
        </Typography>
      </Stack>
    </div>
  );

  CustomizedCSVUploader.propTypes = {
    multipleCSV: PropTypes.bool,
  };
}

export default CustomizedCSVUploader;
