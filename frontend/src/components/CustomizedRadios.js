import React, {useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { secondaryColor, primaryColor, darkColor, blueColor, greenColor, purpleColor } from "../styles/Style";
import { styled } from '@mui/material/styles';
import CustomizedTextField from './CustomizedTextField';


export default function CustomizedRadios({type, filterType, setFilterType}) {
  const handleChange = (event) => {
    setFilterType(event.target.value);
    console.log(event.target.value)
   
  };
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={filterType}
        onChange={handleChange}
        sx={{display: "flex", flexDirection: "row"}}
      >
      {type === "radio1" ? (<>
        <FormControlLabel value="Draft" control={<Radio />} label="Draft" />
        <FormControlLabel value="Active" control={<Radio />} label="Active" />
        <FormControlLabel value="All" control={<Radio />} label="All" /></>) : <>
        {type === "radio2" ? (<>
          <FormControlLabel value="Needs Review" control={<Radio />} label="Needs Review" />
        <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
        <FormControlLabel value="All" control={<Radio />} label="All" /></>) : <>
        {type === "radio3" ? (<>
        <FormControlLabel value="Upcoming" control={<Radio />} label="Upcoming" />
        <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
        <FormControlLabel value="All" control={<Radio />} label="All" /></>) : <>
        {type === "radio4" ? (<>
        <FormControlLabel value="Independent" control={<Radio />} label="Independent" />
        <FormControlLabel value="Randomized Teams" control={<Radio />} label="Randomized Teams" />
        </>) : <>
        
      </>}
      </>}
      </>}
      </>}
      </RadioGroup>
    </FormControl>
  );
}