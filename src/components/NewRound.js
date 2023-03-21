import { useState } from "react";
import { DialogWindow } from "./DialogWindow";

import { Button, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const NewRound = (props) => {
  const [dialogState, setDialogState] = useState(false);

  const handleDialogOpen = () => {
    setDialogState(true);
  };

  const handleDialogClose = () => {
    setDialogState(false);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ width: "100%", padding: "1rem" }}
        onClick={() => {
          handleDialogOpen();
        }}
      >
        Vytvoriť nové kolo
      </Button>
      <DialogWindow open={dialogState} handleCloseModal={handleDialogClose}>
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleDialogClose}
        >
          <CloseIcon></CloseIcon>
        </IconButton>
        <Typography sx={{ marginBottom: "2rem", marginTop: "1rem" }}>
          Pridajte nové kolo klinutím na tlačidlo nižšie
        </Typography>
      </DialogWindow>
    </>
  );
};
