import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { changeLeague } from "../../redux/modules/scoreboard";

const useStyles = makeStyles(theme => ({
  //Style
  selectionGroup: {
    display: "flex",
    justifyContent: "center"
  },
  leagueButton: {
    height: 40,
    width: 65,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid rgb(0,0,0,.2)",
    borderRight: "none",
    backgroundColor: "rgb(255,255,255)",
    cursor: "pointer",
    //boxShadow: "2px 1px 4px rgba(0, 0, 0, 0.1)",
    boxShadow:
      "0px 1px 1px -1px rgba(0,0,0,0.05), 0px 0px 1px 0px rgba(0,0,0,0.05), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    "&:first-child": {
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6
    },
    "&:last-child": {
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
      borderRight: "1px solid rgb(0,0,0,.2)"
    },
    "&:hover": {
      backgroundColor: "#eee"
    }
  },
  selectedLeagueButton: {
    backgroundColor: "#eee",
    boxShadow: "none"
  }
}));

function LeagueSelector() {
  const classes = useStyles();

  const leagues = useSelector((state: any) => state.scoreboard.leagues);
  const selectedLeague = useSelector(
    (state: any) => state.scoreboard.selectedLeague
  );

  return (
    <div className={classes.selectionGroup}>
      {leagues.map((league: any, index: number) => (
        <LeagueButton
          label={league.label}
          value={league.value}
          image={league.image}
          selected={selectedLeague === league.value}
          key={index}
        />
      ))}
    </div>
  );
}

function LeagueButton({
  label,
  value,
  image,
  selected
}: {
  label: string;
  value: string;
  image: string;
  selected: boolean;
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = (leagueValue: string) => {
    dispatch(changeLeague(leagueValue));
  };

  return (
    <div
      className={clsx(
        classes.leagueButton,
        selected && classes.selectedLeagueButton
      )}
      onClick={() => handleClick(value)}
    >
      <img
        src={image}
        alt={"league button"}
        style={{
          height: "auto",
          width: 32
        }}
      />
    </div>
  );
}

export default LeagueSelector;
