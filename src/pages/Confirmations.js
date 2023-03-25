import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { appTheme } from "../themes/appTheme";
import { api } from "../axios/axios";

import { Paper } from "@mui/material";

import { ContentNotLogged } from "../components/ContentNotLogged";
import { TypographySection } from "../components/Confirmation/TypographySection.js";
import { AlertMessage } from "../components/Alert/AlertMessage.js";
import { Confirmation } from "../components/Confirmation/Confirmation.js";

const paperElementStyle = {
  width: "60%",
  paddingBlock: "1rem",
  paddingInline: "2rem",
  [appTheme.breakpoints.down("md")]: { width: "90%" },
};

export const Confirmations = () => {
  const params = useParams();
  const playerHash = params.hash;
  const [confirmations, setConfirmations] = useState([]);
  const [organizer, setOrganizer] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [confirmationChanges, setConfirmationChanges] = useState([]);

  /* GETTING THE DATA FROM DATABASE - ORGANIZER NAME, TOURNAMENT NAME AND CONFIRMATIONS*/
  useEffect(() => {
    fetchConfirmations(playerHash);
  }, [playerHash]);

  const fetchConfirmations = async (playerHash) => {
    try {
      const response = await api.get(`/confirmations/${playerHash}`);
      setConfirmations(response.data.confirmations);
      setOrganizer(
        `${response.data.tournamentData[0].first_name} ${response.data.tournamentData[0].last_name}`
      );
      setTournamentName(`${response.data.tournamentData[0].name}`);
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  const handleConfirmationChange = async (idConfirmation, idGameDay) => {
    try {
      const response = await api.put(`/confirmations/${playerHash}`, {
        idConfirmation,
        idGameDay,
      });
      setResponseMessage(response.data);
      fetchConfirmations(playerHash);
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  const handleInfoClick = async (idGameDay, event) => {
    try {
      event.stopPropagation();
      const response = await api.get(
        `/confirmations/${playerHash}/${idGameDay}`
      );
      setConfirmationChanges(response.data);
    } catch (error) {
      if (error.response) {
        setResponseMessage("Nastala interná chyba!");
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  return (
    <ContentNotLogged>
      <Paper sx={paperElementStyle}>
        <TypographySection
          organizer={organizer}
          tournamentName={tournamentName}
        ></TypographySection>
        {responseMessage && (
          <AlertMessage
            typeOfResponse={responseMessage.type}
            responseMessage={responseMessage.message}
            setResponseMessage={setResponseMessage}
          ></AlertMessage>
        )}
        <Confirmation
          confirmations={confirmations}
          confirmationChanges={confirmationChanges}
          handleInfoClick={handleInfoClick}
          handleConfirmationChange={handleConfirmationChange}
        ></Confirmation>
      </Paper>
    </ContentNotLogged>
  );
};
