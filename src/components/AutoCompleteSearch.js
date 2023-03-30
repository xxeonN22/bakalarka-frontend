import { appTheme } from "../themes/appTheme";
import {
  TextField,
  Autocomplete,
  InputAdornment,
  createFilterOptions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const OPTIONS_LIMIT = 3;
const filterOptions = createFilterOptions({
  limit: OPTIONS_LIMIT,
});

export const AutoCompleteSearch = (props) => {
  const {
    style,
    id,
    filteredData,
    searchText,
    setSearchText,
    placeholder,
    handleSearchTournament,
  } = props;
  const handleClearClick = () => {
    setSearchText("");
  };
  return (
    <Autocomplete
      sx={style}
      filterOptions={filterOptions}
      freeSolo
      id={id}
      disableClearable
      options={filteredData.map((data) => data.name)}
      value={searchText}
      onChange={(event, value) => {
        if (handleSearchTournament) {
          handleSearchTournament(value);
        }
      }}
      onInputChange={(event, newValue) => {
        setSearchText(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            backgroundColor: "white",
            borderRadius: "4px",
            color: appTheme.palette.primary.main,
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && handleSearchTournament) {
              handleSearchTournament(event.target.value);
            }
          }}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <InputAdornment position="start" sx={{ marginLeft: "0.5rem" }}>
                  <SearchIcon color="primary" />
                </InputAdornment>
                {params.InputProps.startAdornment}
              </>
            ),
            endAdornment: (
              <>
                {searchText && (
                  <InputAdornment
                    position="end"
                    onClick={handleClearClick}
                    sx={{ cursor: "pointer", marginRight: "0.5rem" }}
                  >
                    <ClearIcon color="primary" />
                  </InputAdornment>
                )}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
