import { makeStyles } from "@mui/styles";
import { secondaryColor, primaryColor, darkColor } from "./Style";
const CardStyle = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    p: 1,
    border: "3px solid #cfe1ff",
    borderRadius: "10px",
  },
}));

export default CardStyle;