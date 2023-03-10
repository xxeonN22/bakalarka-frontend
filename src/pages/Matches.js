import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, Route } from "react-router-dom";

import { MatchScore } from "../components/MatchScore";
import { MatchBox } from "../components/MatchBox";
import { TextFieldIncrement } from "../components/TextFieldIncrement";
import { SelectBox } from "../components/SelectBox";

import { ContentLayout } from "../components/ContentLayout";
import { appTheme } from "../themes/appTheme";

import { Grid, Box, Button, TextField, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const roundCourtsGridStyle = {
  display: "flex",
  justifyContent: "space-between",
  [appTheme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
  },
};

const generateMatchesGridStyle = {
  display: "flex",
  justifyContent: "center",
};

const generateMatches = {
  paddingBlock: "1rem",
  width: "32%",
  marginBlock: "2rem",
  [appTheme.breakpoints.down("md")]: {
    width: "100%",
  },
};

export const Matches = () => {
  const [groups, setGroups] = React.useState([]);
  const [selectedGroup, setSelectedGroup] = React.useState("");
  const [rounds, setRounds] = React.useState([]);
  const [selectedRound, setSelectedRound] = React.useState("");
  const [gameDays, setGameDays] = React.useState([]);
  const [selectedGameDay, setSelectedGameDay] = React.useState("");
  const [numberOfCourts, setNumberOfCourts] = React.useState(1);
  const [selectedCourts, setSelectedCourts] = useState(numberOfCourts);
  const [responseMessage, setResponseMessage] = React.useState();
  const [deleteMessage, setDeleteMessage] = React.useState();
  const [scoreMessage, setScoreMessage] = React.useState();
  const [matches, setMatches] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMatches, setSelectedMatches] = useState([]);
  const [dialogState, setDialogState] = useState(false);
  const [numberOfSets, setNumberOfSets] = useState("");

  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [firstPlayer, setFirstPlayer] = useState("");
  const [firstPlayerElo, setFirstPlayerElo] = useState("");
  const [secondPlayer, setSecondPlayer] = useState("");
  const [secondPlayerElo, setSecondPlayerElo] = useState("");
  const [firstPlayerId, setFirstPlayerId] = useState("");
  const [secondPlayerId, setSecondPlayerId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/matches")
      .then((response) => response.json())
      .then((data) => {
        setGroups(data.groups);
        setSelectedGroup(data.groups[0].group_name);
        setRounds(data.rounds);
        setSelectedRound(data.rounds[0].round_number);
        setNumberOfCourts(data.courts[0]["count(id_location)"]);
        setSelectedCourts(data.courts[0]["count(id_location)"]);
        setMatches(data.matchPair);
        setNumberOfSets(data.numberOfSets[0].max_sets);
      });
  }, []);

  useEffect(() => {
    if (selectedRound) {
      fetch("http://localhost:3000/gameDays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedRound }),
      })
        .then((response) => response.json())
        .then((data) => {
          setGameDays(data);
          setSelectedGameDay(data[0]);
        });
    }
  }, [selectedRound]);

  useEffect(() => {
    setMatchValues({
      matchId: selectedMatchId,
      firstPlayer: firstPlayerId,
      firstPlayerElo: firstPlayerElo,
      secondPlayer: secondPlayerId,
      secondPlayerElo: secondPlayerElo,
    });
  }, [
    selectedMatchId,
    firstPlayerId,
    secondPlayerId,
    firstPlayerElo,
    secondPlayerElo,
  ]);

  const handleGenerateClick = async () => {
    const response = await fetch("http://localhost:3000/matches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedGroup,
        selectedCourts,
        selectedRound,
        selectedGameDay,
      }),
    });
    const data = await response.json();

    setResponseMessage(data.message);

    fetch("http://localhost:3000/matches")
      .then((response) => response.json())
      .then((data) => {
        setMatches(data.matchPair);
      });
  };

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  const handleGameDayChange = (event) => {
    setSelectedGameDay(event.target.value);
  };

  const handleSearch = (query) => {
    const filteredMatches = matches.filter((match) =>
      match.some((item) =>
        typeof item === "object"
          ? Object.values(item[0]).some((value) =>
              value.toString().toLowerCase().includes(query.toLowerCase())
            )
          : item.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setSearchResults(filteredMatches);
  };

  const handleCheckboxClick = (key) => {
    setSelectedMatches((prevSelectedMatches) => {
      if (prevSelectedMatches.includes(key)) {
        // If the key is already in the array, remove it
        return prevSelectedMatches.filter((matchKey) => matchKey !== key);
      } else {
        // If the key is not in the array, add it
        return [...prevSelectedMatches, key];
      }
    });
  };

  const handleDeleteButtonClick = async () => {
    const response = await fetch("http://localhost:3000/matches", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedMatches,
      }),
    });

    const data = await response.json();

    setDeleteMessage(data.message);

    setSelectedMatches([]);
    fetch("http://localhost:3000/matches")
      .then((response) => response.json())
      .then((data) => {
        setMatches(data.matchPair);
      });
  };

  const handleSetScore = async () => {
    const response = await fetch(
      `http://localhost:3000/matches/${selectedMatchId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchValues,
          numberOfSets,
        }),
      }
    );

    const data = await response.json();
    setScoreMessage(data.message);

    fetch("http://localhost:3000/matches")
      .then((response) => response.json())
      .then((data) => {
        setMatches(data.matchPair);
      });
  };

  const handleDialogOpen = () => {
    setDialogState(true);
  };

  const handleDialogClose = () => {
    navigate(`/matches`);
    setDialogState(false);
  };

  const [matchValues, setMatchValues] = useState({
    matchId: null,
    firstPlayer: null,
    firstPlayerElo: null,
    secondPlayer: null,
    secondPlayerElo: null,
  });

  const handleButtonClick = (
    matchId,
    firstPlayer,
    secondPlayer,
    firstPlayerElo,
    secondPlayerElo,
    firstPlayerId,
    secondPlayerId
  ) => {
    handleDialogOpen();
    navigate(`/matches/${matchId}`);
    setSelectedMatchId(matchId);
    setFirstPlayer(firstPlayer);
    setFirstPlayerElo(firstPlayerElo);
    setSecondPlayer(secondPlayer);
    setSecondPlayerElo(secondPlayerElo);
    setFirstPlayerId(firstPlayerId);
    setSecondPlayerId(secondPlayerId);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMatchValues(() => ({
      ...matchValues,
      [name]: value,
    }));
  };

  const setsToRender = [];

  for (let i = 1; i <= numberOfSets; i++) {
    setsToRender.push(
      <Grid
        key={i}
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
          gap: "1rem",
        }}
      >
        <TextFieldIncrement
          value={matchValues[i]?.firstPlayerSet}
          functionName={(value) =>
            handleInputChange(
              { target: { name: `firstPlayer-set${i}`, value } },
              i
            )
          }
          label={`Set ${i}`}
          id={`firstPlayer-set${i}`}
          max={22}
        />
        <TextFieldIncrement
          value={matchValues[i]?.firstPlayerSet}
          functionName={(value) =>
            handleInputChange(
              { target: { name: `secondPlayer-set${i}`, value } },
              i
            )
          }
          label={`Set ${i}`}
          id={`secondPlayer-set${i}`}
          max={22}
        />
      </Grid>
    );
  }

  return (
    <>
      <Outlet>
        <Route path="/matches/:matchId" element={<MatchScore></MatchScore>} />
      </Outlet>
      <ContentLayout>
        <Grid
          container
          rowGap={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid container item xs={12} spacing={2} sx={roundCourtsGridStyle}>
            <Grid item xs={6} lg={3}>
              <SelectBox
                id="select-group"
                labelContent="Vyberte skupinu"
                labelId="select-group-label"
                label="Vyberte skupinu"
                onChangeFunction={handleGroupChange}
                selectValue={selectedGroup}
                itemArray={groups}
              ></SelectBox>
            </Grid>
            <Grid item xs={6} lg={3}>
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
            <Grid item xs={6} lg={3}>
              <SelectBox
                id="select-game-day"
                labelContent="Vyberte hrací deň"
                labelId="select-game-day-label"
                label="Vyberte hrací deň"
                onChangeFunction={handleGameDayChange}
                selectValue={selectedGameDay}
                itemArray={gameDays}
              ></SelectBox>
            </Grid>
            <Grid item xs={6} lg={3}>
              <TextFieldIncrement
                value={selectedCourts}
                functionName={setSelectedCourts}
                label="Počet kurtov"
                id="number-of-courts"
                max={numberOfCourts}
                min={1}
              ></TextFieldIncrement>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={generateMatchesGridStyle}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              sx={generateMatches}
              onClick={handleGenerateClick}
            >
              Vygenerovať zápasy
            </Button>
          </Grid>
        </Grid>
        {scoreMessage && (
          <Alert
            sx={{ marginBlock: "1rem" }}
            severity={"success"}
            onClose={() => setScoreMessage(null)}
          >
            {scoreMessage}
          </Alert>
        )}
        {deleteMessage && (
          <Alert
            sx={{ marginBlock: "1rem" }}
            severity={"success"}
            onClose={() => setDeleteMessage(null)}
          >
            {deleteMessage}
          </Alert>
        )}
        {responseMessage && (
          <Alert
            sx={{ marginBlock: "1rem" }}
            severity={
              responseMessage === "Generovanie prebehlo úspešne"
                ? "success"
                : "error"
            }
            onClose={() => setResponseMessage(null)}
          >
            {responseMessage}
          </Alert>
        )}
        {matches.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              marginBottom: "1rem",
              [appTheme.breakpoints.down("md")]: {
                gap: "1rem",
                justifyContent: `${
                  selectedMatches.length === 0 ? "center" : "space-between"
                }`,
              },
            }}
          >
            <TextField
              label="Filter zápasov"
              id="mach-filter"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                handleSearch(event.target.value);
              }}
              sx={{
                width: "35%",
                marginBottom: "0.5rem",
                [appTheme.breakpoints.down("md")]: {
                  width: "50%",
                },
              }}
            />
            {selectedMatches.length > 0 && (
              <Button
                variant="contained"
                sx={{
                  paddingBlock: "1rem",
                  [appTheme.breakpoints.down("md")]: {
                    width: "50%",
                  },
                }}
                color="error"
                onClick={handleDeleteButtonClick}
              >
                {selectedMatches.length === 1
                  ? `Vymazať zápas`
                  : `Vymazať zápasy`}
              </Button>
            )}
          </Box>
        )}
        {searchResults.length > 0
          ? searchResults.map((match) => {
              const matchId = match[0];
              return (
                <MatchBox
                  key={matchId}
                  match={match}
                  handleButtonClick={handleButtonClick}
                  handleCheckboxClick={handleCheckboxClick}
                ></MatchBox>
              );
            })
          : matches.map((match) => {
              const matchId = match[0];
              return (
                <MatchBox
                  key={matchId}
                  match={match}
                  handleButtonClick={handleButtonClick}
                  handleCheckboxClick={handleCheckboxClick}
                ></MatchBox>
              );
            })}
      </ContentLayout>
      <MatchScore
        dialogState={dialogState}
        handleDialogClose={handleDialogClose}
        setsToRender={setsToRender}
        firstPlayer={firstPlayer}
        secondPlayer={secondPlayer}
        handleSetScore={handleSetScore}
      ></MatchScore>
    </>
  );
};
