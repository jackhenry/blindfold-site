import gql from "graphql-tag";

const findScoreboards = gql`
  query findScoreboards($league: String) {
    findScoreboards(league: $league) {
      homeTeamName
      homeTeamScore
      homeTeamRecord
      homeTeamQuarters
      homeTeamAbbreviation
      homeTeamImage
      homeTeamColor
      awayTeamName
      awayTeamScore
      awayTeamRecord
      awayTeamQuarters
      awayTeamAbbreviation
      awayTeamImage
      awayTeamColor
      status
      date
      league
    }
  }
`;

const scoreboards = gql`
  query scoreboards($league: String, $filterValue: Int) {
    scoreboards(league: $league, filterValue: $filterValue) {
      homeTeamName
      homeTeamScore
      homeTeamRecord
      homeTeamQuarters
      homeTeamAbbreviation
      homeTeamImage
      homeTeamColor
      awayTeamName
      awayTeamScore
      awayTeamRecord
      awayTeamQuarters
      awayTeamAbbreviation
      awayTeamImage
      awayTeamColor
      status
      date
      league
      gameId
    }
  }
`;

const findFilters = gql`
  query Filters($league: String) {
    filters(league: $league) {
      league
      filterLabel
      filterValue
    }
  }
`;

export default {
  findScoreboards: {
    name: "findScoreboards",
    query: findScoreboards
  },
  findFilters: {
    name: "filters",
    query: findFilters
  },
  scoreboards: {
    name: "scoreboards",
    query: scoreboards
  }
};
