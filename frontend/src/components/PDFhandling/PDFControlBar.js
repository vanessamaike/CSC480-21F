import { Grid } from '@mui/material';
import React from 'react';
import CustomizedButtons from "../../components/CustomizedButtons";

const ControlPanel = (props) => {
  const { file, pageNumber, numPages, setPageNumber, scale, setScale } = props;

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;

  const firstPageClass = isFirstPage ? 'disabled' : 'clickable';
  const lastPageClass = isLastPage ? 'disabled' : 'clickable';

  const goToFirstPage = () => {
    if (!isFirstPage) setPageNumber(1);
  };
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };
  const goToLastPage = () => {
    if (!isLastPage) setPageNumber(numPages);
  };

  const onPageChange = (e) => {
    const { value } = e.target;
    setPageNumber(Number(value));
  };

  const isMinZoom = scale < 0.6;
  const isMaxZoom = scale >= 2.0;

  const zoomOutClass = isMinZoom ? 'disabled' : 'clickable';
  const zoomInClass = isMaxZoom ? 'disabled' : 'clickable';

  const zoomOut = () => {
    if (!isMinZoom) setScale(scale - 0.1);
  };

  const zoomIn = () => {
    if (!isMaxZoom) setScale(scale + 0.1);
  };

  return (
    <div style={{ marginBottom: "10px"}}>
      <div style={{
        padding: "1px",
        
      }}>
        <CustomizedButtons type3 style={{ marginBottom: "10px"}}
          onClick={goToFirstPage}
        >first page</CustomizedButtons>
        
        <CustomizedButtons type3 model={"arrowL"} style={{ marginBottom: "10px"}}
          onClick={goToPreviousPage}
        ></CustomizedButtons>
        <span style={{ marginBottom: "10px"}}>
          Page{' '}
          <input style={{ marginBottom: "10px"}}
            name="pageNumber"
            type="number"
            min={1}
            max={numPages || 1}
            value={pageNumber}
            onChange={onPageChange}
          />{' '}
          of {numPages}
        </span>
        <CustomizedButtons type3 model={"arrow"} style={{ marginBottom: "10px"}}
          
          onClick={goToNextPage}
          ></CustomizedButtons>
        <CustomizedButtons type3 style={{ marginBottom: "10px"}}
          
          onClick={goToLastPage}
          >last page</CustomizedButtons>
      </div>
      <div >
        <CustomizedButtons type3 style={{ marginBottom: "10px"}}
          onClick={zoomOut}
          >zoom out</CustomizedButtons>
        <div style={{ marginBottom: "10px", paddingLeft: "10px"}}><span>{(scale * 100).toFixed()}%</span></div>
        <CustomizedButtons type3 style={{ marginBottom: "10px"}}
          onClick={zoomIn}
          >zoom in</CustomizedButtons>
      </div>
      <div >
      <CustomizedButtons type2 model={"download"} style={{ marginBottom: "10px"}} href={file} download={true} title="download"> Download PDF</CustomizedButtons>
      </div>
      <div >
      </div>
    </div>
  );
};

export default ControlPanel;
