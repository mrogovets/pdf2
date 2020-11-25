import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "./ViewerPDF.css";

export const ViewerPDF = ({ pathPDF }) => {
  const samplePDF = pathPDF;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const onPassword = () => {
    console.log("enter password");
  };

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const MyDoc = (
    <Document
      file={samplePDF}
      onLoadSuccess={onDocumentLoadSuccess}
      onPassword={(callback) => {
        callback("123456");
      }}>
      <Page pageNumber={pageNumber} />
    </Document>
  );

  if (samplePDF) {
    return (
      <>
        <Document
          file={samplePDF}
          onLoadSuccess={onDocumentLoadSuccess}
          onPassword={(callback) => {
            callback("123456");
          }}>
          <Page pageNumber={pageNumber} />
        </Document>
        <div className="pagenation-pdf">
          <p className="page-number-text">
            Page {pageNumber || (numPages ? 1 : "--")} from {numPages || "--"}
          </p>

          <Button
            className="btn btn-prev"
            variant="contained"
            color="primary"
            disabled={pageNumber <= 1}
            onClick={previousPage}>
            PrevPage
          </Button>

          <Button
            className="btn btn-next"
            variant="contained"
            color="primary"
            disabled={pageNumber >= numPages}
            onClick={nextPage}>
            NextPage
          </Button>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <h2>Choose your file</h2>
      </div>
    );
  }
};
