import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import { Box, TextField } from "@mui/material";
// core components
import ButtonStyle from "../styles/ButtonStyle";

const CustomizedTextField = React.forwardRef((props, ref) => {
  const { text, handleTextFieldChange, comments, children, ...rest } = props;


  // ===== Handle Comments ============
  const handleTextField = (event) => {
    handleTextFieldChange(event.target.value);
  };


  // Styles
  const classes = ButtonStyle();
  //const classes = makeComponentStyles();

  return (
    <Box>
      <>
        {" "}
        {Comment ? (
          <TextField
            sx={{ bgcolor: "#fff" }}
            label={children}
            id="outlined-size-small"
            size="small"
            multiline
            maxRows={4}
            onChange={handleTextField}
          />
        ) : (
          <TextField
            sx={{ bgcolor: "#fff" }}
            label={children}
            id="outlined-size-small"
            size="small"
            onChange={handleTextField}
          />
        )}
      </>
    </Box>
  );
});
CustomizedTextField.propTypes = {};
export default CustomizedTextField;
