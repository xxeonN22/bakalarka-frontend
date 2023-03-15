import { useState, useEffect } from "react";
import { Outlet, useNavigate, Route, useParams } from "react-router-dom";

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
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [rounds, setRounds] = useState([]);
  const [selectedRound, setSelectedRound] = useState("");
  const [gameDays, setGameDays] = useState([]);
  const [selectedGameDay, setSelectedGameDay] = useState("");
  const [numberOfCourts, setNumberOfCourts] = useState(1);
  const [selectedCourts, setSelectedCourts] = useState(numberOfCourts);
  const [matches, setMatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMatches, setSelectedMatches] = useState([]);
  const [dialogState, setDialogState] = useState(false);
  const [numberOfSets, setNumberOfSets] = useState("");
  const [maxPoints, setMaxPoints] = useState("");

  const { tournamentId, matchId } = useParams();
  const params = useParams();
  console.log(params);

  const [match, setMatch] = useState({
    selectedMatchId: "",
    firstPlayer: "",
    firstPlayerElo: "",
    secondPlayer: "",
    secondPlayerElo: "",
    firstPlayerId: "",
    secondPlayerId: "",
  });

  const [messageState, setMessageState] = useState({
    responseMessage: "",
    deleteMessage: "",
    scoreMessage: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/tournaments/${tournamentId}/matches`
      );
      const data = await response.json();
      setGroups(data.groups);
      setSelectedGroup(data.groups[0].group_name);
      setRounds(data.rounds);
      setSelectedRound(data.rounds[0].round_number);
      setNumberOfCourts(data.courts[0]["count(id_location)"]);
      setMatches(data.matchPair);
      setNumberOfSets(data.numberOfSets[0].max_sets);
      setMaxPoints(data.maxPoints[0].max_points);
    })();
  }, [tournamentId]);

  useEffect(() => {
    (async () => {
      if (selectedRound) {
        const response = await fetch(
          `http://localhost:3000/tournaments/${tournamentId}/matches/${selectedRound}`
        );
        const data = await response.json();
        if (data.length === 0) {
          setGameDays([]);
          setSelectedGameDay("");
          return;
        }
        setGameDays(data);
        setSelectedGameDay(data[0]);
      }
    })();
  }, [selectedRound, tournamentId]);

  useEffect(() => {
    setMatchValues({
      matchId: match.selectedMatchId,
      firstPlayer: match.firstPlayerId,
      firstPlayerElo: match.firstPlayerElo,
      secondPlayer: match.secondPlayerId,
      secondPlayerElo: match.secondPlayerElo,
    });
  }, [
    match.selectedMatchId,
    match.firstPlayerId,
    match.secondPlayerId,
    match.firstPlayerElo,
    match.secondPlayerElo,
  ]);

  const updateMatches = async () => {
    const response = await fetch(
      `http://localhost:3000/tournaments/${tournamentId}/matches`
    );
    const data = await response.json();
    setMatches(data.matchPair);
  };

  const handleGenerateClick = async () => {
    const response = await fetch(
      `http://localhost:3000/tournaments/${tournamentId}/matches/${selectedGroup}/${selectedCourts}/${selectedRound}/${selectedGameDay}`
    );
    const data = await response.json();

    setMessageState({
      ...messageState,
      responseMessage: data.message,
    });

    updateMatches();
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
        return prevSelectedMatches.filter((matchKey) => matchKey !== key);
      } else {
        return [...prevSelectedMatches, key];
      }
    });
  };

  const handleDeleteButtonClick = async () => {
    console.log("clicked");
    const response = await fetch(
      `http://localhost:3000/tournaments/${tournamentId}/matches`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedMatches,
        }),
      }
    );

    const data = await response.json();

    setMessageState({
      ...messageState,
      deleteMessage: data.message,
    });
    setSelectedMatches([]);
    updateMatches();
  };

  const handleSetScore = async () => {
    const response = await fetch(
      `http://localhost:3000/tournaments/${tournamentId}/matches/${matchId}`,
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
    setMessageState({
      ...messageState,
      scoreMessage: data.message,
    });

    updateMatches();
  };

  const handleDialogOpen = () => {
    setDialogState(true);
  };

  const handleDialogClose = () => {
    navigate(`/tournaments/${tournamentId}/matches`);
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
    navigate(`/tournaments/${tournamentId}/matches/${matchId}`);
    setMatch({
      ...match,
      selectedMatchId: matchId,
      firstPlayer: firstPlayer,
      firstPlayerElo: firstPlayerElo,
      secondPlayer: secondPlayer,
      secondPlayerElo: secondPlayerElo,
      firstPlayerId: firstPlayerId,
      secondPlayerId: secondPlayerId,
    });
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
          max={maxPoints}
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
          max={maxPoints}
        />
      </Grid>
    );
  }

  return (
    <>
      <Outlet>
        <Route
          path={`/tournaments/${tournamentId}/matches/:matchId`}
          element={<MatchScore></MatchScore>}
        />
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
                value={1}
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
        {messageState.scoreMessage && (
          <Alert
            sx={{ marginBlock: "1rem" }}
            severity={"success"}
            onClose={() => {
              setMessageState({
                ...messageState,
                scoreMessage: null,
              });
            }}
          >
            {messageState.scoreMessage}
          </Alert>
        )}
        {messageState.deleteMessage && (
          <Alert
            sx={{ marginBlock: "1rem" }}
            severity={"success"}
            onClose={() => {
              setMessageState({
                ...messageState,
                deleteMessage: null,
              });
            }}
          >
            {messageState.deleteMessage}
          </Alert>
        )}
        {messageState.responseMessage && (
          <Alert
            sx={{ marginBlock: "1rem" }}
            severity={
              messageState.responseMessage === "Generovanie prebehlo úspešne"
                ? "success"
                : "error"
            }
            onClose={() => {
              setMessageState({
                ...messageState,
                responseMessage: null,
              });
            }}
          >
            {messageState.responseMessage}
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
        firstPlayer={match.firstPlayer}
        secondPlayer={match.secondPlayer}
        handleSetScore={handleSetScore}
      ></MatchScore>
    </>
  );
};
