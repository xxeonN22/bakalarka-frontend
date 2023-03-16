import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { appTheme } from "../themes/appTheme";

import { ChooseGroup } from "../components/ChooseGroup";
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
  TextField,
} from "@mui/material";

export const Players = () => {
  const { tournamentId } = useParams();
  const [rounds, setRounds] = useState([]);
  const [selectedRound, setSelectedRound] = useState("");
  const [gameDays, setGameDays] = useState([]);
  const [selectedGameDay, setSelectedGameDay] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [playersData, setPlayersData] = useState([]);
  const [value, setValue] = useState(0);
  const [allChecked, setAllChecked] = useState(false);
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchGroup, setSearchGroup] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/tournaments/${tournamentId}`
      );
      const data = await response.json();
      setRounds(data.rounds);
      setSelectedRound(data.rounds[0].round_number);
      setGroups(data.groups);
      setSelectedGroup(data.groups[0].group_name);
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

  const handleSearchGroup = (event) => {
    setSearchGroup(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCheck = (id) => {
    const index = checkedBoxes.indexOf(id);
    if (index === -1) {
      setCheckedBoxes([...checkedBoxes, id]);
    } else {
      setCheckedBoxes(checkedBoxes.filter((box) => box !== id));
    }
  };

  const handleCheckAll = () => {
    if (!allChecked) {
      const ids = playersData.map((player) => player.id_player);
      setCheckedBoxes(ids);
      setAllChecked(true);
    } else {
      setCheckedBoxes([]);
      setAllChecked(false);
    }
  };

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

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

  const handleDeletePlayers = async () => {
    const response = await fetch(
      `http://localhost:3000/tournaments/${tournamentId}/deletePlayers`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkedBoxes,
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

  const handleMovePlayers = async () => {
    const response = await fetch(
      `http://localhost:3000/tournaments/${tournamentId}/movePlayers`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkedBoxes,
          selectedGroup,
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
    setCheckedBoxes([]);
    setAllChecked(false);
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

        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "1rem",
            display: checkedBoxes.length > 0 ? "flex" : "none",
            justifyContent: "space-between",
            [appTheme.breakpoints.up("lg")]: { justifyContent: "flex-start" },
          }}
        >
          <Grid item xs={6} md={4} lg={2.5}>
            <Button variant="contained" sx={{ width: "100%", padding: "1rem" }}>
              Poslať email
            </Button>
          </Grid>
          <Grid item xs={6} md={4} lg={2.5}>
            <ChooseGroup
              checkedBoxes={checkedBoxes}
              groups={groups}
              selectedGroup={selectedGroup}
              handleGroupChange={handleGroupChange}
              handleMovePlayers={handleMovePlayers}
            ></ChooseGroup>
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            lg={2.5}
            sx={{
              [appTheme.breakpoints.up("lg")]: {
                marginLeft: "auto",
              },
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "100%",
                padding: "1rem",
              }}
              onClick={() => handleDeletePlayers()}
            >{`Odstrániť hráč${checkedBoxes.length > 1 ? "ov" : "a"}`}</Button>
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
            backgroundColor: "#303A53",
            padding: "1rem",
            marginBlock: "1rem",
            color: "white",
            textAlign: "center",
            [appTheme.breakpoints.down("md")]: { paddingInline: "0.3rem" },
          }}
        >
          <Checkbox
            sx={{
              color: "white",
              padding: "0px",
              flex: "1",
              [appTheme.breakpoints.down("md")]: { flex: "0" },
            }}
            onChange={handleCheckAll}
            checked={allChecked}
          ></Checkbox>
          <Typography
            sx={{
              flex: "1",
              [appTheme.breakpoints.down("md")]: { display: "none" },
            }}
          >
            Poradie
          </Typography>
          <Box
            sx={{
              flex: "3",
              [appTheme.breakpoints.down("md")]: { flex: "2" },
            }}
          >
            <Typography sx={{ marginBottom: "0.5rem" }}>Meno</Typography>
            <TextField
              id="search-name"
              label="Vyhľadať hráča"
              variant="outlined"
              size="small"
              value={searchName}
              onChange={handleSearchName}
            />
          </Box>
          <Typography sx={{ flex: "1" }}>ELO</Typography>
          <Box
            sx={{
              flex: "2",
              [appTheme.breakpoints.down("md")]: { flex: "1" },
            }}
          >
            <Typography sx={{ marginBottom: "0.5rem" }}>Skupina</Typography>
            <TextField
              id="search-group"
              label="Vyhľadať skupinu"
              variant="outlined"
              size="small"
              value={searchGroup}
              onChange={handleSearchGroup}
            />
          </Box>
          <Typography sx={{ flex: "1" }}>Status</Typography>
        </Box>

        <Grid container>
          {playersData &&
            playersData
              .filter(
                (player) =>
                  player.first_name
                    .toLowerCase()
                    .includes(searchName.toLowerCase()) ||
                  player.last_name
                    .toLowerCase()
                    .includes(searchName.toLowerCase())
              )
              .filter((player) =>
                player.group_name
                  .substring(player.group_name.length - 1)
                  .toLowerCase()
                  .includes(searchGroup.toLowerCase())
              )
              .map((player, index) => (
                <Grid
                  item
                  xs={12}
                  key={player.id_player}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: index % 2 !== 0 ? "#303A53" : "#252E42",
                    padding: "1rem",
                    color: "white",
                    textAlign: "center",
                    [appTheme.breakpoints.down("md")]: {
                      paddingInline: "0.3rem",
                    },
                  }}
                >
                  <Checkbox
                    sx={{
                      color: "white",
                      padding: "0px",
                      flex: "1",
                      [appTheme.breakpoints.down("md")]: { flex: "0" },
                    }}
                    onChange={() => handleCheck(player.id_player)}
                    checked={checkedBoxes.includes(player.id_player)}
                  ></Checkbox>
                  <Typography
                    sx={{
                      flex: "1",
                      [appTheme.breakpoints.down("md")]: { display: "none" },
                    }}
                  >
                    {index + 1}
                  </Typography>
                  <Typography
                    sx={{
                      flex: "3",
                      textDecoration: "underline",
                      wordBreak: "break-all",
                      cursor: "pointer",
                      [appTheme.breakpoints.down("md")]: { flex: "2" },
                    }}
                  >
                    {player.first_name} {player.last_name}
                  </Typography>
                  <Typography sx={{ flex: "1" }}>{player.elo}</Typography>
                  <Typography
                    sx={{
                      flex: "2",
                      [appTheme.breakpoints.down("md")]: { flex: "1" },
                    }}
                  >
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
