import { useState } from "react";
import { DialogWindow } from "./DialogWindow";

import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const RoundAction = ({ buttonText, children }) => {
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
        {buttonText}
      </Button>
      <DialogWindow open={dialogState} handleCloseModal={handleDialogClose}>
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleDialogClose}
        >
          <CloseIcon></CloseIcon>
        </IconButton>
        {children}
      </DialogWindow>
    </>
  );
};
