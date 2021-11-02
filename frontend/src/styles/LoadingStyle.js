import { makeStyles } from "@mui/styles";
import { blueColor, primaryColor, darkColor } from "./Style";
const LoadingStyle = makeStyles((theme) => ({
  box: {
    display: "flex",
    height: "300px",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  }, 
  logo: {
    width:"300px",
    marginBottom: "20px"
  },
  loading: {
    color: blueColor
  },
}));

export default LoadingStyle;
