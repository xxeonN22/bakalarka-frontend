import { appTheme } from "../../themes/appTheme";
import { TextField } from "@mui/material";

export const MatchFilter = (props) => {
  const { searchQuery, setSearchQuery, handleSearch } = props;
  return (
    <TextField
      label="Filter zápasov"
      id="mach-filter"
      value={searchQuery}
      onChange={(event) => {
        setSearchQuery(event.target.value);
        handleSearch(event.target.value);
      }}
      sx={{
        width: "34%",
        marginBottom: "0.5rem",
        [appTheme.breakpoints.down("md")]: {
          width: "50%",
        },
      }}
    />
  );
};
