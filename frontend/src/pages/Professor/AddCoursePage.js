import React, {useState} from "react";
import { Card, Typography, Container, CardContent } from "@mui/material";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CSVUploader from "../../components/CSVUploader";
function AddCoursePage() {
    const [jsonData, setjsonData] = useState([]);
  return (
    <div>
      <NavBar fixed></NavBar>
      <div style={{ marginTop: "100px" }}></div>
      <Container
        maxWidth= "1018px"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Typography style={{ fontWeight: "600" }} variant="h6" component="div">
          Create Course
        </Typography>
        <Card sx={{ display: "flex", width: "100%", bgcolor: "#fff", borderRadius: "10px" }}>
          <CardContent sx={{ display: "flex", flexDirection: "row",}}>
            <Typography
              style={{ fontWeight: "600" }}
              variant="h6"
              component="div"
            >
              Upload CSV
            </Typography>
            <CSVUploader setjsonData={setjsonData}></CSVUploader>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default AddCoursePage;
