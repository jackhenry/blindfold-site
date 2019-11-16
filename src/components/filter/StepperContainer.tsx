import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useApolloClient } from "@apollo/react-hooks";

import Definitions from "../../util/query.definitions";
import Stepper from "./Stepper";
import { Filter } from "./interfaces/filter.interface";
import { changeFilter, loadFilters } from "../../redux/modules/scoreboard";

function StepperContainer() {
  const client = useApolloClient();
  const dispatch = useDispatch();

  const league = useSelector((state: any) => state.scoreboard.selectedLeague);
  const { filters, filterLabel, filterIndex } = useSelector(
    (state: any) => state.scoreboard
  );

  const { query, name } = Definitions.findFilters;

  useEffect(() => {
    const getFilters = async () => {
      const { data } = await client.query({
        query: query,
        variables: {
          league: league
        }
      });

      const filters: Filter[] = data[name];
      return filters;
    };

    getFilters().then(filters => {
      dispatch(loadFilters(filters));
      //Filters are returned in order of
      //date or week in descending order.
      //The first element is the most recent filter
      const initialFilter = filters[0];
      dispatch(
        changeFilter({
          filterLabel: initialFilter.filterLabel,
          filterValue: initialFilter.filterValue,
          filterIndex: 0
        })
      );
    });
    // eslint-disable-next-line
  }, [league]);

  const handleFilterChange = (delta: number) => {
    const max = filters.length - 1;

    const updateFilterState = (newIndex: number) => {
      dispatch(
        changeFilter({
          filterIndex: newIndex,
          filterLabel: filters[newIndex].filterLabel,
          filterValue: filters[newIndex].filterValue
        })
      );
    };

    switch (delta) {
      case -1:
        if (filterIndex > 0) {
          const newIndex = filterIndex + delta;
          //decrease filter index (e.g. go to next recent filter)
          updateFilterState(newIndex);
        }
        break;
      case 1:
        if (filterIndex < max) {
          //increase filter index
          const newIndex = filterIndex + delta;
          //increase filter index (e.g. go to next oldest filter)
          updateFilterState(newIndex);
        }
        break;
      default:
        break;
    }
  };

  if (filterLabel !== null) {
    return (
      <Stepper filterLabel={filterLabel} onFilterChange={handleFilterChange} />
    );
  }

  return null;
}

export default StepperContainer;
