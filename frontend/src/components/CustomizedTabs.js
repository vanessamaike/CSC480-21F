import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import { styled } from "@mui/material/styles";
import { Tabs, Tab, Typography, Box } from "@mui/material";
// core components
import TabStyle from "../styles/TabStyle";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "transparent",
    
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    borderRadius: "10px 10px 0 0",
    backgroundColor: "#347DEB",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(0.5),
    borderRadius: "10px 10px 0 0",
    color: "#000",
    fontWeight: "600",
    zIndex: 1,
    outline: "none",
    // borderRadius: "10px 10px 0 0",
    backgroundColor: "rgba(207, 225, 255, 1)",
    "&.Mui-selected": {
      color: "#fff",
      backgroundColor: "rgba(207, 225, 255, 0.1)",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 1)",
    },
  })
);
const CustomizedTabs = React.forwardRef((props, ref) => {
  const {
    model,
    fullwidth,
    type1,
    type2,
    type3,
    children,
    setValue,
    value,
    ...rest
  } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Styles
  const classes = TabStyle();
  //const classes = makeComponentStyles();
  const tabClasses = classNames({
    [classes.type1]: type1,
    [classes.type2]: type2,
    [classes.type3]: type3,
    [classes.root]: true,
  });

  return (
    <StyledTabs
      value={value}
      variant="fullWidth"
      onChange={handleChange}
      aria-label="styled tabs example"
      {...rest}
      ref={ref}
      className={tabClasses}
    >
      <StyledTab label="Course 1" />
      <StyledTab label="Course 2" />
      <StyledTab label="Course 3" />
      <StyledTab label="Course 4" />
      
    </StyledTabs>
  );
});
CustomizedTabs.propTypes = {
  value: PropTypes.any,
  setValue: PropTypes.func,
  type1: PropTypes.bool,
  type1: PropTypes.bool,
  type1: PropTypes.bool,
};
export default CustomizedTabs;
