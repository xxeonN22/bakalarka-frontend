import { useState } from "react";
import { Grid, Button, IconButton } from "@mui/material";

import { DialogWindow } from "../DialogWindow";
import CloseIcon from "@mui/icons-material/Close";

import { SelectRound } from "../../components/SelectBoxes/SelectRound";
import { EditRound } from "./EditRound";
import { NewGameDay } from "./NewGameDay";

export const ChooseRoundCreateRound = (props) => {
  const {
    handleRoundChange,
    selectedRound,
    rounds,
    tournamentId,
    selectedGameDay,
    handleDeleteGameDay,
    handleEditGameDay,
    handleNewGameDay,
  } = props;

  const [dialogState, setDialogState] = useState({
    editGameDay: false,
    newGameDay: false,
  });

  const handleDialogOpen = (dialogName) => {
    setDialogState((prevState) => ({ ...prevState, [dialogName]: true }));
  };

  const handleDialogClose = (dialogName) => {
    setDialogState((prevState) => ({ ...prevState, [dialogName]: false }));
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
            handleDialogOpen("editGameDay");
          }}
        >
          Upraviť hrací deň
        </Button>
        <DialogWindow
          open={dialogState.editGameDay}
          handleCloseModal={() => handleDialogClose("editGameDay")}
        >
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={() => handleDialogClose("editGameDay")}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
          <EditRound
            tournamentId={tournamentId}
            editRoundId={selectedRound}
            editGamedayId={selectedGameDay}
            handleDeleteGameDay={handleDeleteGameDay}
            handleEditGameDay={handleEditGameDay}
            handleCloseModal={() => handleDialogClose("editGameDay")}
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
        sx={{ display: "flex", justifyContent: "flex-end", marginLeft: "auto" }}
      >
        <Button
          variant="contained"
          sx={{ width: "100%", padding: "1rem" }}
          onClick={() => {
            handleDialogOpen("newGameDay");
          }}
        >
          Vytvoriť nový hrací deň
        </Button>
        <DialogWindow
          open={dialogState.newGameDay}
          handleCloseModal={() => handleDialogClose("newGameDay")}
        >
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={() => handleDialogClose("newGameDay")}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
          <NewGameDay
            tournamentId={tournamentId}
            handleNewGameDay={handleNewGameDay}
            handleCloseModal={() => handleDialogClose("newGameDay")}
          ></NewGameDay>
        </DialogWindow>
      </Grid>
    </Grid>
  );
};
