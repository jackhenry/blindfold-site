import Omit from "lodash.omit";

import Leagues from "../../data/leagues";

const CHANGE_LEAGUE = "scoreboard/CHANGE_LEAGUE";
const CHANGE_FILTER = "scoreboard/CHANGE_FILTER";
const LOAD_FILTERS = "scoreboard/LOAD_FILTERS";
const SET_SCOREBOARDS = "scoreboard/SET_SCOREBOARDS";
const UPDATE_SCOREBOARD = "scoreboard/UPDATE_SCOREBOARD";

export function changeLeague(league) {
  return { type: CHANGE_LEAGUE, league };
}

export function loadFilters(filters) {
  return { type: LOAD_FILTERS, filters };
}

export function changeFilter({ filterLabel, filterValue, filterIndex }) {
  return { type: CHANGE_FILTER, filterLabel, filterValue, filterIndex };
}

export function setScoreboards(scoreboards) {
  return { type: SET_SCOREBOARDS, scoreboards };
}

export function updateScoreboard(update) {
  return { type: UPDATE_SCOREBOARD, update };
}

const initialState = {
  leagues: Leagues,
  selectedLeague: "NBA",
  filterLabel: null,
  filterValue: null,
  filterIndex: null,
  filters: null,
  scoreboards: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LEAGUE:
      return { ...initialState, selectedLeague: action.league };
    case CHANGE_FILTER:
      return {
        ...state,
        filterLabel: action.filterLabel,
        filterValue: action.filterValue,
        filterIndex: action.filterIndex
      };
    case LOAD_FILTERS:
      return {
        ...state,
        filters: action.filters
      };
    case SET_SCOREBOARDS:
      return {
        ...state,
        scoreboards: action.scoreboards
      };
    case UPDATE_SCOREBOARD:
      const { gameId } = action.update;
      const index = state.scoreboards.findIndex(
        scoreboard => scoreboard.gameId === gameId
      );

      return {
        ...state,
        scoreboards: [
          ...state.scoreboards.slice(0, index),
          action.update,
          ...state.scoreboards.slice(index + 1)
        ]
      };
    default:
      return state;
  }
}

export function liveUpdate(scoreboards, updates) {
  return dispatch => {
    updates.forEach(update => {
      scoreboards.forEach(scoreboard => {
        if (scoreboard.gameId === update.gameId) {
          const omitted = Omit(scoreboard, Object.keys(update));
          const updatedScoreboard = {
            ...omitted,
            ...update
          };

          dispatch(updateScoreboard(updatedScoreboard));
        }
      });
    });
  };
}
