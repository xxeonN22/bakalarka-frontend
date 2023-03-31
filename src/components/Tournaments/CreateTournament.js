import { useState } from "react";
import { api } from "../../axios/axios";

import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { StepperCreateTournament } from "../StepperCreateTournament";
import { DialogWindow } from "../DialogWindow";
import { CreateTournamentButton } from "./CreateTournamentButton";

export const CreateTournament = (props) => {
  const { setResponseMessage, responseMessage, setTournamentData } = props;
  const [dialogState, setDialogState] = useState(false);

  const fetchTournaments = async () => {
    try {
      const response = await api.get(`/tournaments`);
      setTournamentData(response.data);
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data);
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
      setResponseMessage(response.data);
      fetchTournaments();
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data);
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
      <CreateTournamentButton
        handleDialogOpen={handleDialogOpen}
      ></CreateTournamentButton>

      <DialogWindow open={dialogState} handleCloseModal={handleDialogClose}>
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleDialogClose}
        >
          <CloseIcon color="primary"></CloseIcon>
        </IconButton>
        <StepperCreateTournament
          setResponseMessage={setResponseMessage}
          responseMessage={responseMessage}
          handleCloseModal={handleDialogClose}
          handleCreateTournamet={handleCreateTournamet}
        ></StepperCreateTournament>
      </DialogWindow>
    </>
  );
};
