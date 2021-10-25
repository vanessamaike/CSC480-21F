import React, {useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { secondaryColor, primaryColor, darkColor, blueColor, greenColor, purpleColor } from "../styles/Style";
import { styled } from '@mui/material/styles';


export default function CustomizedRadios({type, filterType, setFilterType}) {
  const handleChange = (event) => {
    setFilterType(event.target.value);
    console.log(event.target.value)
   
  };
  return (
    <>
    {type === "radio1" ? (
      <FormControl component="fieldset">
      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={filterType}
        onChange={handleChange}
        sx={{display: "flex", flexDirection: "row"}}
      >
        <FormControlLabel value="draft" control={<Radio />} label="Draft" />
        <FormControlLabel value="active" control={<Radio />} label="Active" />
      </RadioGroup>
    </FormControl>
    ) : 
    (
      <FormControl component="fieldset">
      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={filterType}
        onChange={handleChange}
        sx={{display: "flex", flexDirection: "row"}}
      >
        <FormControlLabel value="Needs Review" control={<Radio />} label="Needs Review" />
        <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
        <FormControlLabel value="All" control={<Radio />} label="All" />
      </RadioGroup>
    </FormControl>)
    }</>
  );
}