import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import { Box, TextField } from "@mui/material";
// core components
import ButtonStyle from "../styles/ButtonStyle";

const CustomizedTextField = React.forwardRef((props, ref) => {
  const { text, value , handleTextFieldChange, comments,isDisabled, number, children, ...rest } = props;
  var defaultValue = ""
  if(value){
    defaultValue = value
  }

    // ===== Handle Comments ============
  const handleTextField = (event) => {
    event.preventDefault();
    handleTextFieldChange(event.target.value);
  };


  // Styles
  const classes = ButtonStyle();
  //const classes = makeComponentStyles();

  return (
    <Box>
      <>
        {" "}
        {number? (
          <TextField
            disabled={isDisabled}
            sx={{ bgcolor: "#fff", width: "100px" }}
            label={children}
            id="outlined-size-small"
            size="small"
            type="number"
            InputProps={{ inputProps: { min: 0, max: 10 } }}
            onChange={handleTextField}
          />
        ) : (
<>
        {comments ? (
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
            value= {defaultValue}
            onChange={handleTextField}
          />
        )}</>
        )}
      </>
    </Box>
  );
});
CustomizedTextField.propTypes = {};
export default CustomizedTextField;
