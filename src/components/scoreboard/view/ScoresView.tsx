import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";

import ScoreboardContainer from "../ScoreboardContainer";
import StepperContainer from "../../filter/StepperContainer";
import LeagueSelector from "../LeagueSelector";

const useStyles = makeStyles(theme => ({
  //Style
  selectorWrapper: {
    marginTop: theme.spacing(1)
  },
  stepperWrapper: {
    marginTop: theme.spacing(1)
  }
}));

function ScoresView() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <div className={classes.selectorWrapper}>
        <LeagueSelector />
      </div>
      <div className={classes.stepperWrapper}>
        <StepperContainer />
      </div>
      <ScoreboardContainer />
    </Container>
  );
}

export default ScoresView;
