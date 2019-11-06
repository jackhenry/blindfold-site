import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { createFuseObject } from "./fuse.util";

import TeamData from "../../data/nfl-teams";
import { loadTeamData } from "../../redux/modules/teams";
import { updateSuggestions } from "../../redux/modules/filter";
import SuggestionItem from "./SuggestionItem";

const useStyles = makeStyles(theme => ({
  //Style
  suggestionItemWrapper: {
    borderBottom: "1px solid #eee",
    "&:first-child": {
      borderTop: "1px solid #eee"
    }
  }
}));

function Suggestions({ input }: { input: string }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const filterInput = useSelector((state: any) => state.filter.filterInputText);
  const teams = useSelector((state: any) => state.teams.library);
  const suggestions = useSelector((state: any) => state.filter.suggestions);

  const [fuse, setFuse] = useState<any>(null);

  //Load team data
  useEffect(() => {
    const { nfl, nhl, nba } = TeamData;

    const aggregate: any = [];

    nfl.forEach(team => {
      aggregate.push(team);
    });

    nhl.forEach(team => {
      aggregate.push({
        ...team,
        league: "NHL"
      });
    });

    nba.forEach(team => {
      aggregate.push({
        ...team,
        league: "NBA"
      });
    });

    dispatch(loadTeamData(aggregate));
  }, [dispatch]);

  useEffect(() => {
    if (teams) {
      setFuse(createFuseObject(teams, ["name", "city"]));
    }
  }, [teams]);

  useEffect(() => {
    if (fuse && filterInput !== null) {
      const suggestions = fuse.search(filterInput);
      dispatch(updateSuggestions(suggestions));
    }
  }, [dispatch, filterInput, fuse]);

  if (!suggestions) return null;

  return suggestions.map((suggestion: any, index: any) => (
    <div className={classes.suggestionItemWrapper}>
      <SuggestionItem data={suggestion} key={index} />
    </div>
  ));
}

export default Suggestions;
