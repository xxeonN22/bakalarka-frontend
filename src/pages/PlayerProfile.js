import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { appTheme } from "../themes/appTheme";
import { Formik, Form } from "formik";
import * as yup from "yup";

import { ContentLayout } from "../components/ContentLayout";
import { SelectBox } from "../components/SelectBox";

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
import useMediaQuery from "@mui/material/useMediaQuery";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const validationSchema = yup.object({
  firstName: yup.string().required("Meno musí byť zadané"),
  lastName: yup.string().required("Priezvisko musí byť zadané"),
  email: yup
    .string()
    .required("Email musí byť zadaný")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Neplatný tvar emailovej adresy"
    ),
  elo: yup
    .number()
    .min(500, "Minimálna hodnota musí byť aspoň 500")
    .max(5000, "Maximálna povolená hodnota je 5000")
    .typeError("Hodnota ELO musí byť číselná hodnota")
    .required("Hodnota ELO musí byť zadaná"),
});

export const PlayerProfile = () => {
  const [rounds, setRounds] = useState([]);
  const [selectedRound, setSelectedRound] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [playerAttendance, setPlayerAttendance] = useState([]);
  const [playerData, setPlayerData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    elo: 10,
  });

  const { tournamentId, playerId } = useParams();
  const navigate = useNavigate();
  const isTabletSize = useMediaQuery(appTheme.breakpoints.down("md"));

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/player/${tournamentId}/${playerId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 401) {
        navigate("/login");
        return;
      }
      const data = await response.json();
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
          `http://localhost:3000/player/${tournamentId}/${playerId}/matches/${selectedRound}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 401) {
          navigate("/login");
          return;
        }
        const data = await response.json();
        setMatches(data);
      }
    })();
  }, [tournamentId, playerId, selectedRound]);

  const handleShowScore = async (matchId) => {
    const response = await fetch(
      `http://localhost:3000/player/${tournamentId}/${playerId}/match/${matchId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.status === 401) {
      navigate("/login");
      return;
    }
    const data = await response.json();
    console.log(data);
  };

  const handleEditScore = async (values) => {
    console.log(values);
  };

  const convertDate = (dateToConvert) => {
    const dateObject = new Date(dateToConvert);
    const date = dateObject.toLocaleDateString("sk-SK");
    return date;
  };

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
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
                    <Formik
                      initialValues={{
                        firstName: playerData.first_name,
                        lastName: playerData.last_name,
                        email: playerData.email,
                        elo: playerData.elo,
                      }}
                      onSubmit={(values) => handleEditScore(values)}
                      validationSchema={validationSchema}
                    >
                      {({
                        values,
                        handleChange,
                        errors,
                        touched,
                        handleBlur,
                      }) => (
                        <Form>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                id="firstName"
                                label="Meno"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  touched.firstName && Boolean(errors.firstName)
                                }
                                helperText={
                                  touched.firstName && errors.firstName
                                }
                              ></TextField>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Priezvisko"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  touched.lastName && Boolean(errors.lastName)
                                }
                                helperText={touched.lastName && errors.lastName}
                              ></TextField>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                              ></TextField>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                id="elo"
                                label="Elo"
                                name="elo"
                                value={values.elo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.elo && Boolean(errors.elo)}
                                helperText={touched.elo && errors.elo}
                              ></TextField>
                            </Grid>
                          </Grid>
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Button
                              variant="contained"
                              sx={{ marginTop: "1rem" }}
                              startIcon={<EditOutlinedIcon />}
                              type="submit"
                            >
                              Potvrdiť úpravu údajov
                            </Button>
                          </Box>
                        </Form>
                      )}
                    </Formik>
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
