import React from 'react';

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
    <div >
      <div>
        <button
          onClick={goToFirstPage}
        >first page</button>
        <button
          onClick={goToPreviousPage}
        >previous</button>
        <span>
          Page{' '}
          <input
            name="pageNumber"
            type="number"
            min={1}
            max={numPages || 1}
            value={pageNumber}
            onChange={onPageChange}
          />{' '}
          of {numPages}
        </span>
        <button
          
          onClick={goToNextPage}
          >next page</button>
        <button
          
          onClick={goToLastPage}
          >last page</button>
      </div>
      <div >
        <button
          onClick={zoomOut}
          >zoom out</button>
        <span>{(scale * 100).toFixed()}%</span>
        <button
          onClick={zoomIn}
          >zoom in</button>
      </div>
      <div >
        <button href={file} download={true} title="download">download
        </button>
      </div>
      <div >
      </div>
    </div>
  );
};

export default ControlPanel;
