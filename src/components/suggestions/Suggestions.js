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

function Suggestions({ input }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const filterInput = useSelector(state => state.filter.filterInputText);
  const teams = useSelector(state => state.teams.library);
  const suggestions = useSelector(state => state.filter.suggestions);

  const [fuse, setFuse] = useState(null);

  //Load team data
  useEffect(() => {
    const { nfl, nhl } = TeamData;

    const aggregate = [];

    nfl.forEach(team => {
      aggregate.push(team);
    });

    nhl.forEach(team => {
      aggregate.push({
        ...team,
        league: "NHL"
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

  return suggestions.map((suggestion, index) => (
    <div className={classes.suggestionItemWrapper}>
      <SuggestionItem data={suggestion} key={index} />
    </div>
  ));
}

export default Suggestions;