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
    console.log(data);

    const fetchTournaments = await fetch("http://localhost:3000");
    const fetchedTournaments = await fetchTournaments.json();
    setTournamentData(fetchedTournaments);
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
        ></TournamentPopover>
      </Paper>
    </Grid>
  );
};
