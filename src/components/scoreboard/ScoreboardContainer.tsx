import React, { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";

import Definitions from "../../util/query.definitions";
import { Scoreboard } from "./interfaces/scoreboard.interface";
import Game from "./Game";
import { useEventSource } from "../../providers/SSEProvider";
import { setScoreboards, liveUpdate } from "../../redux/modules/scoreboard";

function ScoreboardContainer() {
  const dispatch = useDispatch();
  const source = useEventSource();
  const client = useApolloClient();
  const league = useSelector((state: any) => state.scoreboard.selectedLeague);
  const filterValue = useSelector((state: any) => state.scoreboard.filterValue);
  const scoreboards: Scoreboard[] = useSelector(
    (state: any) => state.scoreboard.scoreboards
  );

  useEffect(() => {
    if (scoreboards) {
      // data property not generic for MessageEvent
      source.addEventListener("scoreboard", (message: any) => {
        console.log("received message...");
        const updates = JSON.parse(message.data);
        dispatch(liveUpdate(scoreboards, updates));
      });
    }
  }, [scoreboards]);

  useEffect(() => {
    const { query, name } = Definitions.scoreboards;
    const getScoreboards = async () => {
      const { data } = await client.query({
        query: query,
        variables: {
          league: league,
          filterValue: filterValue
        }
      });
      const scoreboards: Scoreboard[] = data[name];
      return scoreboards;
    };

    if (filterValue !== null && league !== null) {
      getScoreboards().then(scoreboards => {
        dispatch(setScoreboards(scoreboards));
      });
    }
  }, [filterValue, league, client]);

  if (scoreboards) {
    const boxscores = scoreboards.map((boxscoreData, index) => (
      <Game data={boxscoreData} key={index} />
    ));

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            justifyContent: "center"
          }}
        >
          {boxscores}
        </div>
      </div>
    );
  }

  return null;
}

export default ScoreboardContainer;