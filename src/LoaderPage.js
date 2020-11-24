import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ViewerPDF } from "./ViewerPDF";
import { Divider } from "@material-ui/core";

export const LoaderPage = () => {
  const [pathPDF, setPathPDF] = useState(null);
  const [selectedFilePdf, setSelectedFilePdf] = useState(null);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
  }));

  const classes = useStyles();

  const loadFilePdf = (event) => {
    if (event.target.files[0]) {
      const output = document.getElementById("contained-button-file");
      output.src = URL.createObjectURL(event.target.files[0]);
      setPathPDF(output.src);
    } else return;
    setSelectedFilePdf(event.target.files[0]);
  };

  return (
    <div>
      <Divider />
      <div className="section">
        {/* -------Uploader Pdf--------------- */}
        <input
          accept="application/pdf"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={(event) => loadFilePdf(event)}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Open PDF File in this Page
          </Button>
        </label>
        {/* -------Other Uploader Pdf--------------- */}

        {pathPDF ? (
          <a
            href={pathPDF}
            without="true"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", marginLeft: "10px" }}
            target="_blank">
            <Button
              variant="contained"
              color="primary"
              component="span"
              label="Resume">
              Open PDF File in NewTab
            </Button>
          </a>
        ) : null}

        {/* ---------------------------------------- */}
        <div>
          <ViewerPDF pathPDF={pathPDF} />
        </div>
      </div>
    </div>
  );
};
