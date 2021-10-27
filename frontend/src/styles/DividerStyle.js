import { makeStyles } from '@mui/styles';
import { primaryColor, darkColor } from "./Style";
const DividerStyle = makeStyles((theme) => ({
  type1: {
    border: `1.5px solid ${primaryColor}`
  },
  type2: {
    border: `1px solid ${darkColor}`
  },
}));

export default DividerStyle;