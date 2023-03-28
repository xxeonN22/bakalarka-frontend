import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../axios/axios";

import { AlertMessage } from "../components/AlertMessage";
import { ContentLayout } from "../components/ContentLayout";
import { PlayersDashboard } from "../components/Players/PlayersDashboard";
import { PlayerDashboardTableHeader } from "../components/Players/PlayerDashboardTableHeader";
import { GameDaysTabs } from "../components/Players/GameDaysTabs";
import { ChooseRoundCreateRound } from "../components/Players/ChooseRoundCreateRound";
import { PlayerDashboardActions } from "../components/Players/PlayerDashboardActions";

export const Players = () => {
  const navigate = useNavigate();
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
  const [responseMessage, setResponseMessage] = useState("");

  const fetchRoundsAndDates = async () => {
    const response = await api.get(`/players/tournament/${tournamentId}`);
    setRounds(response.data.rounds);
    setSelectedRound(response.data.rounds[0].round_number);
    setGroups(response.data.groups);
    setSelectedGroup(response.data.groups[0].group_name);
  };

  useEffect(() => {
    (async () => {
      try {
        await fetchRoundsAndDates();
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
    })();
  }, [tournamentId]);

  const fetchGameDays = async () => {
    const response = await api.get(
      `/players/tournament/${tournamentId}/${selectedRound}`
    );
    setGameDays(response.data);
    setValue(0);
    setSelectedGameDay(response.data[0]);
  };

  useEffect(() => {
    (async () => {
      try {
        await fetchGameDays();
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
    })();
  }, [tournamentId, selectedRound]);

  const fetchPlayersData = async () => {
    try {
      const response = await api.get(
        `/players/tournament/${tournamentId}/${selectedGameDay}/${selectedRound}`
      );
      setPlayersData(response.data);
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

  useEffect(() => {
    (async () => {
      if (selectedGameDay) {
        await fetchPlayersData();
      }
    })();
  }, [selectedGameDay, selectedRound, tournamentId]);

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

  const handleSearchGroup = (event) => {
    setSearchGroup(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
    try {
      const response = await api.put(
        `/players/tournament/${tournamentId}/changeStatus`,
        { playerId, status, selectedRound, selectedGameDay }
      );
      await fetchPlayersData();
      setResponseMessage(response.data);
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

  const handleDeletePlayers = async () => {
    try {
      const response = await api.delete(
        `/players/tournament/${tournamentId}/deletePlayers`,
        {
          data: checkedBoxes,
        }
      );
      fetchPlayersData();
      setCheckedBoxes([]);
      setAllChecked(false);
      setResponseMessage(response.data);
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

  const handleMovePlayers = async () => {
    try {
      const response = await api.put(
        `/players/tournament/${tournamentId}/movePlayers`,
        {
          checkedBoxes,
          selectedGroup,
        }
      );
      fetchPlayersData();
      setCheckedBoxes([]);
      setAllChecked(false);
      setResponseMessage(response.data);
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  const handleDeleteGameDay = async (gameDayId, roundId) => {
    try {
      const response = await api.delete(
        `/players/tournament/${tournamentId}/deleteGameDay/${gameDayId}/${roundId}`
      );
      setResponseMessage(response.data);
      fetchRoundsAndDates();
      fetchGameDays();
      fetchPlayersData();
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  const handleEditGameDay = async (gameDayId, roundId, newValues) => {
    console.log(gameDayId);
    try {
      const response = await api.put(
        `/players/tournament/${tournamentId}/editGameDay/${gameDayId}/${roundId}`,
        newValues
      );
      setResponseMessage(response.data);
      fetchRoundsAndDates();
      fetchGameDays();
      fetchPlayersData();
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  return (
    <>
      <ContentLayout>
        <ChooseRoundCreateRound
          handleRoundChange={handleRoundChange}
          selectedRound={selectedRound}
          selectedGameDay={selectedGameDay}
          rounds={rounds}
          tournamentId={tournamentId}
          handleDeleteGameDay={handleDeleteGameDay}
          handleEditGameDay={handleEditGameDay}
        ></ChooseRoundCreateRound>

        <AlertMessage
          responseMessage={responseMessage}
          setResponseMessage={setResponseMessage}
        ></AlertMessage>

        <PlayerDashboardActions
          checkedBoxes={checkedBoxes}
          setCheckedBoxes={setCheckedBoxes}
          setAllChecked={setAllChecked}
          tournamentId={tournamentId}
          setResponseMessage={setResponseMessage}
          groups={groups}
          selectedGroup={selectedGroup}
          handleGroupChange={handleGroupChange}
          handleMovePlayers={handleMovePlayers}
          handleDeletePlayers={handleDeletePlayers}
        ></PlayerDashboardActions>

        <GameDaysTabs
          value={value}
          handleChange={handleChange}
          gameDays={gameDays}
          handleGameDayChange={handleGameDayChange}
        ></GameDaysTabs>

        <PlayerDashboardTableHeader
          searchName={searchName}
          handleSearchName={handleSearchName}
          allChecked={allChecked}
          handleCheckAll={handleCheckAll}
          searchGroup={searchGroup}
          handleSearchGroup={handleSearchGroup}
        ></PlayerDashboardTableHeader>

        <PlayersDashboard
          playersData={playersData}
          tournamentId={tournamentId}
          checkedBoxes={checkedBoxes}
          handleCheck={handleCheck}
          handleChangeStatus={handleChangeStatus}
          selectedRound={selectedRound}
          selectedGameDay={selectedGameDay}
          searchName={searchName}
          searchGroup={searchGroup}
        ></PlayersDashboard>
      </ContentLayout>
    </>
  );
};
