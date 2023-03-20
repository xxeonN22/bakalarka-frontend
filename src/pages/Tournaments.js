import { useState, useEffect } from "react";
import { appTheme } from "../themes/appTheme";
import { useNavigate } from "react-router-dom";
import { ContentLayout } from "../components/ContentLayout";
import { Tournament } from "../components/Tournament";
import { CreateTournament } from "../components/CreateTournament";
import { AutoCompleteSearch } from "../components/AutoCompleteSearch";

import { Grid, Typography, Alert } from "@mui/material";

export const Tournaments = () => {
  const navigate = useNavigate();
  const [tournamentData, setTournamentData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState({
    deleteTournamentMessage: "",
    addPlayersMessage: "",
    edditTournamentMessage: "",
    errorMessage: "",
    createdTournamentMessage: "",
    addPlayerMessage: "",
    copyPlayersMessage: "",
  });

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/tournaments`, {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 401) {
        navigate("/login");
        return;
      }
      const data = await response.json();
      setTournamentData(data);
    })();
  }, [navigate]);

  const filteredData = tournamentData.filter((data) =>
    data.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const createAlert = (messageType, severity, onClose) => {
    const messageText = message[messageType];
    if (messageText && messageText !== "") {
      return (
        <Alert
          sx={{ marginBlock: "1rem" }}
          severity={severity}
          onClose={() => {
            setMessage({
              ...message,
              [messageType]: null,
            });
            onClose && onClose();
          }}
        >
          {messageText}
        </Alert>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <ContentLayout screen={"tournaments"}>
        <Grid
          container
          sx={{
            rowGap: "5rem",
            [appTheme.breakpoints.down("sm")]: {
              rowGap: "2rem",
            },
          }}
        >
          <Grid item xs={12} lg={8}>
            <Typography
              variant="h2"
              fontSize="1.5rem"
              sx={{
                width: "60%",
                [appTheme.breakpoints.down("lg")]: {
                  textAlign: "center",
                  width: "100%",
                },
              }}
            >
              Vytvorte turnaj vo vašom obľubenom športe a nenechajte sa rušiť
              pri jeho{" "}
              <span style={{ borderBottom: "3px solid white" }}>
                organizácii.
              </span>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            sx={{
              display: "flex",
              alignItems: "center",
              [appTheme.breakpoints.up("md")]: {
                justifyContent: "flex-start",
              },
              [appTheme.breakpoints.up("lg")]: {
                justifyContent: "flex-end",
              },
            }}
          >
            <CreateTournament
              setMessage={setMessage}
              message={message}
              setTournamentData={setTournamentData}
            ></CreateTournament>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              [appTheme.breakpoints.up("lg")]: {
                justifyContent: "center",
              },
            }}
          >
            <AutoCompleteSearch
              id="search-tournament"
              filteredData={filteredData}
              searchText={searchText}
              setSearchText={setSearchText}
              placeholder="Vyhľadať turnaj"
              style={{
                width: "50%",
                [appTheme.breakpoints.down("lg")]: {
                  width: "90%",
                },
                [appTheme.breakpoints.down("sm")]: {
                  width: "100%",
                },
              }}
            ></AutoCompleteSearch>
          </Grid>
        </Grid>
        {createAlert("createdTournamentMessage", "success")}
        {createAlert("errorMessage", "error")}
        {createAlert("deleteTournamentMessage", "success")}
        {createAlert("addPlayersMessage", "success")}
        {createAlert("edditTournamentMessage", "success")}
        {createAlert("addPlayerMessage", "success")}
        {createAlert("copyPlayersMessage", "success")}
        <Grid
          container
          sx={{
            marginTop: "5rem",
            [appTheme.breakpoints.down("sm")]: { marginTop: "2rem" },
          }}
          spacing={2}
        >
          {filteredData.map((data) => (
            <Tournament
              key={data.id_tournament}
              tournamentId={data.id_tournament}
              name={data.name}
              sportType={data.sport_type}
              playersNumber={data.players_count}
              setTournamentData={setTournamentData}
              tournamentData={tournamentData}
              setMessage={setMessage}
              message={message}
            />
          ))}
        </Grid>
      </ContentLayout>
    </>
  );
};
