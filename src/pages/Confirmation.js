import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ContentNotLogged } from "../components/ContentNotLogged";
import { appTheme } from "../themes/appTheme";

import {
  Paper,
  Box,
  Typography,
  Grid,
  Button,
  Alert,
  Popover,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const Confirmation = () => {
  const params = useParams();
  const playerHash = params.hash;

  const [confirmations, setConfirmations] = useState([]);
  const [organizer, setOrganizer] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [confirmationChanges, setConfirmationChanges] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

  const fetchConfirmations = async (playerHash) => {
    try {
      fetch(`http://localhost:3000/${playerHash}/confirmations`)
        .then((response) => response.json())
        .then((data) => {
          setConfirmations(data.confirmations);
          setOrganizer(
            `${data.tournamentData[0].first_name} ${data.tournamentData[0].last_name}`
          );
          setTournamentName(`${data.tournamentData[0].name}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConfirmations(playerHash);
  }, [playerHash]);

  const transformDate = (dateToTransform) => {
    const date = dateToTransform;
    const dateStr = date.substring(0, 10);
    const [year, month, day] = dateStr.split("-");
    const newDate = `${day}.${month}.${year}`;
    return newDate;
  };

  const getTodaysDate = () => {
    const todaysDate = new Date();
    const day = todaysDate.getDate();
    const month = todaysDate.getMonth() + 1;
    const year = todaysDate.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  };

  const handleConfirmationChange = async (idConfirmation, idGameDay) => {
    const response = await fetch(
      `http://localhost:3000/${playerHash}/confirmations`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idConfirmation, idGameDay }),
      }
    );
    const data = await response.json();
    setResponseMessage(data.message);
    fetchConfirmations(playerHash);
  };

  const handleInfoClick = async (idGameDay, event) => {
    event.stopPropagation();
    const response = await fetch(
      `http://localhost:3000/${playerHash}/confirmations/${idGameDay}`
    );
    const data = await response.json();
    setConfirmationChanges(data);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  console.log(confirmationChanges);

  return (
    <ContentNotLogged>
      <Paper
        sx={{
          width: "60%",
          paddingBlock: "1rem",
          paddingInline: "2rem",
          [appTheme.breakpoints.down("md")]: { width: "90%" },
        }}
      >
        <Grid container rowSpacing={3} sx={{ textAlign: "center" }}>
          <Grid item xs={12}>
            <Typography>Zdravíme Vás, dnes je {getTodaysDate()}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {organizer} Váš pozýva, aby ste sa zúčastnili turnaja{" "}
              {tournamentName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Prosím, potvrďte svoju účasť kliknutím na príslušný hrací deň!
            </Typography>
          </Grid>
        </Grid>
        {responseMessage && (
          <Alert
            sx={{ marginBlock: "1rem" }}
            severity={"success"}
            onClose={() => {
              setResponseMessage(null);
            }}
          >
            {responseMessage}
          </Alert>
        )}
        <Grid
          container
          spacing={2}
          sx={{ marginTop: "2rem", justifyContent: "center" }}
        >
          {confirmations.map((confirmation) => {
            return (
              <Grid
                key={confirmation.id_confirmation}
                item
                xs={12}
                sm={6}
                xl={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() =>
                    handleConfirmationChange(
                      confirmation.id_confirmation,
                      confirmation.id_game_day
                    )
                  }
                  sx={{ width: "100%", padding: "0px" }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#1f2736",
                      width: "100%",
                      color: "white",
                      borderRadius: "4px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      paddingBlock: "1rem",
                    }}
                  >
                    <Typography
                      sx={{ textTransform: "none", marginTop: "1rem" }}
                    >
                      {" "}
                      Dátum konania: {transformDate(confirmation.date)}
                    </Typography>
                    <Typography
                      sx={{ textTransform: "none", marginBlock: "0.5rem" }}
                    >
                      {" "}
                      Začiatok konania: {confirmation.time.substring(0, 5)}
                    </Typography>
                    <Box>
                      {confirmation.status === "nie" ? (
                        <CloseIcon sx={{ color: "red", fontSize: "3rem" }} />
                      ) : (
                        <CheckIcon sx={{ color: "green", fontSize: "3rem" }} />
                      )}
                    </Box>
                    <InfoOutlinedIcon
                      onClick={(e) => {
                        handleInfoClick(confirmation.id_game_day, e);
                        handleClick(e);
                      }}
                      sx={{ position: "absolute", top: 5, right: 5 }}
                    ></InfoOutlinedIcon>
                    {confirmationChanges.length > 0 && (
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={(e) => handleClose(e)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "center",
                          horizontal: "center",
                        }}
                      >
                        <Paper sx={{ padding: "1rem" }}>
                          <Typography>Posledné zmeny</Typography>
                          {confirmationChanges.map((change) => {
                            const date = transformDate(
                              change.date_time.substring(0, 10)
                            );
                            const time = change.date_time.substring(11, 16);
                            return (
                              <Box
                                sx={{ textAlign: "center" }}
                                key={change.date_time}
                              >
                                {date} {time}
                              </Box>
                            );
                          })}
                        </Paper>
                      </Popover>
                    )}
                  </Box>
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </ContentNotLogged>
  );
};