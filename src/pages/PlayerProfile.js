import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { appTheme } from "../themes/appTheme";
import { api } from "../axios/axios";

import { Grid } from "@mui/material";

import { ContentLayout } from "../components/ContentLayout";
import { SelectBox } from "../components/SelectBox";
import { PlayerProfileCrumbs } from "../components/BreadCrumbs/PlayerProfileCrumbs.js";
import { PlayerProfileData } from "../components/Accordions/PlayerProfileData.js";
import { PlayerProfileAttendance } from "../components/Accordions/PlayerProfileAttendance.js";
import { PlayerProfileTypography } from "../components/Typography/PlayerProfileTypography.js";
import { PlayerProfileMatchBox } from "../components/PlayerProfileMatchBox.js";
import { AlertMessage } from "../components/AlertMessage";

const gridContainerStyle = {
  marginBlock: "4rem",
  alignItems: "center",
  [appTheme.breakpoints.down("lg")]: {
    justifyContent: "space-between",
  },
  [appTheme.breakpoints.down("md")]: { justifyContent: "center" },
};

export const PlayerProfile = () => {
  const [responseMessage, setResponseMessage] = useState("");
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

  const fetchData = async () => {
    const response = await api.get(`/player/${tournamentId}/${playerId}`);
    setPlayerData({
      first_name: response.data.playerData[0].first_name,
      last_name: response.data.playerData[0].last_name,
      email: response.data.playerData[0].email,
      elo: response.data.playerData[0].elo,
    });
    setPlayerAttendance(response.data.playerAttendance);
    setRounds(response.data.gameRounds);
    setSelectedRound(response.data.gameRounds[0].round_number);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        fetchData();
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/login");
          return;
        }
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    })();
  }, [tournamentId, playerId]);

  const fetchMatches = async () => {
    const response = await api.get(
      `/player/${tournamentId}/${playerId}/matches/${selectedRound}`
    );
    setMatches(response.data);
  };

  useEffect(() => {
    (async () => {
      if (selectedRound) {
        try {
          fetchMatches();
        } catch (error) {
          if (error.response.status === 401) {
            navigate("/login");
            return;
          }
          if (error.response) {
            console.log(error.response.data);
          } else {
            console.log(`Error: ${error.message}`);
          }
        }
      }
    })();
  }, [tournamentId, playerId, selectedRound]);

  const handleEditPlayer = async (values) => {
    try {
      const response = await api.post(
        `/player/${tournamentId}/${playerId}/editPlayer`,
        values
      );
      setResponseMessage(response.data);
      fetchData();
      fetchMatches();
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
        return;
      }
      if (error.response) {
        setResponseMessage(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  return (
    <>
      <ContentLayout>
        <PlayerProfileCrumbs
          tournamentId={tournamentId}
          playerData={playerData}
        ></PlayerProfileCrumbs>

        <AlertMessage
          responseMessage={responseMessage}
          setResponseMessage={setResponseMessage}
        ></AlertMessage>

        <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
          <Grid item xs={12} md={6}>
            <PlayerProfileData
              isLoading={isLoading}
              handleEditPlayer={handleEditPlayer}
              playerData={playerData}
            ></PlayerProfileData>
          </Grid>

          <Grid item xs={12} md={6}>
            <PlayerProfileAttendance
              isLoading={isLoading}
              playerAttendance={playerAttendance}
              playerId={playerId}
            ></PlayerProfileAttendance>
          </Grid>
        </Grid>
        <Grid container gap={2} sx={gridContainerStyle}>
          <Grid item xs={12} md={5}>
            <PlayerProfileTypography
              playerData={playerData}
            ></PlayerProfileTypography>
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
              <PlayerProfileMatchBox
                key={match.matchId}
                match={match}
                tournamentId={tournamentId}
                playerId={playerId}
                setResponseMessage={setResponseMessage}
                fetchData={fetchData}
                fetchMatches={fetchMatches}
              ></PlayerProfileMatchBox>
            );
          })}
      </ContentLayout>
    </>
  );
};
