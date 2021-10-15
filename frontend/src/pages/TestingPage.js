import React, { useState } from "react";
import CustomizedTables from "../components/CustomizedTables";

function TestingPage() {
  const [CSVData, setCSVData] = useState([]);

  return (
    
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CustomizedTables CSVData={CSVData.slice(1)}></CustomizedTables>
    </div>
  );
}

export default TestingPage;