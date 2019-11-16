import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  //Style
  "@keyframes indicator-wrapper-animation": {
    "0%": {
      transform: "translateX(0%)"
    },
    "50%": {
      transform: "translateX(0%)"
    },
    "100%": {
      transform: "translateX(50%)"
    }
  },
  "@keyframes live-indicator-length-animation": {
    "0%": {
      transform: "scaleX(0)"
    },
    "50%": {
      transform: "scaleX(1)"
    }
  },
  root: {
    overflow: "hidden"
  },
  indicatorWrapper: {
    width: "200%",
    float: "none",
    animation:
      "$indicator-wrapper-animation 4s 1s infinite alternate cubic-bezier(.21,.85,.34,.98)"
  },
  indicator: {
    transformOrigin: "left",
    width: "50%",
    height: 2,
    float: "left",
    backgroundColor: green[500],
    animation:
      "$live-indicator-length-animation 4s 1s infinite alternate cubic-bezier(.87,.01,.87,.5)"
  }
}));

function HorizontalProgress() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.indicatorWrapper}>
        <div className={classes.indicator} />
      </div>
    </div>
  );
}

export default HorizontalProgress;
