import React from "react";
import { TextField, Grid, Box, IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const SettingsTournament = (props) => {
  const { handleTournamentSettingsChange, newTournament } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          label="Názov turnaja"
          value={newTournament?.tournamentName}
          onChange={(e) =>
            handleTournamentSettingsChange("tournamentName", e.target.value)
          }
        ></TextField>
      </Grid>
      {(newTournament.selectedSport === "badminton" ||
        newTournament.selectedSport === "tenis" ||
        newTournament.selectedSport === "stolny-tenis" ||
        newTournament.selectedSport === "volejbal") && (
        <>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Počet setov v zápase"
              value={newTournament?.maxNumberOfSets}
              onChange={(e) =>
                handleTournamentSettingsChange(
                  "maxNumberOfSets",
                  e.target.value
                )
              }
              InputProps={{
                inputProps: {
                  maxLength: 10, // optional: set a maximum length for the input
                  onInput: props.handleInput,
                },
                endAdornment: (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <IconButton
                      sx={{ padding: 0 }}
                      onClick={() =>
                        newTournament.maxNumberOfSets < 10
                          ? props.incrementValue("maxNumberOfSets")
                          : ""
                      }
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      sx={{ padding: 0 }}
                      onClick={() => props.decrementValue("maxNumberOfSets")}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                ),
              }}
            ></TextField>
          </Grid>
        </>
      )}
      {(newTournament.selectedSport === "badminton" ||
        newTournament.selectedSport === "volejbal") && (
        <>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Počet bodov v sete"
              value={newTournament?.maxNumberOfPoints}
              onChange={(e) =>
                handleTournamentSettingsChange(
                  "maxNumberOfPoints",
                  e.target.value
                )
              }
              InputProps={{
                inputProps: {
                  maxLength: 10, // optional: set a maximum length for the input
                  onInput: props.handleInput,
                },
                endAdornment: (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <IconButton
                      sx={{ padding: 0 }}
                      onClick={() =>
                        newTournament.maxNumberOfPoints < 100
                          ? props.incrementValue("maxNumberOfPoints")
                          : ""
                      }
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      sx={{ padding: 0 }}
                      onClick={() => props.decrementValue("maxNumberOfPoints")}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                ),
              }}
            ></TextField>
          </Grid>
        </>
      )}
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          label="Počet skupín"
          value={newTournament?.numberOfGroups}
          onChange={(e) =>
            handleTournamentSettingsChange("numberOfGroups", e.target.value)
          }
          InputProps={{
            inputProps: {
              maxLength: 10, // optional: set a maximum length for the input
              onInput: props.handleInput,
            },
            endAdornment: (
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <IconButton
                  sx={{ padding: 0 }}
                  onClick={() => props.incrementValue("numberOfGroups")}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  sx={{ padding: 0 }}
                  onClick={() => props.decrementValue("numberOfGroups")}
                >
                  <RemoveIcon />
                </IconButton>
              </Box>
            ),
          }}
        ></TextField>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          label="Počet kôl"
          value={newTournament?.numberOfRounds}
          onChange={(e) =>
            handleTournamentSettingsChange("numberOfRounds", e.target.value)
          }
          InputProps={{
            inputProps: {
              maxLength: 10, // optional: set a maximum length for the input
              onInput: props.handleInput,
            },
            endAdornment: (
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <IconButton
                  sx={{ padding: 0 }}
                  onClick={() => props.incrementValue("numberOfRounds")}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  sx={{ padding: 0 }}
                  onClick={() => props.decrementValue("numberOfRounds")}
                >
                  <RemoveIcon />
                </IconButton>
              </Box>
            ),
          }}
        ></TextField>
      </Grid>
    </Grid>
  );
};
