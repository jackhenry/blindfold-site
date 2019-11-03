const CHANGE_INPUT = "filter/CHANGE_INPUT";
const UPDATE_FOCUS = "filter/UPDATE_FOCUS";
const UPDATE_SUGGESTIONS = "filter/UPDATE_SUGGESTIONS";
const UPDATE_SELECTED_FILTERS = "filter/UPDATE_SELECTED_FILTERS";

export function changeFilterInput(input) {
  return { type: CHANGE_INPUT, input };
}

export function updateInputFocus(hasFocus) {
  return { type: UPDATE_FOCUS, hasFocus };
}

export function updateSuggestions(suggestions) {
  return { type: UPDATE_SUGGESTIONS, suggestions };
}

export function updateSelectedFilters(filters) {
  return { type: UPDATE_SELECTED_FILTERS, filters };
}

const initialState = {
  filterInputText: null,
  inputHasFocus: false,
  suggestions: [
    {
      name: "Minnesota Vikings",
      conference: "NFC",
      division: "North",
      city: "Minneapolis",
      state: "MN",
      image: "https://i.postimg.cc/WpDvHjWM/vikings.png",
      league: "NFL"
    }
  ],
  selected: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return { ...state, filterInputText: action.input };
    case UPDATE_FOCUS:
      return { ...state, inputHasFocus: action.hasFocus };
    case UPDATE_SUGGESTIONS:
      return { ...state, suggestions: action.suggestions };
    case UPDATE_SELECTED_FILTERS:
      return { ...state, selected: action.filters };
    default:
      return state;
  }
}
