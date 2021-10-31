import { Typography } from "@mui/material";
import React from "react";
import { CSVReader } from "react-papaparse";

function CSVReader2({ setjsonData }) {
  const handleOnDrop = (data) => {
    console.log("---------------------------");

    //console.log(data)
    const combinedData = data.map((object) => {
      return object.data;
    });
    //console.log(combinedData);
    setjsonData(combinedData);
    console.log("---------------------------");
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    setjsonData([]);
    console.log("---------------------------");
  };
  return (
    <div style={{ width: "100%" }}>
    <CSVReader
      onDrop={handleOnDrop}
      onError={handleOnError}
      addRemoveButton
      onRemoveFile={handleOnRemoveFile}
      style={{
        dropArea: {
          borderColor: "transparent",
          borderRadius: 20,
        },
        dropAreaActive: {
          borderColor: "red",
        },
        dropFile: {
          width: 200,
          height: 80,
          background: "#347DEB",
        },
        fileSizeInfo: {
          display: "none",
          color: "#000",
          backgroundColor: "transparent",
          lineHeight: 1,
          marginBottom: "0.5em",
          padding: "0 0.4em",
        },
        fileNameInfo: {
          color: "#fff",
          backgroundColor: "transparent",
          fontSize: "1em",
          lineHeight: 1,
          marginBottom: "0.2em",
        },
        removeButton: {
          color: "#347DEB",
          backgroundColor: "#fff",
        },
        progressBar: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Typography
        style={{ fontWeight: "600" }}
        variant="body1"
        component="div"
      >
        Drop CSV file here or click to upload
      </Typography>
    </CSVReader>
  </div>
  );
}
export default CSVReader2;
