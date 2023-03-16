import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ContentLayout } from "../components/ContentLayout";
import { SelectBox } from "../components/SelectBox";
import {
  Box,
  Tab,
  Tabs,
  tabsClasses,
  Grid,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import { appTheme } from "../themes/appTheme";

export const Players = () => {
  const { tournamentId } = useParams();
  const [rounds, setRounds] = useState([]);
  const [selectedRound, setSelectedRound] = useState("");
  const [gameDays, setGameDays] = useState([]);
  const [selectedGameDay, setSelectedGameDay] = useState("");
  const [value, setValue] = useState(0);
  const [playersData, setPlayersData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/tournaments/${tournamentId}`
      );
      const data = await response.json();
      console.log(data);
      setRounds(data.rounds);
      setSelectedRound(data.rounds[0].round_number);
    })();
  }, [tournamentId]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/tournaments/${tournamentId}/${selectedRound}`
      );
      const data = await response.json();
      setGameDays(data);
      setValue(0);
      setSelectedGameDay(data[0]);
    })();
  }, [tournamentId, selectedRound]);

  useEffect(() => {
    (async () => {
      if (selectedGameDay) {
        const response = await fetch(
          `http://localhost:3000/tournaments/${tournamentId}/${selectedGameDay}/${selectedRound}`
        );
        const data = await response.json();
        console.log(data);
        setPlayersData(data);
      }
    })();
  }, [selectedGameDay, selectedRound, tournamentId]);

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  const handleGameDayChange = async (date) => {
    setSelectedGameDay(date);
  };

  const handleChangeStatus = async (
    playerId,
    status,
    selectedRound,
    selectedGameDay
  ) => {
    console.log(`${playerId} ${status} ${selectedRound} ${selectedGameDay}`);

    const response = await fetch(
      `http://localhost:3000/tournaments/${tournamentId}/changeStatus`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerId,
          status,
          selectedRound,
          selectedGameDay,
        }),
      }
    );
    const data = await response.json();
    console.log(data);

    const fetchData = await fetch(
      `http://localhost:3000/tournaments/${tournamentId}/${selectedGameDay}/${selectedRound}`
    );
    const fetchedData = await fetchData.json();
    console.log(fetchedData);
    setPlayersData(fetchedData);
  };

  return (
    <>
      <ContentLayout>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item xs={6} md={4} lg={3} xl={2}>
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
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              sx={{
                paddingBlock: "1rem",
                [appTheme.breakpoints.down("md")]: { width: "100%" },
              }}
            >
              Vytvoriť nové kolo
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
        >
          <Box
            sx={{
              width: "200px",
              bgcolor: "background.paper",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              aria-label="visible arrows tabs example"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  "&.Mui-disabled": { opacity: 0.3 },
                },
              }}
            >
              {gameDays.length > 0 &&
                gameDays.map((gameday) => {
                  return (
                    <Tab
                      sx={{ width: "100%" }}
                      onClick={() => handleGameDayChange(gameday)}
                      key={gameday}
                      label={gameday}
                    />
                  );
                })}
            </Tabs>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#1f2736",
            padding: "1rem",
            marginBlock: "1rem",
            color: "white",
            textAlign: "center",
          }}
        >
          <Checkbox
            sx={{ color: "white", padding: "0px", flex: "1" }}
          ></Checkbox>
          <Typography sx={{ flex: "1" }}>Poradie</Typography>
          <Typography sx={{ flex: "3" }}>Meno</Typography>
          <Typography sx={{ flex: "1" }}>ELO</Typography>
          <Typography sx={{ flex: "2" }}>Skupina</Typography>
          <Typography sx={{ flex: "1" }}>Status</Typography>
        </Box>

        <Grid container>
          {playersData &&
            playersData.map((player, index) => (
              <Grid
                item
                xs={12}
                key={player.id_player}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#1f2736",
                  padding: "1rem",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <Checkbox
                  sx={{ color: "white", padding: "0px", flex: "1" }}
                ></Checkbox>
                <Typography sx={{ flex: "1" }}>{index + 1}</Typography>
                <Typography
                  sx={{
                    flex: "3",
                    textDecoration: "underline",
                    wordBreak: "break-all",
                    cursor: "pointer",
                  }}
                >
                  {player.first_name} {player.last_name}
                </Typography>
                <Typography sx={{ flex: "1" }}>{player.elo}</Typography>
                <Typography sx={{ flex: "2" }}>
                  {player.group_name.substring(player.group_name.length - 1)}
                </Typography>
                <Typography
                  onClick={() => {
                    handleChangeStatus(
                      player.id_player,
                      player.status,
                      selectedRound,
                      selectedGameDay
                    );
                  }}
                  sx={{ flex: "1", cursor: "pointer" }}
                >
                  {player.status}
                </Typography>
              </Grid>
            ))}
        </Grid>
      </ContentLayout>
    </>
  );
};
