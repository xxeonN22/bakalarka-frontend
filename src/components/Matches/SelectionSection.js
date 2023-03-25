import { appTheme } from "../../themes/appTheme";
import { Grid } from "@mui/material";

import { SelectGroup } from "../SelectBoxes/SelectGroup";
import { SelectRound } from "../SelectBoxes/SelectRound";
import { SelectGameday } from "../SelectBoxes/SelectGameday";
import { SelectCourts } from "../Matches/SelectCourts";

const roundCourtsGridStyle = {
  display: "flex",
  justifyContent: "space-between",
  [appTheme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
  },
};

export const SelectionSection = (props) => {
  const {
    handleGroupChange,
    selectedGroup,
    groups,
    handleRoundChange,
    selectedRound,
    rounds,
    handleGameDayChange,
    selectedGameDay,
    gameDays,
    setSelectedCourts,
    numberOfCourts,
  } = props;
  return (
    <Grid container item xs={12} spacing={2} sx={roundCourtsGridStyle}>
      <Grid item xs={6} lg={3}>
        <SelectGroup
          handleGroupChange={handleGroupChange}
          selectedGroup={selectedGroup}
          groups={groups}
        ></SelectGroup>
      </Grid>
      <Grid item xs={6} lg={3}>
        <SelectRound
          handleRoundChange={handleRoundChange}
          selectedRound={selectedRound}
          rounds={rounds}
        ></SelectRound>
      </Grid>
      <Grid item xs={6} lg={3}>
        <SelectGameday
          handleGameDayChange={handleGameDayChange}
          selectedGameDay={selectedGameDay}
          gameDays={gameDays}
        ></SelectGameday>
      </Grid>
      <Grid item xs={6} lg={3}>
        <SelectCourts
          setSelectedCourts={setSelectedCourts}
          numberOfCourts={numberOfCourts}
        ></SelectCourts>
      </Grid>
    </Grid>
  );
};
