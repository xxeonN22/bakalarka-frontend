import { appTheme } from "../../themes/appTheme";
import { Box } from "@mui/material";

import { MatchFilter } from "./MatchFilter";
import { DeleteMatch } from "./DeleteMatch";

const boxStyle = (selectedMatches) => {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    marginBottom: "1rem",
    [appTheme.breakpoints.down("md")]: {
      gap: "1rem",
      justifyContent: `${
        selectedMatches.length === 0 ? "center" : "space-between"
      }`,
    },
  };
};

export const ActionButtons = (props) => {
  const {
    selectedMatches,
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleDeleteButtonClick,
  } = props;
  return (
    <Box sx={boxStyle(selectedMatches)}>
      <MatchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      ></MatchFilter>
      {selectedMatches.length > 0 && (
        <DeleteMatch
          selectedMatches={selectedMatches}
          handleDeleteButtonClick={handleDeleteButtonClick}
        ></DeleteMatch>
      )}
    </Box>
  );
};
