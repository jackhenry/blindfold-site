import React, { createContext, useState, useEffect } from "react";

import teamData from "../data/teams";
import { useDispatch } from "react-redux";
import { loadTeamData } from "../redux/modules/teams";

const teamContext = createContext([]);

export default function TeamProvider({
  children
}: {
  children?: JSX.Element[] | JSX.Element;
}) {
  const dispatch = useDispatch();
  const [teams, setTeams] = useState<any>(null);

  useEffect(() => {
    setTeams(teamData);
    dispatch(loadTeamData(teamData));
    // eslint-disable-next-line
  }, []);

  return <teamContext.Provider value={teams}>{children}</teamContext.Provider>;
}
