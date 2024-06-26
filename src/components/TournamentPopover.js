import { useState } from "react";
import { Button, IconButton, Popover, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DialogWindow } from "./DialogWindow";
import { EditTournamentSettings } from "./EditTournamentSettings";
import { DeleteTournament } from "./DeleteTournament";
import { StepperAddPlayer } from "./StepperAddPlayer";

export const TournamentPopover = ({
  tournamentId,
  tournamentName,
  sportType,
  handleDeleteTournament,
  handleEditTournament,
  handleAddPlayers,
  handleCopyPlayers,
  handleImportPlayers,
}) => {
  const [dialogState, setDialogState] = useState({
    addPlayers: false,
    editSettings: false,
    deleteTournament: false,
  });

  const handleDialogOpen = (dialogName) => {
    setDialogState((prevState) => ({ ...prevState, [dialogName]: true }));
  };

  const handleDialogClose = (dialogName) => {
    setDialogState((prevState) => ({ ...prevState, [dialogName]: false }));
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const popperOpen = Boolean(anchorEl);
  const id = popperOpen ? "simple-popover" : undefined;
  return (
    <>
      <IconButton
        color="sunglow"
        aria-describedby={id}
        onClick={handleClick}
        sx={{
          position: "absolute",
          top: "0",
          right: "0",
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={popperOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        transformOrigin={{ vertical: "center", horizontal: "center" }}
      >
        <Box display="flex" flexDirection="column">
          <Button
            onClick={() => {
              handleDialogOpen("editSettings");
            }}
            sx={{ borderRadius: "0" }}
            variant="contained"
          >
            Upraviť nastavenia
          </Button>
          <DialogWindow
            handleClose={handleClose}
            open={dialogState.editSettings}
            handleCloseModal={() => handleDialogClose("editSettings")}
          >
            <EditTournamentSettings
              handleClose={handleClose}
              handleCloseModal={() => handleDialogClose("editSettings")}
              tournamentId={tournamentId}
              sportType={sportType}
              handleEditTournament={handleEditTournament}
            ></EditTournamentSettings>
          </DialogWindow>

          <Button
            onClick={() => {
              handleDialogOpen("addPlayers");
            }}
            sx={{ borderRadius: "0" }}
            variant="contained"
          >
            Pridať hráčov
          </Button>
          <DialogWindow
            handleClose={handleClose}
            open={dialogState.addPlayers}
            handleCloseModal={() => handleDialogClose("addPlayers")}
          >
            <StepperAddPlayer
              tournamentId={tournamentId}
              handleClose={handleClose}
              handleCloseModal={() => handleDialogClose("addPlayers")}
              handleAddPlayers={handleAddPlayers}
              handleImportPlayers={handleImportPlayers}
            ></StepperAddPlayer>
          </DialogWindow>

          <Button
            sx={{ borderRadius: "0" }}
            variant="contained"
            onClick={() => {
              handleCopyPlayers();
              handleClose();
            }}
          >
            Skopírovať hráčov
          </Button>
          <Button
            onClick={() => {
              handleDialogOpen("deleteTournament");
            }}
            color="error"
            sx={{ borderRadius: "0" }}
            variant="contained"
          >
            Vymazať turnaj
          </Button>
          <DialogWindow
            handleClose={handleClose}
            open={dialogState.deleteTournament}
            handleCloseModal={() => handleDialogClose("deleteTournament")}
          >
            <DeleteTournament
              tournamentId={tournamentId}
              tournamentName={tournamentName}
              handleClose={handleClose}
              handleCloseModal={() => handleDialogClose("deleteTournament")}
              handleDeleteTournament={handleDeleteTournament}
            ></DeleteTournament>
          </DialogWindow>
        </Box>
      </Popover>
    </>
  );
};
