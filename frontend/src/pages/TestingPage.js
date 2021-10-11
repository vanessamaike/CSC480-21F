import React, {useState} from "react";
import CustomizedTables from "../components/CustomizedTables";
import CSVUploader from "../components/CSVUploader";
import { saveAs } from "file-saver";

function TestingPage() {
  const [CSVData, setCSVData] = useState([]);
  
  const saveFile = () => {
    saveAs(
      "https://mui.com/components/data-grid/export/#main-content",
      "example.pdf"
    );
  };


  
  return (
    <div style={{ display: "flex",flexDirection: "column"}}>
      <CSVUploader setCSVData={setCSVData}></CSVUploader>
      <CustomizedTables CSVData={CSVData.slice(1)}></CustomizedTables>
      <button onClick={saveFile}>download</button>
    </div>
  );
}

export default TestingPage;


