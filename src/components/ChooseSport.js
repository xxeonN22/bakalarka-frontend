import React from "react";
import { Grid, Paper, Alert } from "@mui/material";

import BadmintonSportIcon from "../icons/BadmintonSportIcon";
import TenisSportIcon from "../icons/TenisSportIcon";
import TableTenisSportIcon from "../icons/TableTenisSportIcon";
import VolleyballSportIcon from "../icons/VolleyballSportIcon";
import FootballSportIcon from "../icons/FootballSportIcon";

export const ChooseSport = (props) => {
  const {
    stepperMessage,
    setStepperMessage,
    newTournament,
    handleTournamentSettingsChange,
  } = props;
  const sports = [
    {
      name: "badminton",
      icon: <BadmintonSportIcon width={40} height={40} fill={"black"} />,
    },
    {
      name: "tenis",
      icon: <TenisSportIcon width={40} height={40} fill={"black"} />,
    },
    {
      name: "stolny-tenis",
      icon: <TableTenisSportIcon width={40} height={40} fill={"black"} />,
    },
    {
      name: "volejbal",
      icon: <VolleyballSportIcon width={40} height={40} fill={"black"} />,
    },
    {
      name: "futbal",
      icon: <FootballSportIcon width={40} height={40} fill={"black"} />,
    },
  ];

  return (
    <>
      {stepperMessage.selectSportMessage && (
        <Alert
          sx={{ marginBlock: "1rem" }}
          severity={"error"}
          onClose={() => {
            setStepperMessage({
              ...stepperMessage,
              selectSportMessage: null,
            });
          }}
        >
          {stepperMessage.selectSportMessage}
        </Alert>
      )}
      <Grid container spacing={2}>
        {sports.map((sport) => (
          <Grid item xs={6} md={4} key={sport.name}>
            <Paper
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  newTournament.selectedSport === sport.name
                    ? "#3f51b5"
                    : "inherit",
                transition: "background-color 0.5s ease",
              }}
            >
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBlock: "1rem",
                  paddingInline: "1rem",
                }}
                htmlFor={sport.name}
              >
                <input
                  style={{ display: "none" }}
                  checked={newTournament.selectedSport === sport.name}
                  onChange={(event) =>
                    handleTournamentSettingsChange(
                      "selectedSport",
                      event.target.value
                    )
                  }
                  type="radio"
                  id={sport.name}
                  name="radio-buttons-sports"
                  value={sport.name}
                />
                {React.cloneElement(sport.icon, {
                  width: 40,
                  height: 40,
                  fill:
                    newTournament.selectedSport === sport.name
                      ? "white"
                      : "black",
                })}
                <span
                  style={{
                    marginTop: "1rem",
                    color:
                      newTournament.selectedSport === sport.name
                        ? "white"
                        : "black",
                  }}
                >
                  {sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}
                </span>
              </label>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
