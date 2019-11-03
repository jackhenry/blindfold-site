import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import logger from "redux-logger";

import filter from "./modules/filter";
import teams from "./modules/teams";

const environment = process.env.NODE_ENV;
const middleware =
  environment === "development" ? applyMiddleware(logger) : null;

const enchancers = compose(
  middleware,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const rootReducer = combineReducers({
  filter,
  teams
});

export const store = createStore(rootReducer, enchancers);
