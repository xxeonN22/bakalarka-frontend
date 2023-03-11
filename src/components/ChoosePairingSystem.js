import React from "react";
import { Grid, Paper, Alert } from "@mui/material";

export const ChoosePairingSystem = (props) => {
  const { message, setMessage, handleTournamentSettingsChange, newTournament } =
    props;

  const pairingSystems = [
    {
      name: "Švajčiarsky systém",
      value: "svajciarsky-system",
    },
    {
      name: "Každý s každým 1x",
      value: "kazdy-s-kazdym",
    },
    {
      name: "Každý s každým 2x",
      value: "kazdy-s-kazdym-2x",
    },
  ];

  const sportNoSwitzerlandSystem = ["futbal", "volejbal"];

  const filteredPairingSystems = sportNoSwitzerlandSystem.includes(
    newTournament.selectedSport
  )
    ? pairingSystems.filter((system) => system.value !== "svajciarsky-system")
    : pairingSystems;

  const md = sportNoSwitzerlandSystem.includes(newTournament.selectedSport)
    ? 6
    : 4;
  const lg = sportNoSwitzerlandSystem.includes(newTournament.selectedSport)
    ? 6
    : 4;
  return (
    <>
      {message.selectPairingMessage && (
        <Alert
          sx={{ marginBlock: "1rem" }}
          severity={"error"}
          onClose={() => {
            setMessage({
              ...message,
              selectPairingMessage: null,
            });
          }}
        >
          {message.selectPairingMessage}
        </Alert>
      )}
      <Grid container spacing={2}>
        {filteredPairingSystems.map((system) => (
          <Grid item xs={6} md={md} lg={lg} key={system.value}>
            <Paper
              sx={{
                paddingBlock: "1rem",
                paddingInline: "1rem",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  newTournament.selectedPairingStyle === system.value
                    ? "#3f51b5"
                    : "inherit",
                transition: "background-color 0.5s ease",
              }}
            >
              <label style={{ textAlign: "center" }} htmlFor={system.value}>
                <input
                  style={{ display: "none" }}
                  checked={newTournament.selectedPairingStyle === system.value}
                  onChange={(e) =>
                    handleTournamentSettingsChange(
                      "selectedPairingStyle",
                      e.target.value
                    )
                  }
                  type="radio"
                  id={system.value}
                  name="radio-buttons-pairing"
                  value={system.value}
                />
                <span
                  style={{
                    color:
                      newTournament.selectedPairingStyle === system.value
                        ? "white"
                        : "black",
                  }}
                >
                  {system.name}
                </span>
              </label>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
