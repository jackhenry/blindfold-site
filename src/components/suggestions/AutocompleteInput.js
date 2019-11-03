import React, { useState } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import InputBase from "@material-ui/core/InputBase";
import { ClickAwayListener } from "@material-ui/core";
import {
  changeFilterInput,
  updateInputFocus
} from "../../redux/modules/filter";

const useStyles = makeStyles(theme => ({
  //Style
  inputBox: {
    display: "flex",
    justifyContent: "center",
    border: "1px solid rgba(0, 0, 0, 0.07)",
    borderRadius: 0,
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    marginTop: theme.spacing(2)
  },
  inputBoxFocused: {
    boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.05)",
    borderRadius: 0,
    borderBottom: 0
  },
  input: {
    textAlign: "center",
    padding: "15px 45px 15px 30px",
    width: "100%",
    fontSize: "1.5rem"
  },
  inputFocused: {
    background: "red"
  }
}));

function AutocompleteInput({ onInputChange }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [expand, setExpand] = useState(false);

  const handleInputChange = value => {
    if (value !== "" && value !== null) setExpand(true);
    dispatch(updateInputFocus(true));
    dispatch(changeFilterInput(value));
  };

  const handleClickaway = hasFocus => {
    setExpand(false);
    dispatch(updateInputFocus(false));
  };

  return (
    <div className={clsx(classes.inputBox, expand && classes.inputBoxFocused)}>
      <ClickAwayListener onClickAway={() => handleClickaway(false)}>
        <InputBase
          placeholder={"Type a team name here..."}
          classes={{
            input: classes.input
          }}
          style={{
            width: "100%"
          }}
          onChange={e => {
            const { value } = e.target;
            handleInputChange(value);
          }}
        />
      </ClickAwayListener>
    </div>
  );
}

export default AutocompleteInput;
