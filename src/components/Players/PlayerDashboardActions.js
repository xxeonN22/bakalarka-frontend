import { appTheme } from "../../themes/appTheme";
import { Grid, Button } from "@mui/material";

import { ChooseGroup } from "../../components/MovePlayers/ChooseGroup";
import { EmailSettings } from "../../components/EmailSettings";

export const PlayerDashboardActions = (props) => {
  const {
    checkedBoxes,
    setCheckedBoxes,
    setAllChecked,
    tournamentId,
    setResponseMessage,
    groups,
    selectedGroup,
    handleGroupChange,
    handleMovePlayers,
    handleDeletePlayers,
  } = props;
  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: "1rem",
        display: checkedBoxes.length > 0 ? "flex" : "none",
        justifyContent: "space-between",
        [appTheme.breakpoints.up("lg")]: { justifyContent: "flex-start" },
      }}
    >
      <Grid item xs={12} sm={6} md={4} lg={2.5}>
        <EmailSettings
          checkedBoxes={checkedBoxes}
          setCheckedBoxes={setCheckedBoxes}
          setAllChecked={setAllChecked}
          tournamentId={tournamentId}
          setResponseMessage={setResponseMessage}
        ></EmailSettings>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2.5}>
        <ChooseGroup
          checkedBoxes={checkedBoxes}
          groups={groups}
          selectedGroup={selectedGroup}
          handleGroupChange={handleGroupChange}
          handleMovePlayers={handleMovePlayers}
        ></ChooseGroup>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={2.5}
        sx={{
          [appTheme.breakpoints.up("lg")]: {
            marginLeft: "auto",
          },
        }}
      >
        <Button
          color="error"
          variant="contained"
          sx={{
            width: "100%",
            padding: "1rem",
          }}
          onClick={() => handleDeletePlayers()}
        >{`Odstrániť hráč${checkedBoxes.length > 1 ? "ov" : "a"}`}</Button>
      </Grid>
    </Grid>
  );
};
