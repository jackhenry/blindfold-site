import { combineReducers, compose, createStore } from "redux";

import filter from "./modules/filter";
import teams from "./modules/teams";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  filter,
  teams
});

export const store = createStore(rootReducer, devtools());
