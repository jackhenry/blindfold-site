import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AutocompleteInput from "../suggestions/AutocompleteInput";
import Suggestions from "../suggestions/Suggestions";

const useStyles = makeStyles(theme => ({
  //Style
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: 16,
    marginLeft: "auto",
    marginRight: "auto",
    minWidth: 550,
    maxWidth: 700
  },

  suggestionWrapper: {
    width: "100%",
    border: "1px solid rgba(0, 0, 0, 0.07)",
    borderTop: 0,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
  }
}));

function ScoreFilter() {
  const classes = useStyles();

  return (
    <div className={classes.inputContainer}>
      <AutocompleteInput />
      <div className={classes.suggestionWrapper}>
        <Suggestions />
      </div>
    </div>
  );
}

export default ScoreFilter;
