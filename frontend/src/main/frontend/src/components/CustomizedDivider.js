import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";

// core components
import DividerStyle from "../styles/DividerStyle";
import { Divider } from "@mui/material";

const CustomizedDivider = React.forwardRef((props, ref) => {
  const {
    type1,
    type2,
    children,
    ...rest
  } = props;

  // Styles
  const classes = DividerStyle();
  //const classes = makeComponentStyles();
  const dividerClasses = classNames({
    [classes.type1]: type1,
    [classes.type2]: type2,
  });

  return (
    <Divider variant="middle" {...rest} ref={ref} className={dividerClasses}>
      {children}
    </Divider>
  )
});
CustomizedDivider.propTypes = {
    type1: PropTypes.bool,
    type2: PropTypes.bool,
};
export default CustomizedDivider;
