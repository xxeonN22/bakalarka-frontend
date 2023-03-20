import { useNavigate } from "react-router-dom";
import { api } from "../axios/axios";
import { Paper, Button, Typography, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TournamentPopover } from "./TournamentPopover";

export const Tournament = ({
  tournamentId,
  name,
  sportType,
  playersNumber,
  setTournamentData,
  tournamentData,
  setMessage,
  message,
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
      setMessage({
        ...message,
        deleteTournamentMessage: response.data.message,
      });

      const updatedTournaments = tournamentData.filter(
        (tournament) => tournament.id_tournament !== tournamentId
      );
      setTournamentData(updatedTournaments);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  const handleEditTournament = async (newSettings) => {
    if (newSettings.tournamentName === "") {
      setMessage({
        ...message,
        errorMessage:
          "Názov turnaja musí byť vyplnený! Nastavenia neboli zmenené!",
      });
      return;
    }

    if (
      newSettings.maxSets === 0 ||
      newSettings.maxPoints === 0 ||
      newSettings.numberOfCourts === 0 ||
      newSettings.numberOfGroups === 0 ||
      newSettings.numberOfRounds === 0
    ) {
      setMessage({
        ...message,
        errorMessage:
          "Každá hodnota musí byť väčšia alebo rovná 1! Nastavenia neboli zmenené!",
      });
      return;
    }

    try {
      const response = await api.put(
        `/tournaments/eddittournament/${tournamentId}`,
        newSettings
      );
      setMessage({
        ...message,
        edditTournamentMessage: response.data.message,
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

  const handleImportPlayers = async (selectedStyle, selectedFile) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await api.put(
        `/tournaments/importplayers/${tournamentId}`,
        formData
      );
      setMessage({
        ...message,
        addPlayerMessage: `${response.data.message}`,
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
      setMessage({
        ...message,
        addPlayerMessage: `${response.data.message}`,
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

  const handleCopyPlayers = async () => {
    try {
      const response = await api.post(
        `/tournaments/copyplayers/${tournamentId}`
      );
      let stringToSave = "";

      for (let i = 0; i < response.data.length; i++) {
        let player = response.data[i];
        let playerString = `${player.first_name}, ${player.last_name}, ${player.email}, ${player.group_name}, ${player.elo}; `;
        stringToSave += playerString;
      }
      navigator.clipboard.writeText(stringToSave);
      setMessage({
        ...message,
        copyPlayersMessage: `Hráči boli úspešne skopírovaní`,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
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
          backgroundColor: "#303A53",
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
