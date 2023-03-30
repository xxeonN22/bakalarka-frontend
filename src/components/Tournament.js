import { useNavigate } from "react-router-dom";
import { api } from "../axios/axios";
import { Paper, Button, Typography, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TournamentPopover } from "./TournamentPopover";
import { appTheme } from "../themes/appTheme";

export const Tournament = ({
  tournamentId,
  name,
  sportType,
  playersNumber,
  setTournamentData,
  tournamentData,
  setResponseMessage,
}) => {
  const navigate = useNavigate();

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

  const handleDeleteTournament = async () => {
    try {
      const response = await api.delete(
        `/tournaments/deletetournament/${tournamentId}`
      );
      setResponseMessage(response.data);
      const updatedTournaments = tournamentData.filter(
        (tournament) => tournament.id_tournament !== tournamentId
      );
      setTournamentData(updatedTournaments);
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  const handleEditTournament = async (newSettings) => {
    if (newSettings.tournamentName === "") {
    }

    if (
      newSettings.maxSets === 0 ||
      newSettings.maxPoints === 0 ||
      newSettings.numberOfCourts === 0 ||
      newSettings.numberOfGroups === 0 ||
      newSettings.numberOfRounds === 0
    ) {
      return;
    }

    try {
      const response = await api.put(
        `/tournaments/eddittournament/${tournamentId}`,
        newSettings
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

  const handleImportPlayers = async (selectedStyle, selectedFile) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await api.put(
        `/tournaments/importplayers/${tournamentId}`,
        formData
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

  const handleAddPlayers = async (
    selectedStyle,
    newPlayerData,
    newPlayersData
  ) => {
    try {
      const response = await api.put(
        `/tournaments/addplayers/${tournamentId}`,
        { selectedStyle, newPlayerData, newPlayersData }
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

  const handleCopyPlayers = async () => {
    try {
      const response = await api.post(
        `/tournaments/copyplayers/${tournamentId}`
      );
      let stringToSave = "";

      for (let i = 0; i < response.data.getPlayers.length; i++) {
        let player = response.data.getPlayers[i];
        let playerString = `${player.first_name}, ${player.last_name}, ${player.email}, ${player.group_name}, ${player.elo}; `;
        stringToSave += playerString;
      }
      navigator.clipboard.writeText(stringToSave);
      setResponseMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data.message);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          paddingBlock: "2rem",
          backgroundColor: appTheme.palette.primary.main,
          color: "white",
          position: "relative",
        }}
      >
        <Typography variant="h2" sx={{ fontSize: "1.25rem" }}>
          {name}
        </Typography>
        <Typography variant="subtitle1" sx={{ marginBlock: "1rem" }}>
          Počet hráčov: {playersNumber}
        </Typography>
        <Button
          color="sunglow"
          sx={{ paddingBlock: "0.5rem" }}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate(`/tournaments/${tournamentId}`)}
        >
          Vstúpiť do turnaja
        </Button>
        <TournamentPopover
          tournamentId={tournamentId}
          sportType={sportType}
          tournamentName={name}
          handleDeleteTournament={handleDeleteTournament}
          handleEditTournament={handleEditTournament}
          handleAddPlayers={handleAddPlayers}
          handleCopyPlayers={handleCopyPlayers}
          handleImportPlayers={handleImportPlayers}
        ></TournamentPopover>
      </Paper>
    </Grid>
  );
};
