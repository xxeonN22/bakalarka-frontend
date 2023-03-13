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
  const handleDeleteTournament = async () => {
    const response = await fetch(
      `http://localhost:3000/deletetournament/${tournamentId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    setMessage({
      ...message,
      deleteTournamentMessage: data.message,
    });

    const updatedTournaments = tournamentData.filter(
      (tournament) => tournament.id_tournament !== tournamentId
    );
    setTournamentData(updatedTournaments);
  };

  const handleEditTournament = async (newSettings) => {
    console.log(newSettings);
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

    const response = await fetch(
      `http://localhost:3000/eddittournament/${tournamentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newSettings,
        }),
      }
    );

    const data = await response.json();
    setMessage({
      ...message,
      edditTournamentMessage: data.message,
    });

    const fetchTournaments = await fetch("http://localhost:3000");
    const fetchedTournaments = await fetchTournaments.json();
    setTournamentData(fetchedTournaments);
  };

  const handleAddPlayers = async (
    selectedStyle,
    newPlayerData,
    newPlayersData,
    selectedFile
  ) => {
    const response = await fetch(
      `http://localhost:3000/addplayers/${tournamentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedStyle,
          newPlayerData,
          newPlayersData,
          selectedFile,
        }),
      }
    );
    const data = await response.json();

    console.log(data.message);

    setMessage({
      ...message,
      addPlayerMessage: `${data.message}`,
    });

    const fetchTournaments = await fetch("http://localhost:3000");
    const fetchedTournaments = await fetchTournaments.json();
    setTournamentData(fetchedTournaments);
  };

  const handleCopyPlayers = async () => {
    const response = await fetch("http://localhost:3000/copyplayers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tournamentId,
      }),
    });
    const data = await response.json();

    let stringToSave = "";

    for (let i = 0; i < data.length; i++) {
      let player = data[i];
      let playerString = `${player.first_name}, ${player.last_name}, ${player.email}, ${player.elo}; `;
      stringToSave += playerString;
    }

    navigator.clipboard.writeText(stringToSave);

    setMessage({
      ...message,
      copyPlayersMessage: `Hráči boli úspešne skopírovaní`,
    });
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
        ></TournamentPopover>
      </Paper>
    </Grid>
  );
};
