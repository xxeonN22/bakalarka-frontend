import { appTheme } from "../themes/appTheme";
import { useState } from "react";
import { Button } from "@mui/material";
import { DialogWindow } from "./DialogWindow";
import { StepperClean } from "./StepperClean";
import AddIcon from "@mui/icons-material/Add";

import { StepperCreateTournament } from "./StepperCreateTournament";

export const CreateTournament = ({ typeOfContent }) => {
  const [dialogState, setDialogState] = useState(false);

  const createTournamentSteps = [
    "Vyberte šport",
    "Vyberte párovací systém",
    "Zadajte údaje o turnaji",
    "Zvoľte dátum konania turnaja",
  ];

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
        <StepperCreateTournament
          data={createTournamentSteps}
          numberOfSteps={4}
          handleCloseModal={handleDialogClose}
          typeOfContent={"createTournament"}
        ></StepperCreateTournament>
      </DialogWindow>
    </>
  );
};
