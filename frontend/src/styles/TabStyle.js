import { makeStyles } from '@mui/styles';
import { secondaryColor, primaryColor, darkColor, blueColor, greenColor, purpleColor } from "./Style";
const TabStyle = makeStyles((theme) => ({
  root: {

    fontWeight: "600",
    color: "#fff",
    "& .MuiTabs-indicator": {
      
        display: "flex",
        height: "100%",
        justifyContent: "center",
        backgroundColor: "transparent",
      },
  },
  fullwidth: {
    width: "100%",
  },
  type1: {
    "& .MuiTabs-indicatorSpan": {
      backgroundColor: blueColor,
    },
  },
  type2: {
    "& .MuiTabs-indicatorSpan": {
      backgroundColor: purpleColor,
    },
  },
  type3: {
    "& .MuiTabs-indicatorSpan": {
      backgroundColor: greenColor,
    },
  },
}));

export default TabStyle;