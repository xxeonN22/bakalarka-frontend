import React from "react";
import { TextField, Grid, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

export const EditTournamentSettings = ({ tournamentId }) => {
  /* JUST FOR TEST PURPOSES */
  const fakeData = {
    id: tournamentId,
    name: "UBL - Liga",
    max_sets: 2,
    max_points: 22,
    numberOfRounds: 3,
    numberOfGroups: 3,
    sport_type: "badminton",
    pairing_system: "svajciarsky system",
    match_type: "jednotlivci",
  };

  const [tournamentSettings, setTournamentSettings] = useState(fakeData);

  const handleTournamentSettingsChange = (name, value) => {
    setTournamentSettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(tournamentSettings);

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontSize: "1.25rem",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        {`Upraviť údaje pre turnaj ${fakeData.name}`}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Zadajte názov turnaja"
            value={tournamentSettings.name}
            InputLabelProps={{ shrink: tournamentSettings.name ? true : false }}
            onChange={(e) =>
              handleTournamentSettingsChange("name", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Zadajte maximálny počet setov"
            value={tournamentSettings.max_sets}
            InputLabelProps={{
              shrink: tournamentSettings.max_sets ? true : false,
            }}
            onChange={(e) =>
              handleTournamentSettingsChange("max_sets", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Zadajte maximálny počet bodov v sete"
            value={tournamentSettings.max_points}
            InputLabelProps={{
              shrink: tournamentSettings.max_points ? true : false,
            }}
            onChange={(e) =>
              handleTournamentSettingsChange("max_points", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Zadajte počet skupín"
            value={tournamentSettings.numberOfGroups}
            InputLabelProps={{
              shrink: tournamentSettings.numberOfGroups ? true : false,
            }}
            onChange={(e) =>
              handleTournamentSettingsChange("numberOfGroups", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Zadajte počet kôl"
            value={tournamentSettings.numberOfRounds}
            InputLabelProps={{
              shrink: tournamentSettings.numberOfRounds ? true : false,
            }}
            onChange={(e) =>
              handleTournamentSettingsChange("numberOfRounds", e.target.value)
            }
          />
        </Grid>
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Button
          startIcon={<EditIcon></EditIcon>}
          variant="contained"
        >{`Potvrdiť úpravu údajov`}</Button>
      </Box>
    </>
  );
};
