import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import KeyboardArrowLeft from "@material-ui/icons/ArrowDropDownCircleOutlined";
import KeyboardArrowRight from "@material-ui/icons/ArrowDropDownCircleOutlined";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  //Style
  stepperContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  stepperLabel: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  stepperLabelText: {
    fontWeight: 700
  },
  actions: {
    display: "flex",
    alignItems: "center"
  },
  arrowButton: {
    cursor: "pointer",
    fill: "#1d1d1d",
    "&:hover": {
      fill: green[500]
    }
  }
}));

function Stepper({
  filterLabel,
  onFilterChange
}: {
  filterLabel: string;
  onFilterChange: (delta: number) => void;
}) {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.stepperContainer}>
      <div className={classes.actions}>
        <KeyboardArrowLeft
          onClick={() => onFilterChange(1)}
          style={{
            transform: "rotate(90deg)"
          }}
          className={classes.arrowButton}
        />
        <div className={classes.stepperLabel}>
          <span className={classes.stepperLabelText}>{filterLabel}</span>
        </div>
        <KeyboardArrowRight
          onClick={() => onFilterChange(-1)}
          style={{
            transform: "rotate(-90deg)"
          }}
          className={classes.arrowButton}
        />
      </div>
    </Container>
  );
}

export default Stepper;
