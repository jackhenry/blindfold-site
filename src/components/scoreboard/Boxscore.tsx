import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Scoreboard } from "./interfaces/scoreboard.interface";

const useStyles = makeStyles(theme => ({
  //Style
  table: {
    display: "flex",
    borderCollapse: "collapse"
  },
  row: {
    padding: 8,
    textAlign: "right",
    fontSize: 14,
    fontWeight: 600
  },
  teamContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  }
}));

function Boxscore({ boxscoreData }: { boxscoreData: Scoreboard }) {
  const classes = useStyles();

  const {
    homeTeamAbbreviation,
    homeTeamName,
    homeTeamQuarters,
    homeTeamColor,
    homeTeamScore,
    awayTeamName,
    awayTeamAbbreviation,
    awayTeamQuarters,
    awayTeamColor,
    awayTeamScore,
    league
  } = boxscoreData;

  return (
    <table className={classes.table}>
      <tbody>
        <BoxscoreHeader
          homeQuarters={homeTeamQuarters}
          awayQuarters={awayTeamQuarters}
          league={league}
        />
        <BoxscoreRow
          teamAbbreviation={awayTeamAbbreviation || awayTeamName}
          teamQuarters={awayTeamQuarters}
          teamScore={awayTeamScore}
          teamColor={awayTeamColor}
        />
        <BoxscoreRow
          teamAbbreviation={homeTeamAbbreviation || homeTeamName}
          teamQuarters={homeTeamQuarters}
          teamScore={homeTeamScore}
          teamColor={homeTeamColor}
        />
      </tbody>
    </table>
  );
}

function BoxscoreHeader({
  homeQuarters,
  awayQuarters,
  league
}: {
  homeQuarters: string[];
  awayQuarters: string[];
  league: string;
}) {
  const classes = useStyles();

  let numberOfQuarters = 0;
  if (homeQuarters.length > awayQuarters.length) {
    numberOfQuarters = homeQuarters.length;
  } else {
    numberOfQuarters = awayQuarters.length;
  }

  //Fill empty columns in boxscore if game hasn't started yet
  if (homeQuarters.length === 0 && awayQuarters.length === 0) {
    if (league === "NFL" || league === "NHL") {
      numberOfQuarters = 4;
    }

    if (league === "NHL") {
      numberOfQuarters = 3;
    }
  }

  const quartersHeaders = [...Array(numberOfQuarters)].map((_, index) => {
    if (league.toUpperCase() === "NFL") {
      if (index + 1 > 4) {
        return "OT";
      }
    }
    return index + 1;
  });

  const header = ["", ...quartersHeaders, "T"].map((value, index) => (
    <th className={classes.row} style={{ textAlign: "right" }} key={index}>
      <span>{value}</span>
    </th>
  ));

  return <tr>{header}</tr>;
}

function BoxscoreRow({
  teamAbbreviation,
  teamQuarters,
  teamScore,
  teamColor
}: {
  teamAbbreviation: string;
  teamQuarters: string[];
  teamScore: string;
  teamColor: string;
}) {
  const classes = useStyles();
  return (
    <tr>
      <td
        className={classes.row}
        style={{
          width: 50
        }}
      >
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#eee",
            backgroundColor: teamColor,
            borderRadius: 4,
            padding: "4px 2px",
            minWidth: 50
          }}
        >
          {teamAbbreviation}
        </span>
      </td>
      {[...teamQuarters, teamScore].map((value, index) => (
        <td key={index} className={classes.row}>
          <span>{value}</span>
        </td>
      ))}
    </tr>
  );
}

export default Boxscore;
