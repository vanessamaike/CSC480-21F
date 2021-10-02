import * as React from "react";

import Button from "@mui/material/Button";
import { secondaryColor, primaryColor, fontColor } from "../styles/Style";
export default function BasicButtons() {
  return (
    <Button
      style={{
        backgroundColor: fontColor,
        color: secondaryColor,
        borderRadius: "25px",
      }}
      variant="contained"
    >
      See all
    </Button>
  );
}