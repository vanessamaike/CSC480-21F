import React, { useState , useEffect} from "react";
import { Stack, Typography } from "@mui/material";
import CustomizedTextField from "./CustomizedTextField";
import CustomizedButtons from "./CustomizedButtons";
import viewPdf from "../pdfsample/sample.pdf";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";
// style
import ButtonStyle from "../styles/ButtonStyle";

function CustomizedPdfUploader(props) {
  const { id, pdfFileName, setPdfFileName, setPdfFile, multiplePdf, ...rest } =
    props;

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

  useEffect(() => {
    if (pdfFileName !== undefined) {
      setFileName(pdfFileName);
    }
  }, [pdfFileName]);

  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let arrayPdfFiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      let selectedFile = e.target.files[i];
      if (selectedFile) {
        if (selectedFile && fileType.includes(selectedFile.type)) {
          setFileName(selectedFile.name);
           
          if(pdfFileName !== undefined)
          {
             
              setPdfFileName(selectedFile.name);
          }
        
        
          let reader = new FileReader();
          //reader.readAsDataURL(selectedFile);
          reader.readAsArrayBuffer(selectedFile);
          reader.onloadend = (e) => {
            let unit8Array = new Uint8Array(e.target.result);
            let byteArray = unit8Array.toString().split(",").map(Number);
           
            if (multiplePdf) {
              arrayPdfFiles = [...arrayPdfFiles, byteArray];
              setPdfFile(arrayPdfFiles);
              setPdfFileError("");
            } else {
              setPdfFile(byteArray);
              setPdfFileError("");
            }
          };
        } else {
          setPdfFile(null);
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
        {multiplePdf === true ? (
          <input
            type="file"
            id={id}
            accept="application/pdf"
            class="inputfile"
            multiple
            className={inputStyleClasses}
            onChange={handlePdfFileChange}
          />
        ) : (
          <input
            type="file"
            id={id}
            accept="application/pdf"
            class="inputfile"
            className={inputStyleClasses}
            onChange={handlePdfFileChange}
          />
        )}

        <label for={id}>
          <span id="file-name" class="file-box"></span>
          <span class={uploadBtnClasses}>Upload PDF file</span>
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

  CustomizedPdfUploader.propTypes = {
    multiplePdf: PropTypes.bool,
  };
}

export default CustomizedPdfUploader;
