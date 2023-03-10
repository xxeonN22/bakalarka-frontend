import { Paper, Button, Typography, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TournamentPopover } from "./TournamentPopover";

export const Tournament = ({ tournamentId, name, playersNumber }) => {
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
        <TournamentPopover tournamentId={tournamentId}></TournamentPopover>
      </Paper>
    </Grid>
  );
};
