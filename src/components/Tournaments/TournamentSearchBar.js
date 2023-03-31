import { appTheme } from "../../themes/appTheme";
import { Grid } from "@mui/material";

import { AutoCompleteSearch } from "../AutoCompleteSearch";

const gridItemStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  [appTheme.breakpoints.up("lg")]: {
    justifyContent: "center",
  },
};

export const TournamentSearchBar = (props) => {
  const { filteredData, searchText, setSearchText } = props;
  return (
    <Grid item xs={12} sm={6} md={6} lg={12} sx={gridItemStyle}>
      <AutoCompleteSearch
        id="search-tournament"
        filteredData={filteredData}
        searchText={searchText}
        setSearchText={setSearchText}
        placeholder="Vyhľadať turnaj"
        style={{
          width: "50%",
          [appTheme.breakpoints.down("lg")]: {
            width: "100%",
          },
        }}
      ></AutoCompleteSearch>
    </Grid>
  );
};
