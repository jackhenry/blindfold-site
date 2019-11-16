import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ScoreFilter from "./ScoreFilter";

const useStyles = makeStyles(theme => ({
  //Style
  root: {
    display: "flex",
    alignItems: "center"
  }
}));

function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScoreFilter />
    </div>
  );
}

export default HomePage;
