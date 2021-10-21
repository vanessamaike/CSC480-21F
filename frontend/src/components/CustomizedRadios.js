import React, {useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { secondaryColor, primaryColor, darkColor, blueColor, greenColor, purpleColor } from "../styles/Style";
import { styled } from '@mui/material/styles';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
    },
  }),
);

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}



export default function CustomizedRadios({type}) {

  return (
    <>
    {type === "radio1" ? (
      <RadioGroup name="use-radio-group" defaultValue="first" sx={{display: "flex", flexDirection: "row"}}>
      <MyFormControlLabel value="first" label="Draft" control={<Radio />} />
      <MyFormControlLabel value="second" label="Active" control={<Radio />} />
    </RadioGroup>
    ) : 
    (<RadioGroup name="use-radio-group" defaultValue="first" sx={{display: "flex", flexDirection: "row"}}>
      <MyFormControlLabel value="first" label="Needs Review" control={<Radio />} />
      <MyFormControlLabel value="second" label="Completed" control={<Radio />} />
    </RadioGroup>)
    }</>
  );
}