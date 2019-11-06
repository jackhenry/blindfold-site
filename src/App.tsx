import React from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import HomePage from "./components/home/HomePage";
import history from "./util/history";
import { store } from "./redux/store";

function App() {
  return (
    <div>
      <CssBaseline />
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
