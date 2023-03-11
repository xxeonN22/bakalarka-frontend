import { appTheme } from "../themes/appTheme";
import { useState } from "react";
import { Button, IconButton } from "@mui/material";
import { DialogWindow } from "./DialogWindow";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import { StepperCreateTournament } from "./StepperCreateTournament";

export const CreateTournament = ({ typeOfContent }) => {
  const [dialogState, setDialogState] = useState(false);

  const handleDialogOpen = () => {
    setDialogState(true);
  };

  const handleDialogClose = () => {
    setDialogState(false);
    window.history.back();
  };
  return (
    <>
      <Button
        startIcon={<AddIcon></AddIcon>}
        onClick={() => {
          handleDialogOpen();
          window.history.pushState({}, "", "/createtournament");
        }}
        sx={{
          paddingBlock: "1rem",
          [appTheme.breakpoints.down("lg")]: {
            width: "90%",
          },
        }}
        variant="contained"
      >
        Vytvoriť turnaj
      </Button>

      <DialogWindow open={dialogState} handleCloseModal={handleDialogClose}>
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleDialogClose}
        >
          <CloseIcon></CloseIcon>
        </IconButton>
        <StepperCreateTournament
          handleCloseModal={handleDialogClose}
        ></StepperCreateTournament>
      </DialogWindow>
    </>
  );
};
