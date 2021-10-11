import React from "react";
import { CSVReader } from "react-papaparse";

function CSVReader2({ setCSVData }) {
  const handleOnDrop = (data) => {
    console.log("---------------------------");
    
    console.log(data)
    const combinedData = data.map((object) => {
      return object.data
    })
    //console.log(combinedData);
    setCSVData(combinedData);
    console.log("---------------------------");
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    setCSVData([]);
    console.log("---------------------------");
  };
  return (
    <div style={{ width: "30%" }}>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        config={{header: true}}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
        style={{
          dropArea: {
            borderColor: "pink",
            borderRadius: 20,
          },
          dropAreaActive: {
            borderColor: "red",
          },
          dropFile: {
            width: 100,
            height: 120,
            background: "#ccc",
          },
          fileSizeInfo: {
            color: "#fff",
            backgroundColor: "#000",
            borderRadius: 3,
            lineHeight: 1,
            marginBottom: "0.5em",
            padding: "0 0.4em",
          },
          fileNameInfo: {
            color: "#fff",
            backgroundColor: "#eee",
            borderRadius: 3,
            fontSize: 14,
            lineHeight: 1,
            padding: "0 0.4em",
          },
          removeButton: {
            color: "blue",
          },
          progressBar: {
            backgroundColor: "pink",
          },
        }}
      >
        <span>Click to upload.</span>
      </CSVReader>
    </div>
  );
}
export default CSVReader2;
