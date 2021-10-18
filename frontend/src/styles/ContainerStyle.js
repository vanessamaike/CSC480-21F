import { makeStyles } from '@mui/styles';
import { secondaryColor, primaryColor, darkColor } from "./Style";
const ContainerStyle = makeStyles((theme) => ({
    containerFluid : {
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
        width: "100%",
      },
      
    container : {
        "@media (min-width: 576px)": {
          maxWidth: "540px",
        },
        "@media (min-width: 768px)": {
          maxWidth: "720px",
        },
        "@media (min-width: 992px)": {
          maxWidth: "960px",
        },
        "@media (min-width: 1200px)": {
          maxWidth: "1024px",
        },
      }
}));

export default ContainerStyle;