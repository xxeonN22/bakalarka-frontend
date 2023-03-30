import { appTheme } from "../../themes/appTheme";
import { Box, Typography, Checkbox } from "@mui/material";

import { SearchField } from "./SearchField";

const boxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: appTheme.palette.primary.dark,
  padding: "1rem",
  marginBlock: "1rem",
  color: "white",
  textAlign: "center",
  [appTheme.breakpoints.down("md")]: {
    paddingInline: "0.3rem",
    position: "relative",
  },
};

export const PlayerDashboardTableHeader = (props) => {
  const {
    searchName,
    handleSearchName,
    allChecked,
    handleCheckAll,
    searchGroup,
    handleSearchGroup,
  } = props;
  return (
    <Box sx={boxStyle}>
      <Checkbox
        sx={{
          padding: "0px",
          flex: "1",
          [appTheme.breakpoints.down("sm")]: { flex: "0" },
        }}
        onChange={handleCheckAll}
        checked={allChecked}
      ></Checkbox>
      <Typography
        sx={{
          flex: "1",
          [appTheme.breakpoints.down("md")]: { display: "none" },
        }}
      >
        Poradie
      </Typography>
      <Box
        sx={{
          flex: "3",
          [appTheme.breakpoints.down("md")]: { flex: "2" },
        }}
      >
        <Typography
          sx={{
            marginBottom: "0.5rem",
            [appTheme.breakpoints.down("md")]: { marginBottom: "0" },
          }}
        >
          Meno
        </Typography>
        <SearchField
          id="search-name"
          label="Vyhľadať hráča"
          value={searchName}
          handleChange={handleSearchName}
          left={0}
        ></SearchField>
      </Box>
      <Typography sx={{ flex: "1" }}>ELO</Typography>
      <Box
        sx={{
          flex: "2",
          [appTheme.breakpoints.down("md")]: { flex: "1" },
        }}
      >
        <Typography
          sx={{
            marginBottom: "0.5rem",
            [appTheme.breakpoints.down("md")]: { marginBottom: "0" },
          }}
        >
          Skupina
        </Typography>

        <SearchField
          id="search-group"
          label="Vyhľadať skupinu"
          value={searchGroup}
          handleChange={handleSearchGroup}
          right={0}
        ></SearchField>
      </Box>
      <Typography sx={{ flex: "1" }}>Účasť</Typography>
    </Box>
  );
};
