import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import AddIcon from "@material-ui/icons/AddCircleOutline";
import BasketballIcon from "@material-ui/icons/SportsBasketball";
import FootballIcon from "@material-ui/icons/SportsFootball";
import HockeyIcon from "@material-ui/icons/SportsHockey";

const useStyles = makeStyles(theme => ({
  //Style
  itemHighlighted: {
    backgroundColor: "#eee"
  },
  textLine: {
    display: "flex",
    justifyContent: "flex-start"
  },
  addIconWrapper: {
    alignSelf: "center",
    marginRight: 16
  },
  addIcon: {
    fill: green[500]
  },
  addIconHighlighted: {
    fill: green[700]
  }
}));

function SuggestionItem({ data }: { data: any }) {
  const classes = useStyles();

  console.log(data.image);

  const [highlighted, setHighlighted] = useState(false);

  return (
    <div
      style={{ display: "flex", cursor: "pointer", color: "#121212" }}
      className={clsx(highlighted && classes.itemHighlighted)}
      onMouseEnter={() => setHighlighted(true)}
      onMouseLeave={() => setHighlighted(false)}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {data.image && (
          <img
            style={{
              height: 64,
              width: 64,
              padding: 8
            }}
            src={data.image}
            alt={`${data.name} team logo`}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          alignSelf: "center",
          justifyContent: "space-between"
        }}
      >
        <div>
          <span
            className={classes.textLine}
            style={{
              fontSize: 20,
              fontWeight: 700
            }}
          >
            {data.name}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <span
              className={classes.textLine}
              style={{
                fontWeight: 600
              }}
            >{`${data.city}, ${data.state}`}</span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: 8,
                fontWeight: 700
              }}
            >
              <SportIcon league={data.league} />
            </span>
          </div>
        </div>
        <div className={classes.addIconWrapper}>
          <AddIcon
            className={clsx(
              classes.addIcon,
              highlighted && classes.addIconHighlighted
            )}
          />
        </div>
      </div>
    </div>
  );
}

function SportIcon({ league }: { league: string }) {
  const style = {
    marginLeft: 2,
    height: 16,
    width: 16,
    fill: "#624a2e"
  };

  switch (league) {
    case "NFL":
      return <FootballIcon style={style} />;
    case "NHL":
      return <HockeyIcon style={style} />;
    case "NBA":
      return (
        <BasketballIcon
          style={{
            ...style,
            fill: "#FA8320"
          }}
        />
      );
    default:
      return <FootballIcon style={style} />;
  }
}

export default SuggestionItem;
