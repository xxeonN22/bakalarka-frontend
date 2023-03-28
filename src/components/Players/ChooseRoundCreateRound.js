import { useState } from "react";
import { Grid, Button, IconButton } from "@mui/material";

import { DialogWindow } from "../DialogWindow";
import CloseIcon from "@mui/icons-material/Close";

import { SelectRound } from "../../components/SelectBoxes/SelectRound";
import { EditRound } from "./EditRound";

export const ChooseRoundCreateRound = (props) => {
  const {
    handleRoundChange,
    selectedRound,
    rounds,
    tournamentId,
    selectedGameDay,
    handleDeleteGameDay,
    handleEditGameDay,
  } = props;

  const [dialogState, setDialogState] = useState(false);

  const handleDialogOpen = () => {
    setDialogState(true);
  };

  const handleDialogClose = () => {
    setDialogState(false);
  };

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
        <Button
          variant="contained"
          sx={{ width: "100%", padding: "1rem" }}
          onClick={() => {
            handleDialogOpen();
          }}
        >
          Upraviť hrací deň
        </Button>
        <DialogWindow open={dialogState} handleCloseModal={handleDialogClose}>
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleDialogClose}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
          <EditRound
            tournamentId={tournamentId}
            editRoundId={selectedRound}
            editGamedayId={selectedGameDay}
            handleDeleteGameDay={handleDeleteGameDay}
            handleEditGameDay={handleEditGameDay}
            handleDialogClose={handleDialogClose}
          ></EditRound>
        </DialogWindow>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      ></Grid>
    </Grid>
  );
};
