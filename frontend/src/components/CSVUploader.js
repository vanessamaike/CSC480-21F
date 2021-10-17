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
    <div style={{ width: "30%" }}>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        noDrag
        style={{
          dropArea: {
            width: "87px",
            height: "33px",
            backgroundColor: "#000",
            borderRadius: 30,
          },
          dropAreaActive: {
            borderColor: "red",
          },
          dropFile: {
            width: 87,
            height: 33,
            background: "#000",
          },
          fileSizeInfo: {
            backgroundColor: "#000",
          },
          fileNameInfo: {
            color: "#fff",
            backgroundColor: "transparent",
            borderRadius: 3,
            fontSize: 14,
            lineHeight: 1,
            padding: "0 0.4em",
          },
          removeButton: {
            color: "blue",
          },
        }}
        config={{ header: true }}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Upload.</span>
      </CSVReader>
    </div>
  );
}
export default CSVReader2;
