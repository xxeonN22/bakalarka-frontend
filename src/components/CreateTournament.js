import { useState } from "react";
import { appTheme } from "../themes/appTheme";

import { StepperCreateTournament } from "./StepperCreateTournament";

import { Button, IconButton } from "@mui/material";
import { DialogWindow } from "./DialogWindow";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export const CreateTournament = (props) => {
  const { setMessage, message, setTournamentData } = props;
  const [dialogState, setDialogState] = useState(false);

  const handleCreateTournamet = async (newTournament) => {
    const response = await fetch(
      `http://localhost:3000/tournaments/createtournament`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTournament,
        }),
        credentials: "include",
      }
    );

    const data = await response.json();

    setMessage({
      ...message,
      createdTournamentMessage: data.message,
    });

    const fetchMatches = await fetch("http://localhost:3000/tournaments", {
      method: "GET",
      credentials: "include",
    });
    const fetchedMatches = await fetchMatches.json();
    setTournamentData(fetchedMatches);
  };

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
          window.history.pushState({}, "", "/tournaments/createtournament");
        }}
        sx={{
          paddingBlock: "1rem",
          [appTheme.breakpoints.down("lg")]: {
            width: "90%",
          },
          [appTheme.breakpoints.down("sm")]: {
            width: "100%",
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
          setMessage={setMessage}
          message={message}
          handleCloseModal={handleDialogClose}
          handleCreateTournamet={handleCreateTournamet}
        ></StepperCreateTournament>
      </DialogWindow>
    </>
  );
};
