import { appTheme } from "../../themes/appTheme";
import { Box, Tabs, tabsClasses, Tab } from "@mui/material";

export const GameDaysTabs = (props) => {
  const { value, handleChange, gameDays, handleGameDayChange } = props;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
        [appTheme.breakpoints.down("md")]: { marginBottom: "4rem" },
      }}
    >
      <Box
        sx={{
          width: "200px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          aria-label="visible arrows tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: appTheme.palette.sunglow.dark,
            },
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
        >
          {gameDays.length > 0 &&
            gameDays.map((gameday) => {
              return (
                <Tab
                  sx={{ width: "100%" }}
                  onClick={() => handleGameDayChange(gameday)}
                  key={gameday}
                  label={gameday}
                />
              );
            })}
        </Tabs>
      </Box>
    </Box>
  );
};
