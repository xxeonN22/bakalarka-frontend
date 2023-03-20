import { useState } from "react";
import { appTheme } from "../themes/appTheme";
import { api } from "../axios/axios";

import { StepperCreateTournament } from "./StepperCreateTournament";

import { Button, IconButton } from "@mui/material";
import { DialogWindow } from "./DialogWindow";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export const CreateTournament = (props) => {
  const { setMessage, message, setTournamentData } = props;
  const [dialogState, setDialogState] = useState(false);

  const fetchTournaments = async () => {
    try {
      const response = await api.get(`/tournaments`);
      setTournamentData(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  const handleCreateTournamet = async (newTournament) => {
    try {
      const response = await api.put(
        `/tournaments/createtournament`,
        newTournament
      );
      setMessage({
        ...message,
        createdTournamentMessage: response.data.message,
      });
      fetchTournaments();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  const handleDialogOpen = () => {
    setDialogState(true);
  };

  const handleDialogClose = () => {
    setDialogState(false);
  };
  return (
    <>
      <Button
        startIcon={<AddIcon></AddIcon>}
        onClick={() => {
          handleDialogOpen();
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
