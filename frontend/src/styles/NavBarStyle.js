import { makeStyles } from "@mui/styles";
import { secondaryColor, primaryColor, fontColor } from "./Style";
const NavBarStyle = makeStyles((theme) => ({
  appBar: {
    display: "flex",
    flexDirection: "row",
    border: "0",
    borderRadius: "3px",
    padding: "0 12em",
    marginBottom: "20px",
    color: "#f11111",
    width: "100%",
    height: "80px",
    backgroundColor: "red",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "collumn nowrap",
    justifyContent: "start",
    position: "relative",
    zIndex: "unset",
  },
  logo: {
    width: "30em",
    display: "flex",
    justifyContent: "start",
  },
  link: {
    cursor: "pointer",
    width: "15em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    '&:hover': {
      color: primaryColor,
  },
  },
}));

export default NavBarStyle;