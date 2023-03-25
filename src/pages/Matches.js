import { useState, useEffect } from "react";
import { Outlet, useNavigate, Route, useParams } from "react-router-dom";
import { api } from "../axios/axios";

import { Grid } from "@mui/material";

import { MatchScore } from "../components/MatchScore";
import { ContentLayout } from "../components/ContentLayout";
import { SetsToRender } from "../components/Matches/SetsToRender";
import { SelectionSection } from "../components/Matches/SelectionSection";
import { GenerateButton } from "../components/Matches/GenerateButton";
import { AlertMessage } from "../components/Alert/AlertMessage.js";
import { ActionButtons } from "../components/Matches/ActionButtons";
import { GeneratedMatches } from "../components/Matches/GeneratedMatches";

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

  const [match, setMatch] = useState({
    selectedMatchId: "",
    firstPlayer: "",
    firstPlayerElo: "",
    secondPlayer: "",
    secondPlayerElo: "",
    firstPlayerId: "",
    secondPlayerId: "",
  });

  const [matchValues, setMatchValues] = useState({
    matchId: null,
    firstPlayer: null,
    firstPlayerElo: null,
    secondPlayer: null,
    secondPlayerElo: null,
  });

  const [responseMessage, setResponseMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/tournament/${tournamentId}/matches`);
        setGroups(response.data.groups);
        setSelectedGroup(response.data.groups[0].group_name);
        setRounds(response.data.rounds);
        setSelectedRound(response.data.rounds[0].round_number);
        setNumberOfCourts(response.data.courts[0]["count(id_location)"]);
        setMatches(response.data.matchPair);
        setNumberOfSets(response.data.numberOfSets[0].max_sets);
        setMaxPoints(response.data.maxPoints[0].max_points);
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
  }, [tournamentId]);

  useEffect(() => {
    (async () => {
      if (selectedRound) {
        try {
          const response = await api.get(
            `/tournament/${tournamentId}/matches/${selectedRound}`
          );
          if (response.data.length === 0) {
            setGameDays([]);
            setSelectedGameDay("");
            return;
          }
          setGameDays(response.data);
          setSelectedGameDay(response.data[0]);
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
    try {
      const response = await api.get(`/tournament/${tournamentId}/matches`);
      setMatches(response.data.matchPair);
      setSearchResults(response.data.matchPair);
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
  };

  const handleGenerateClick = async () => {
    try {
      const response = await api.get(
        `/tournament/${tournamentId}/matches/${selectedGroup}/${selectedCourts}/${selectedRound}/${selectedGameDay}`
      );
      setResponseMessage(response.data);
      updateMatches();
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
    try {
      const response = await api.delete(`/tournament/${tournamentId}/matches`, {
        data: selectedMatches,
      });
      setResponseMessage(response.data);
      setSelectedMatches([]);
      updateMatches();
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

  const handleSetScore = async () => {
    try {
      const response = await api.put(
        `/tournament/${tournamentId}/matches/${matchId}`,
        { matchValues, numberOfSets }
      );
      setResponseMessage(response.data);
      updateMatches();
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

  const handleDialogOpen = () => {
    setDialogState(true);
  };

  const handleDialogClose = () => {
    navigate(`/tournaments/${tournamentId}/matches`);
    setDialogState(false);
  };

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
      <SetsToRender
        key={i}
        setNumber={i}
        matchValues={matchValues}
        maxPoints={maxPoints}
        handleInputChange={handleInputChange}
      ></SetsToRender>
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
          <SelectionSection
            handleGroupChange={handleGroupChange}
            selectedGroup={selectedGroup}
            groups={groups}
            handleRoundChange={handleRoundChange}
            selectedRound={selectedRound}
            rounds={rounds}
            handleGameDayChange={handleGameDayChange}
            selectedGameDay={selectedGameDay}
            gameDays={gameDays}
            setSelectedCourts={setSelectedCourts}
            numberOfCourts={numberOfCourts}
          ></SelectionSection>

          <GenerateButton
            handleGenerateClick={handleGenerateClick}
          ></GenerateButton>
        </Grid>

        {responseMessage && (
          <AlertMessage
            typeOfResponse={responseMessage.type}
            responseMessage={responseMessage.message}
            setResponseMessage={setResponseMessage}
          ></AlertMessage>
        )}

        {matches.length > 0 && (
          <ActionButtons
            selectedMatches={selectedMatches}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            handleDeleteButtonClick={handleDeleteButtonClick}
          ></ActionButtons>
        )}
        <GeneratedMatches
          searchResults={searchResults}
          matches={matches}
          handleButtonClick={handleButtonClick}
          handleCheckboxClick={handleCheckboxClick}
        ></GeneratedMatches>
      </ContentLayout>
      <MatchScore
        dialogState={dialogState}
        handleDialogClose={handleDialogClose}
        setsToRender={setsToRender}
        firstPlayer={match.firstPlayer}
        secondPlayer={match.secondPlayer}
        handleSetScore={handleSetScore}
        buttonText="Potvrdiť výsledok"
      ></MatchScore>
    </>
  );
};
