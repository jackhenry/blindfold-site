const LOAD_TEAMS = "filter/LOAD_TEAMS";

export function loadTeamData(teams) {
  return { type: LOAD_TEAMS, teams };
}

const initialState = {
  library: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TEAMS:
      return { ...state, library: action.teams };
    default:
      return state;
  }
}
