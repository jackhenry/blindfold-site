import Omit from "lodash.omit";

import Leagues from "../../data/leagues";

const CHANGE_LEAGUE = "scoreboard/CHANGE_LEAGUE";
const CHANGE_FILTER = "scoreboard/CHANGE_FILTER";
const LOAD_FILTERS = "scoreboard/LOAD_FILTERS";
const SET_SCOREBOARDS = "scoreboard/SET_SCOREBOARDS";
const UPDATE_MANY_SCORES = "scoreboard/UPDATE_MANY_SCOREBOARDS";

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

export function updateManyScoreboards(updates) {
  return { type: UPDATE_MANY_SCORES, updates };
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
    case UPDATE_MANY_SCORES:
      const updatedScoreboards = state.scoreboards.map(scoreboard => {
        const update = action.updates.find(
          update => scoreboard.gameId === update.gameId
        );

        if (!update) return scoreboard;

        const omitted = Omit(scoreboard, Object.keys(update));

        return {
          ...update,
          ...omitted
        };
      });

      return { ...state, scoreboards: updatedScoreboards };
    default:
      return state;
  }
}
