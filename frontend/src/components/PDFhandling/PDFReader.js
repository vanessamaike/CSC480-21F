import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PDFControlBar from './PDFControlBar';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = () => {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  // for onchange event
  const [pdfFile, setPdfFile]=useState(null);
  const [pdfFileError, setPdfFileError]=useState('');

  // for submit event
  const [viewPdf, setViewPdf]=useState(null);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }
  const fileType=['application/pdf'];
  const handlePdfFileChange=(e)=>{
    let selectedFile=e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile(e.target.result);
              setPdfFileError('');
            }
      }
      else{
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else{
      console.log('select your file');
    }
  }
  const handlePdfFileSubmit=(e)=>{
    e.preventDefault();
    if(pdfFile!==null){
      setViewPdf(pdfFile);
    }
    else{
      setViewPdf(null);
    }
  }
  return (
    <div>
      <form onSubmit={handlePdfFileSubmit}>
        <input type="file" className='form-control'
          required onChange={handlePdfFileChange}
        />
        {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
        <br></br>
        <button type="submit" >
          Preview
        </button>
      </form>
      {viewPdf&&<>
        <PDFControlBar
          scale={scale}
          setScale={setScale}
          numPages={numPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          file={viewPdf}
        />
        <Document
          file={viewPdf}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </>}
      
    </div>
  );
};

export default PDFReader;
