import { Typography } from "@mui/material";
import React from "react";
import { BiCheckCircle } from "react-icons/bi";

function SuccessfulNotification() {
  return (
    <div
      style={{
        width: "400px",
        height: "50px",
        backgroundColor: "#fff",
        overflow: "hidden",
        padding: "0 10px",
        border: "3px solid #0DC38D",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <BiCheckCircle size="2em" style={{ marginRight: "10px", color: "#0DC38D" }} />
      <Typography
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          fontWeight: "600",
        }}
        variant="body1"
        component="div"
      >
      Results successfully sent to students
      </Typography>
    </div>
  );
}

export default SuccessfulNotification;
