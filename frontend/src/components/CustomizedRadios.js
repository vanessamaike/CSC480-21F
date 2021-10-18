import React, {useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { secondaryColor, primaryColor, darkColor, blueColor, greenColor, purpleColor } from "../styles/Style";

export default function CustomizedRadios() {

  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="position" name="position" defaultValue="top">
      <FormControlLabel value="Drafts" control={<Radio
        sx={{
          color: blueColor,
          '&.Mui-checked': {
            color: blueColor,
          },
        }}
      />} label="Drafts" />
        <FormControlLabel sx={{display: "flex", alignItems: "center"}} value="Active" control={<Radio
        sx={{
          color: "#000",
          '&.Mui-checked': {
            color: blueColor,
          },
        }}
      />} label="Active" />
      </RadioGroup>
    </FormControl>
    
  );
}