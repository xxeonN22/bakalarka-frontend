import React, { useEffect, useState } from "react";
import {
  Breadcrumbs,
  Typography,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Box,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import { appTheme } from "../themes/appTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { ContentLayout } from "../components/ContentLayout";
import { TextFieldIncrement } from "../components/TextFieldIncrement";
import { SelectBox } from "../components/SelectBox";

export const PlayerProfile = () => {
  const navigate = useNavigate();
  const { tournamentId, playerId } = useParams();
  const isTabletSize = useMediaQuery(appTheme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = useState(true);

  const [playerData, setPlayerData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    elo: 10,
  });

  const [matches, setMatches] = useState([]);
  const [playerAttendance, setPlayerAttendance] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [selectedRound, setSelectedRound] = useState("");

  const handlePlayerSettingsChange = (name, value) => {
    setPlayerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/tournaments/${tournamentId}/player/${playerId}`
      );
      const data = await response.json();
      console.log(data);
      setPlayerData({
        first_name: data.playerData[0].first_name,
        last_name: data.playerData[0].last_name,
        email: data.playerData[0].email,
        elo: data.playerData[0].elo,
      });
      setPlayerAttendance(data.playerAttendance);
      setRounds(data.gameRounds);
      setSelectedRound(data.gameRounds[0].round_number);
      setIsLoading(false);
    })();
  }, [tournamentId, playerId]);

  useEffect(() => {
    (async () => {
      if (selectedRound) {
        const response = await fetch(
          `http://localhost:3000/tournaments/${tournamentId}/player/${playerId}/matches/${selectedRound}`
        );
        const data = await response.json();
        console.log(data);
        setMatches(data);
      }
    })();
  }, [tournamentId, playerId, selectedRound]);

  const convertDate = (dateToConvert) => {
    const dateObject = new Date(dateToConvert);
    const date = dateObject.toLocaleDateString("sk-SK");
    return date;
  };

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  const handleShowScore = async (matchId) => {
    const respone = await fetch(
      `http://localhost:3000/tournaments/${tournamentId}/player/${playerId}/match/${matchId}`
    );
    const data = await respone.json();
    console.log(data);
  };

  return (
    <>
      <ContentLayout>
        <Breadcrumbs aria-label="breadcrumb">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              onClick={() => navigate(`/tournaments/${tournamentId}`)}
            >
              Hráči
            </Link>
            <Typography color="text.primary">
              {playerData.first_name} {playerData.last_name}
            </Typography>
          </Breadcrumbs>
        </Breadcrumbs>

        <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
          <Grid item xs={12} md={6}>
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="player-credentials"
                id="player-credentials-header"
                sx={{ textAlign: "center" }}
              >
                <Typography>Upraviť údaje hráča</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {!isLoading && (
                  <>
                    {" "}
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Meno"
                          value={playerData.first_name}
                          onChange={(e) =>
                            handlePlayerSettingsChange(
                              "first_name",
                              e.target.value
                            )
                          }
                        ></TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Priezvisko"
                          value={playerData.last_name}
                          onChange={(e) =>
                            handlePlayerSettingsChange(
                              "last_name",
                              e.target.value
                            )
                          }
                        ></TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Email"
                          value={playerData.email}
                          onChange={(e) =>
                            handlePlayerSettingsChange("email", e.target.value)
                          }
                        ></TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldIncrement
                          isRequired={true}
                          value={playerData.elo}
                          functionName={(value) =>
                            handlePlayerSettingsChange("elo", value)
                          }
                          label={`ELO`}
                          id={`player-elo`}
                          min={1000}
                          max={5000}
                        ></TextFieldIncrement>
                      </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        sx={{ marginTop: "1rem" }}
                        startIcon={<EditOutlinedIcon />}
                      >
                        Potvrdiť úpravu údajov
                      </Button>
                    </Box>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12} md={6}>
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="player-stats"
                id="player-stats-header"
                sx={{ textAlign: "center" }}
              >
                <Typography>Účasti hráča</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {!isLoading &&
                    playerAttendance.map((attendance) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          xl={4}
                          key={attendance.id_confirmation}
                        >
                          <Paper
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              paddingBlock: "0.4rem",
                            }}
                          >
                            <Typography>
                              {" "}
                              Dátum: {convertDate(attendance.date)}
                            </Typography>
                            <Typography sx={{ marginBlock: "0.3rem" }}>
                              {" "}
                              Čas: {attendance.time.substring(0, 5)}
                            </Typography>
                            <Typography>Účasť: {attendance.status}</Typography>
                          </Paper>
                        </Grid>
                      );
                    })}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        <Grid
          container
          gap={2}
          sx={{
            marginBlock: "4rem",
            alignItems: "center",
            [appTheme.breakpoints.down("lg")]: {
              justifyContent: "space-between",
            },
            [appTheme.breakpoints.down("md")]: { justifyContent: "center" },
          }}
        >
          <Grid item xs={12} md={5}>
            <Typography
              variant="h2"
              fontSize="1.4rem"
              sx={{
                letterSpacing: "0.1rem",
                [appTheme.breakpoints.down("md")]: { textAlign: "center" },
              }}
            >
              História zápasov hráča{" "}
              <span style={{ fontWeight: "500" }}>
                {playerData.first_name} {playerData.last_name}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={6} md={5} lg={2.5}>
            <SelectBox
              id="select-round"
              labelContent="Vyberte kolo"
              labelId="select-round-label"
              label="Vyberte kolo"
              onChangeFunction={handleRoundChange}
              selectValue={selectedRound}
              itemArray={rounds}
            ></SelectBox>
          </Grid>
        </Grid>
        {matches &&
          matches.map((match) => {
            return (
              <Box
                key={match.matchId}
                sx={{
                  marginBlock: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#303a53",
                  padding: "1rem",
                  color: "white",
                  position: "relative",
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    flex: 1,
                    [appTheme.breakpoints.down("md")]: {
                      position: "absolute",
                      top: 0,
                      left: 0,
                    },
                  }}
                >
                  {match.courtName}
                </Typography>
                <Typography
                  textAlign="center"
                  sx={{ wordBreak: "break-all", flex: 2 }}
                >
                  {match.firstPlayerData[0].first_name}{" "}
                  {match.firstPlayerData[0].last_name}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleShowScore(match.matchId)}
                  sx={{ flex: 1 }}
                >
                  {isTabletSize ? "Skóre" : "Zobraziť skóre"}
                </Button>
                <Typography
                  textAlign="center"
                  sx={{ wordBreak: "break-all", flex: 2 }}
                >
                  {match.secondPlayerData[0].first_name}{" "}
                  {match.secondPlayerData[0].last_name}
                </Typography>
              </Box>
            );
          })}
      </ContentLayout>
    </>
  );
};
