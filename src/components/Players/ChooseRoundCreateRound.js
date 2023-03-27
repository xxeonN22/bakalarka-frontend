import { Grid, Typography } from "@mui/material";

import { SelectRound } from "../../components/SelectBoxes/SelectRound";
import { RoundAction } from "../../components/RoundAction";
import { EditRound } from "./EditRound";

export const ChooseRoundCreateRound = (props) => {
  const {
    handleRoundChange,
    selectedRound,
    rounds,
    tournamentId,
    selectedGameDay,
    handleDeleteGameDay,
  } = props;
  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <SelectRound
          handleRoundChange={handleRoundChange}
          selectedRound={selectedRound}
          rounds={rounds}
        ></SelectRound>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2}
        sx={{ display: "flex", justifyContent: "flex-end", marginLeft: "auto" }}
      >
        <RoundAction buttonText="Upraviť hrací deň">
          <EditRound
            tournamentId={tournamentId}
            editRoundId={selectedRound}
            editGamedayId={selectedGameDay}
            handleDeleteGameDay={handleDeleteGameDay}
          ></EditRound>
        </RoundAction>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <RoundAction buttonText="Vytvoriť nový hrací deň">
          <Typography>Ahoj</Typography>
        </RoundAction>
      </Grid>
    </Grid>
  );
};
