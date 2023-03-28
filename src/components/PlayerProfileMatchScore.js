import { useNavigate } from "react-router-dom";
import { api } from "../axios/axios";
import { useState, useEffect } from "react";
import { PlayerProfileSetsToRender } from "./PlayerProfileSetsToRender";
import { Box, Button, Grid, Typography } from "@mui/material";
import { appTheme } from "../themes/appTheme";

export const PlayerProfileMatchScore = ({
  matchId,
  tournamentId,
  playerId,
}) => {
  const navigate = useNavigate();

  const [matchData, setMatchData] = useState({
    matchId: "",
    firstPlayer: "",
    secondPlayer: "",
    sets: [],
  });
  const [loaded, setLoaded] = useState(false);
  // TODO FETC MAX POINTS IN tournament

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(
          `/player/${tournamentId}/${playerId}/match/${matchId}`
        );
        setMatchData({
          matchId: response.data[0],
          firstPlayer: response.data[1],
          secondPlayer: response.data[2],
          sets: response.data[3],
        });
        setLoaded(true);
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
  }, []);

  console.log(matchData);

  function handleInputChange(index, newPointsWon, property) {
    const newSets = [...matchData.sets];

    newSets[index] = {
      ...newSets[index],
      [property]: newPointsWon,
    };

    setMatchData({
      ...matchData,
      sets: newSets,
    });
  }

  let setsToRender = [];
  for (let i = 0; i < matchData.sets.length; i++) {
    setsToRender.push(
      <PlayerProfileSetsToRender
        key={i}
        setNumber={i}
        firstPlayerPoints={matchData.sets[i].points_won}
        secondPlayerPoints={matchData.sets[i].points_lost}
        handleInputChange={handleInputChange}
      />
    );
  }

  return (
    <>
      {loaded && (
        <Box>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingBlock: "2rem",
              }}
            >
              <Typography
                sx={{
                  width: "200px",
                  textAlign: "center",
                  wordWrap: "break-word",
                  [appTheme.breakpoints.down("md")]: {
                    textAlign: "left",
                  },
                }}
              >
                {matchData.firstPlayer[0].first_name}{" "}
                {matchData.firstPlayer[0].last_name}
              </Typography>
              <Typography
                sx={{
                  width: "200px",
                  textAlign: "center",
                  wordWrap: "break-word",
                  [appTheme.breakpoints.down("md")]: {
                    textAlign: "right",
                  },
                }}
              >
                {matchData.secondPlayer[0].first_name}{" "}
                {matchData.secondPlayer[0].last_name}
              </Typography>
            </Grid>
            {setsToRender}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <Button variant="contained">Upraviť výsledok</Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
