import { TextField, Autocomplete, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

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
                  <SearchIcon />
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
                    sx={{ cursor: "pointer" }}
                  >
                    <ClearIcon />
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
