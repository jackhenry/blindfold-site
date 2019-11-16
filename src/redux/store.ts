import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import filter from "./modules/filter";
import scoreboard from "./modules/scoreboard";
import teams from "./modules/teams";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  filter,
  scoreboard,
  teams
});

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), devtools())
);
