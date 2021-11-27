import { makeStyles } from '@mui/styles';
import { primaryColor, darkColor, whiteColor, grayColor } from "./Style";
const UploadButtonStyle = makeStyles((theme) => ({
  root: {
    minHeight: "auto",
    minWidth: "auto",
    borderRadius: "50px",
    textTransform: "unset",
    fontWeight: "600",
    padding: "5px 15px",
    height: "42px",
    display: "flex",
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",

  },
  displayNone:{
    display : "none",
  }
  
}));

export default UploadButtonStyle;