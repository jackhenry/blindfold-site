import React from "react";

const eventSourceContext = React.createContext<EventSource>(
  new EventSource("http://localhost:3001/scoreboard")
);

export function useEventSource() {
  return React.useContext(eventSourceContext);
}
