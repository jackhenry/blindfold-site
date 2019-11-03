import React from "react";
import { Provider } from "react-redux";

import HomePage from "./components/home/HomePage";
import { CssBaseline } from "@material-ui/core";
import { store } from "./redux/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <CssBaseline />
        <HomePage />
      </Provider>
    </div>
  );
}

export default App;
