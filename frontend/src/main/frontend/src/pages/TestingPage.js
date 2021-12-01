import React, {useState} from 'react';
import PDFReader from '../components/PDFhandling/PDFReader';
import CustomizedButtons from '../components/CustomizedButtons';
export default function Testing() {
  const [text, settext] = useState("helloworld")
  const hanldechangetext = () => {
    settext("goodbye")
  }
  return (
    <>
    <div>{text}</div>
    <button onClick={hanldechangetext}>Click</button>
    <CustomizedButtons type3 height1>Click</CustomizedButtons>
    <CustomizedButtons type3 height1>Click herer</CustomizedButtons>
    </>
  );
}