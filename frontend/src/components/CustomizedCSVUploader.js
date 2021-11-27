import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
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
    console.log(e.target.files)
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(e.target.files[i]);
      let selectedFile = e.target.files[i];
      if (selectedFile) {
        if (selectedFile && fileType.includes(selectedFile.type)) {
          setFileName(selectedFile.name);
          let reader = new FileReader();
          //reader.readAsDataURL(selectedFile);
          reader.readAsText(selectedFile);
          reader.onloadend = (e) => {
            //let unit8Array = new Uint8Array(e.target.result);
            let text = e.target.result//unit8Array//.split(',')
            var lines = text.toString().split("\n")
            var result = [];
            var headers=lines[0].split(",");
            for(var i=1;i<lines.length-1;i++){

              var obj = {};
              var currentline=lines[i].split(",");
              for(var j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }
              result.push(obj);
            }
            
            if(multipleCSV){
              arrayPdfFiles = [...arrayPdfFiles,result]
              setCSVFile(arrayPdfFiles);
              setPdfFileError("");
            }
            else{
                setCSVFile(result);
              setPdfFileError("");
            }
            
          };
        } else {
            setCSVFile(null);
          setPdfFileError("Please select valid csv file");
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


}
  CustomizedCSVUploader.propTypes = {
    multipleCSV: PropTypes.bool,
  };
export default CustomizedCSVUploader;
