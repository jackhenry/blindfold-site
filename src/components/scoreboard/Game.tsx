import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";

import { Scoreboard } from "./interfaces/scoreboard.interface";
import Boxscore from "./Boxscore";
import clsx from "clsx";
import HorizontalProgress from "../progress/HorizontalProgress";

const useStyles = makeStyles(theme => ({
  //Style
  card: {
    width: 350,
    margin: theme.spacing(1)
  },
  teamWrapper: {
    display: "flex"
  },
  teamNames: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  teamNameText: {
    fontWeight: 700,
    fontSize: 16,
    marginLeft: theme.spacing(1)
  },
  teamScores: {
    display: "flex",
    flexDirection: "column"
  },
  teamScoreText: {
    fontWeight: 700,
    fontSize: 16,
    textAlign: "right"
  },
  gameBoxscoreWrapper: {
    display: "flex",
    justifyContent: "center"
  },
  hidden: {
    display: "none"
  }
}));

function Game({ data }: { data: Scoreboard }) {
  const classes = useStyles();

  const gameNotStarted =
    data.awayTeamQuarters.length === 0 && data.homeTeamQuarters.length === 0;

  const inProgress =
    !gameNotStarted && !data.status.toLowerCase().includes("final");

  return (
    <Card className={classes.card}>
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 8,
            fontWeight: 700
          }}
        >
          <span
            style={{
              fontWeight: 700
            }}
          >
            {format(new Date(data.date), "MMMM do")}
          </span>
        </div>
        <div className={classes.teamWrapper}>
          <div className={classes.teamNames}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TeamImage url={data.awayTeamImage} />
              <span className={classes.teamNameText}>{data.awayTeamName}</span>
              <span
                style={{
                  fontWeight: 500,
                  marginLeft: 4
                }}
              >
                {data.awayTeamRecord}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TeamImage url={data.homeTeamImage} />
              <span className={classes.teamNameText}>{data.homeTeamName}</span>
              <span
                style={{
                  fontWeight: 500,
                  marginLeft: 4
                }}
              >
                {data.homeTeamRecord}
              </span>
            </div>
          </div>
          <div className={classes.teamScores}>
            <span className={classes.teamScoreText}>{data.awayTeamScore}</span>
            <span className={classes.teamScoreText}>{data.homeTeamScore}</span>
          </div>
        </div>
        <Divider
          style={{
            marginTop: 6
          }}
          className={clsx(false && classes.hidden)}
        />
        <div
          className={clsx(classes.gameBoxscoreWrapper, false && classes.hidden)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              fontWeight: 700,
              fontSize: 16
            }}
          >
            <span
              style={{
                color: data.status.toLowerCase().includes("final")
                  ? "#4BB543"
                  : "#4BB543"
              }}
            >
              {formatStatus(data.status)}
              {inProgress && <HorizontalProgress />}
            </span>
          </div>
          <Boxscore boxscoreData={data} />
        </div>
      </CardContent>
    </Card>
  );
}

function TeamImage({ url }: { url: string }) {
  return (
    <img
      style={{
        height: "auto",
        width: 28
      }}
      src={url}
      alt="Team logo"
    />
  );
}

const formatStatus = (status: string) => {
  try {
    const date = new Date(status);
    if (!isNaN(date.getTime())) {
      return format(date, "h:mm a");
    }
  } catch (e) {
    console.error(e);
  }

  return status;
};

export default Game;
