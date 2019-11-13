import React from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import { client } from "./util/gqlclient";
import { store } from "./redux/store";
import history from "./util/history";

import HomePage from "./components/home/HomePage";
import { ApolloProvider } from "@apollo/react-hooks";
import ScoresView from "./components/scoreboard/view/ScoresView";
import TeamProvider from "./providers/TeamProvider";

function App() {
  return (
    <div>
      <CssBaseline />
      <Provider store={store}>
        <ApolloProvider client={client}>
          <TeamProvider>
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/scoreboard" component={ScoresView} />
              </Switch>
            </Router>
          </TeamProvider>
        </ApolloProvider>
      </Provider>
    </div>
  );
}

export default App;
