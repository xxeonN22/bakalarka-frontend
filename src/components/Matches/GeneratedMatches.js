import { MatchBox } from "../MatchBox";

export const GeneratedMatches = (props) => {
  const { searchResults, matches, handleButtonClick, handleCheckboxClick } =
    props;
  return (
    <>
      {searchResults.length > 0
        ? searchResults.map((match) => {
            const matchId = match[0];
            return (
              <MatchBox
                key={matchId}
                match={match}
                handleButtonClick={handleButtonClick}
                handleCheckboxClick={handleCheckboxClick}
              ></MatchBox>
            );
          })
        : matches.map((match) => {
            const matchId = match[0];
            return (
              <MatchBox
                key={matchId}
                match={match}
                handleButtonClick={handleButtonClick}
                handleCheckboxClick={handleCheckboxClick}
              ></MatchBox>
            );
          })}
    </>
  );
};
