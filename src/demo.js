import React, { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import { openPDF } from "./openPDF";
import { base64string } from "./pdf.js";
import { LoaderPage } from "./LoaderPage.js";

export default function Demo() {
  const password = "";
  const onOpenPDF = () => {
    openPDF(base64string, password);
  };

  return (
    <Fragment>
      <Button variant="contained" color="primary" onClick={() => onOpenPDF()}>
        Open PDF
      </Button>
      <LoaderPage />
    </Fragment>
  );
}
